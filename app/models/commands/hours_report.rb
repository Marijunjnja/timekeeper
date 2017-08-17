module Commands
  class HoursReport < ::Commands::BaseCommand
    def results(
      role = '',
      start_dt = Time.zone.now.beginning_of_week.strftime('%Y-%m-%d'),
      end_dt = Time.zone.now.end_of_week.strftime('%Y-%m-%d'),
      *args,
      &block
    )
      get_actual_time(start_dt, end_dt, role, &block)
    end

    def get_actual_time(start_dt, end_dt, role, &block)
      all_results = groups_by_user_project_and_version(start_dt, end_dt, role)

      table = []
      row_count = 0

      all_results.each do |user_name, project_hash|
        project_hash.each do |project_name, data_hash|
          next if (data_hash['budget'] || 0) < 8
          diff = (data_hash['budget'] || 0) - (data_hash['actual'] || 0)

          table << [
            user_name,
            Date.parse(start_dt).strftime('%U'),
            Date.parse(start_dt).beginning_of_week.strftime('%Y-%m-%d'),
            project_name,
            number_with_precision(data_hash['budget'] || 0, precision: 2),
            number_with_precision(diff.abs <= 2.0 ? 1 : ((data_hash['budget'] || 0) - diff.abs) / (data_hash['budget'] || 1), precision: 2),
            "{" + number_with_precision(data_hash['actual'] || 0, precision: 2) + "}",
          ].join(' | ')
          row_count += 1

          if row_count > 25
            Rails.logger.info "```\n#{table.join("\n")}\n```"
            yield "```\n#{table.join("\n")}\n```"

            row_count = 0
            table = []
          end
        end
      end

      Rails.logger.info "```\n#{table.join("\n")}\n```"
      yield "```\n#{table.join("\n")}\n```"
    end

    def groups_by_user_project_and_version(start_dt, end_dt, role)
      all_times(start_dt, end_dt).each_with_object({}) do |entry, groups_by_user_project_and_version|
        user_model = user_lookup[entry[:user_id]]
        next if user_model.blank?
        next unless (user_model[:discipline] || user_model[:displayName] || '').downcase.match(role.downcase).present?

        name = user_model[:display_name] || user_model[:displayName]
        project_id = phase_lookup[entry[:assignable_id]][:name]
        version = entry[:version]

        groups_by_user_project_and_version[name] ||= {}
        groups_by_user_project_and_version[name][project_id] ||= {}
        groups_by_user_project_and_version[name][project_id][version] ||= 0
        groups_by_user_project_and_version[name][project_id][version] += entry[:hours]
      end
    end

    def user_lookup
      return @_user_lookup if @_user_lookup

      all_users_and_placeholders = tenk_client.users.list(per_page: 1000).data + tenk_client.placeholder_resources.list(per_page: 1000).data
      @_user_lookup = Hash[all_users_and_placeholders.map { |u| [u.id, u] }]
    end

    def all_times(start_dt, end_dt)
      actual_time_hashes(start_dt, end_dt) + budget_time_hashes(start_dt, end_dt)
    end

    def actual_time_hashes(start_dt, end_dt)
      all_entries(start_dt, end_dt)
      .compact
      .select { |entry| !entry.is_suggestion }
      .map do |entry|
        {
          user_id: entry.user_id,
          assignable_id: entry.assignable_id,
          hours: entry.hours,
          version: 'actual',
        }
      end
    end

    def budget_time_hashes(start_dt, end_dt)
      this_week_assignments(start_dt, end_dt).map do |assignment|
        {
          user_id: assignment.user_id,
          assignable_id: assignment.assignable_id,
          hours: hours_for_assignment(assignment, start_dt, end_dt),
          version: 'budget',
        }
      end
    end

    def all_phases
      @_all_phases ||=
        all_projects.flat_map do |project|
          tenk_client.projects.phases.list(
            project.id,
            per_page: 1000,
          ).data + [project]
        end
    end

    def phase_lookup
      Hash[all_phases.map { |phase| [phase.id, phase] }]
    end

    def all_projects
      tenk_client.projects.list(
        per_page: 1000,
      ).data
    end

    def all_entries(start_dt, end_dt)
      all_phases.flat_map do |phase|
        tenk_client.projects.time_entries.list(
          phase.id,
          from: start_dt,
          to: end_dt,
          per_page: 1000,
        ).data
      end
    end

    def this_week_assignments(start_dt, end_dt)
      @_this_week_assignments ||=
        all_assignments.select do |assignment|
          start_dt <= assignment.starts_at &&
          end_dt >= assignment.ends_at
        end
    end

    def all_assignments
      all_phases.flat_map do |phase|
        tenk_client.projects.assignments.list(
          phase.id,
          per_page: 1000,
        ).data
      end
    end

    def hours_for_assignment(assignment, start_dt_string, end_dt_string)
      start_dt = Date.parse(start_dt_string)
      end_dt = Date.parse(end_dt_string)

      case assignment.allocation_mode
      when 'fixed'
        business_days_in_assignment = Date.parse(assignment.starts_at).business_days_until(Date.parse(assignment.ends_at) + 1.day)
        business_days_in_assignment_this_week = [
          start_dt,
          assignment.starts_at.to_date,
        ].max.business_days_until([
          end_dt,
          assignment.ends_at.to_date,
        ].min) + 1

        business_days_in_assignment_this_week = [business_days_in_assignment_this_week, business_days_in_assignment].min
        assignment.fixed_hours * (business_days_in_assignment_this_week.to_f / business_days_in_assignment.to_f)
      when 'percent'
        assignment.percent * 40.0
      when 'hours_per_day'
        assignment.hours_per_day * 5
      end
    end
  end
end
