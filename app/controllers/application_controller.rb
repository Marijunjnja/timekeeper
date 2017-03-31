class ApplicationController < ActionController::Base
  include RailsRenderService::Concern
  include Rejax
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
end
