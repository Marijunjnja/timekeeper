describe CommandWorker do
  let(:command_worker) { CommandWorker.new }

  it 'can perform async' do
    params = {
      response_url: 'http://www.example.com/',
      text: 'list',
    }

    stub_request(:post, 'http://www.example.com/')
    stub_request(:get, "https://api.10000ft.com/api/v1/projects?fields=&filter_field=project_state&filter_list=Confirmed&page=1&per_page=20&with_archived=false&with_phases=false").
      to_return(status: 200, body: '{"data":[{"id":183760,"archived":false,"archived_at":null,"description":null,"guid":"ef3d0b58-eb2e-422a-85c5-0cc669ec167f","name":"Getting the most out of 10,000ft","parent_id":null,"phase_name":null,"project_code":null,"secureurl":"/images/sample_proj_balloons.jpeg","secureurl_expiration":"2017-01-26T22:13:44Z","settings":16,"timeentry_lockout":-1,"ends_at":"2017-05-24","starts_at":"2017-01-25","deleted_at":null,"created_at":"2017-01-25T23:13:44Z","updated_at":"2017-01-26T21:02:24Z","use_parent_bill_rates":false,"thumbnail":"/images/sample_proj_balloons.jpeg","type":"Project","has_pending_updates":false,"client":null,"project_state":"Internal","tags":{"paging":{"self":"/api/v1/projects/183760/tags?per_page=0&page=1","next":null,"previous":null,"page":1,"per_page":0}},"data":[]}], "paging": {}}')

    ClimateControl.modify TENK_TOKEN: '' do
      expect do
        command_worker.perform(params)
      end.to_not raise_error
    end
  end
end
