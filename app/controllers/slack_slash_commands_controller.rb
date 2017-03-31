class CommandWorker
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

    all_entries = phase_ids.flat_map do |phase_id|
     response = tenk_client.projects.time_entries.list(
        phase_id,
        from: Time.zone.now.beginning_of_week.strftime('%Y-%m-%d'),
        to: Time.zone.now.end_of_week.strftime('%Y-%m-%d'),
        per_page: 1000
     )

     response.data
    end

    actual_entries = all_entries.select { |entry| !entry.is_suggestion }

    total_hours = actual_entries.sum(&:hours)

    hours_by_person = Hash[actual_entries.group_by(&:user_id).map do |user_id, entries|
      user = tenk_client.users.get(user_id)
      [user.display_name, entries.sum(&:hours)]
    end]

    <<-TXT
      Total: #{total_hours}
      By person: #{hours_by_person.map { |name, hours| "\n-#{name}: #{hours}" }.join('')}
    TXT
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
        list_projects
      else
        get_actual_time(command_parts[1])
      end

      connection(params).post do |req|
        req.url params[:response_url]
        req.headers['Content-Type'] = 'application/json'
        req.body = JSON.generate({
          text: report
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
