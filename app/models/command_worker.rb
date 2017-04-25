class CommandWorker
  def perform_async(params)
    Thread.new do
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

  def report(params)
    name, *args = params[:text].split(' ')
    report = command_class_for(name).new.results(*args)
  end

  def command_class_for(command_name)
    case command_name.downcase
    when 'list'
      return Commands::ListProjects
    when 'hours'
      return Commands::Hours
    when 'hours_all'
      return Commands::AllHours
    end
  end
end
