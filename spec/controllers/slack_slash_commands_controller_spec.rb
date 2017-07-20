require 'rails_helper'

RSpec.describe SlackSlashCommandsController, type: :controller do
  describe '#create' do
    it 'can handle a command' do
      ClimateControl.modify SLACK_SLASH_TOKEN: 'token' do
        post :create, token: 'token', text: 'people'
      end
    end
  end
end
