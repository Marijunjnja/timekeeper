module Commands
  class ListProjects < ::Commands::BaseCommand
    def results(*args)
      "\nProjects:\n" + list_projects
    end

    def list_projects
      projects.map do |project|
        "\n- #{project.name} (#{project.name.downcase.parameterize})"
      end.join('')
    end
  end
end
