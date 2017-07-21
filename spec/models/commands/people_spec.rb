require 'rails_helper'

describe Commands::People do
  it 'returns a list of people' do
    ClimateControl.modify TENK_TOKEN: '' do
      command = Commands::People.new
      data = [
        OpenStruct.new(display_name: 'tester1', discipline: 'test1'),
        OpenStruct.new(display_name: 'tester2', discipline: 'test1'),
        OpenStruct.new(display_name: 'tester3', discipline: 'test2'),
      ]
      allow(command.tenk_client.users).to receive(:list).and_return(OpenStruct.new data: data)
      command.results {}
    end
  end
end
