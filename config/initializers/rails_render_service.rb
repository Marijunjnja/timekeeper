  Rails.application.config.rails_render_service.get_uri = lambda do
    "unix://#{Rails.root.join ENV['RENDER_SERVICE_SOCKET']}"
  end
