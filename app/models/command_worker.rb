class CommandWorker
  def perform_async(params)
    Thread.new do
      perform(params)
    end
  end

  def perform(params)
    report(params) do |msg|
      connection(params).post do |req|
        req.url params[:response_url]
        req.headers['Content-Type'] = 'application/json'
        req.body = JSON.generate({
          response_type: 'in_channel',
          text: msg,
        })
      end
    end
  end

  def connection(params)
    Faraday.new(url: params[:response_url]) do |faraday|
      faraday.adapter Faraday.default_adapter
    end
  end

  def report(params, &block)
    name, *args = params[:text].split(' ')
    command_class_for(name).new.results(*args, &block)
  end

  def command_class_for(command_name)
    case command_name.downcase
    when 'projects'
    when 'list'
      return Commands::ListProjects
    when 'people'
      return Commands::People
    when 'hours'
      return Commands::Hours
    when 'hours_all'
      return Commands::AllHours
    when 'hours_report'
      return Commands::HoursReport
    end
  end
end
