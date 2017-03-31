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

    projects.map do |project|
      "\n- #{project.name} (#{project.name.downcase.parameterize})"
    end.join('')
  end

  def perform_async(params)
    Thread.new do
      command_parts = params[:text].split(' ')
      report = if command_parts[0] == 'list'
        list_projects
      else
        'Not implemented'
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
