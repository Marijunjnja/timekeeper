class SlackSlashCommandsController < ApplicationController
  skip_before_action :verify_authenticity_token, raise: false

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
