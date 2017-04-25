module Commands
  class BaseCommand
    include ActionView::Helpers::NumberHelper

    def connection(params)
      Faraday.new(url: params[:response_url]) do |faraday|
        faraday.adapter Faraday.default_adapter
      end
    end

    def tenk_client
      token = ENV['TENK_TOKEN'] || fail('No api token set. Set TENK_TOKEN environment variable.')
      @_client ||= Tenk.new token: token, api_base: ENV['TENK_API_BASE']
    end

    def projects
      projects = []
      page = 1

      loop do
        response = tenk_client.projects.list(page: page, filter_field: 'project_state', filter_list: 'Confirmed')
        new_projects = response.data
        projects << new_projects
        break unless response.paging.next
        page += 1
      end

      projects.flatten!.sort_by!(&:name)
    end
  end
end
