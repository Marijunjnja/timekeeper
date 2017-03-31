  module Rejax
    extend ActiveSupport::Concern

    included do
      alias_method_chain :redirect_to, :default_303
      alias_method_chain :url_for, :include_json_format_ext
    end

    def redirect_to_with_default_303(options = {}, response_status = {})
      response_status.reverse_merge! status: 303
      redirect_to_without_default_303 options, response_status
    end

    def url_for_with_include_json_format_ext(record_or_hash_or_array, options = {})
      options.reverse_merge! format: :json if request.format == :json
      url_for_without_include_json_format_ext options
    end
  end
