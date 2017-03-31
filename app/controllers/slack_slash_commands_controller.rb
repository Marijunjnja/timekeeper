class CommandWorker
  def connection(params)
    Faraday.new(url: params[:response_url]) do |faraday|
      faraday.adapter Faraday.default_adapter
    end
  end

  def perform_async(params)
    connection(params).post do |req|
      req.url params[:response_url]
      req.headers['Content-Type'] = 'application/json'
      req.body = JSON.generate({
        text: "It worked"
      })
    end
  end
end

class SlackSlashCommandsController < ApplicationController
  def create
    return render json: {}, status: 403 unless valid_slack_token?
    CommandWorker.new.perform_async(command_params)
    head :ok
  end

  private

  def valid_slack_token?
    params[:token] == 'hours'
  end

  # Only allow a trusted parameter "white list" through.
  def command_params
    params.permit(:text, :token, :user_id, :response_url)
  end
end
