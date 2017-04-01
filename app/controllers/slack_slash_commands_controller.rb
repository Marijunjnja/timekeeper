class CommandWorker
  include ActionView::Helpers::NumberHelper

  def connection(params)
    Faraday.new(url: params[:response_url]) do |faraday|
      faraday.adapter Faraday.default_adapter
    end
  end

  def tenk_client
    token = ENV['TENK_TOKEN'] || fail('No api token set. Set TENK_TOKEN environment variable.')
    @_client ||= Tenk.new token: token, api_base: ENV['TENK_API_BASE']
  end

  def list_projects
    projects.map do |project|
      "\n- #{project.name} (#{project.name.downcase.parameterize})"
    end.join('')
  end

  def projects
    projects = []
    page = 1

    loop do
      response = tenk_client.projects.list(page: page, filter_field: 'project_state', filter_list: 'Confirmed')
      new_projects = response.data
      projects << new_projects
      break unless response.paging.next
      page += 1
    end

    projects.flatten!.sort_by!(&:name)
  end

  def get_actual_time(project_slug)
    id = lookup_id_from_slug project_slug
    phase_ids = tenk_client.projects.phases.list(id).data.map(&:id)
    phase_ids << id

    actual_entries = all_entries(phase_ids).select { |entry| !entry.is_suggestion }
    all_time_assignments = all_assignments(phase_ids)

    week_start = Time.zone.now.beginning_of_week.to_date.strftime('%Y-%m-%d')
    week_end = Time.zone.now.end_of_week.to_date.strftime('%Y-%m-%d')
    this_week_assignments = all_time_assignments.select do |assignment|
      week_start <= assignment.starts_at &&
      week_end >= assignment.ends_at
    end

    budgets_by_user_id = Hash[this_week_assignments.group_by(&:user_id).map do |user_id, assignments|
      week_total = assignments.sum do |assignment|
        case assignment.allocation_mode
        when 'fixed'
          business_days_in_assignment = Date.parse(assignment.starts_at).business_days_until(Date.parse(assignment.ends_at))
          business_days_in_assignment_this_week = [
            Time.zone.now.beginning_of_week.to_date,
            assignment.starts_at.to_date,
          ].max.business_days_until([
            Time.zone.now.end_of_week.to_date,
            assignment.ends_at.to_date,
          ].min)
          assignment.fixed_hours * (business_days_in_assignment_this_week.to_f / business_days_in_assignment.to_f)
        when 'percent'
          assignment.percent * 40.0
        when 'hours_per_day'
          assignment.hours_per_day * 5
        end
      end

      [user_id, week_total]
    end]

    total_hours = {
      actual: actual_entries.sum(&:hours),
      budget: budgets_by_user_id.values.sum,
    }

    user_ids = (actual_entries.map(&:user_id) + budgets_by_user_id.keys).uniq

    actuals_by_user = actual_entries.group_by(&:user_id)

    hours_by_person = Hash[user_ids.map do |user_id|
      user = tenk_client.users.get(user_id)
      entries = actuals_by_user[user_id]
      [
        user.display_name,
        {
          actual: (entries || []).sum(&:hours),
          budget: budgets_by_user_id[user_id] || 0,
          updated_at: Time.zone.parse((entries || []).map(&:updated_at).max).in_time_zone('America/Chicago'),
        }
      ]
    end]

    hours_by_discipline = user_ids.each_with_object({}) do |user_id, discipline_hash|
      user = tenk_client.users.get(user_id)
      discipline = user.discipline
      entries = actuals_by_user[user_id]
      discipline_hash[discipline] = {
        actual: (discipline_hash[discipline].try(:[], :actual) || 0) + (entries || []).sum(&:hours),
        budget: (discipline_hash[discipline].try(:[], :budget) || 0) + (budgets_by_user_id[user_id] || 0),
      }
    end

    table = Terminal::Table.new do |t|
      t << ['Name', 'Actual', 'Budget', 'Last Updated']
      t.add_separator
      hours_by_person.each do |name, hours|
        t << [
          name,
          {value: number_with_precision(hours[:actual], precision: 2), alignment: :right},
          {value: number_with_precision(hours[:budget], precision: 2), alignment: :right},
          hours[:updated_at].strftime('%Y-%m-%d %H:%M CT'),
        ]
      end
        t.add_separator
        t << [
          'Total',
          {value: number_with_precision(total_hours[:actual], precision: 2), alignment: :right},
          {value: number_with_precision(total_hours[:budget], precision: 2), alignment: :right},
          '',
        ]
    end

    discipline_table = Terminal::Table.new do |t|
      t << ['Discipline', 'Actual', 'Budget']
      t.add_separator
      hours_by_discipline.each do |discipline, hours|
        t << [
          discipline,
          {value: number_with_precision(hours[:actual], precision: 2), alignment: :right},
          {value: number_with_precision(hours[:budget], precision: 2), alignment: :right},
        ]
      end
    end

    "```\n#{project_slug}:\n#{table}\n#{discipline_table}\n```"
  end

  def all_entries(phase_ids)
    phase_ids.flat_map do |phase_id|
      response = tenk_client.projects.time_entries.list(
        phase_id,
        from: Time.zone.now.beginning_of_week.strftime('%Y-%m-%d'),
        to: Time.zone.now.end_of_week.strftime('%Y-%m-%d'),
        per_page: 1000,
      )

      response.data
    end
  end

  def all_assignments(phase_ids)
    phase_ids.flat_map do |phase_id|
      response = tenk_client.projects.assignments.list(
        phase_id,
        per_page: 1000,
      )

      response.data
    end
  end

  def lookup_id_from_slug(project_slug)
    project_slug_table[project_slug]
  end

  def project_slug_table
    Hash[projects.map do |project|
      [project.name.downcase.parameterize, project.id]
    end]
  end

  def perform_async(params)
    Thread.new do
      command_parts = params[:text].split(' ')
      report = if command_parts[0] == 'list'
        "\nProjects:\n" + list_projects
      else
        get_actual_time(command_parts[1])
      end

      connection(params).post do |req|
        req.url params[:response_url]
        req.headers['Content-Type'] = 'application/json'
        req.body = JSON.generate({
          response_type: 'in_channel',
          text: report,
        })
      end
    end
  end
end

class SlackSlashCommandsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    return render json: {}, status: 403 unless valid_slack_token?
    CommandWorker.new.perform_async(command_params)
    head :ok
  end

  private

  def valid_slack_token?
    params[:token] == ENV['SLACK_SLASH_TOKEN']
  end

  # Only allow a trusted parameter "white list" through.
  def command_params
    params.permit(:text, :token, :user_id, :response_url)
  end
end
