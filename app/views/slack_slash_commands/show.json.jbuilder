json.name 'slack_slash_commands/show'
json.slack_slash_command do
  json.extract! @slack_slash_command, :id, :created_at, :updated_at
end
