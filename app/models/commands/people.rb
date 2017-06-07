module Commands
  class People < ::Commands::BaseCommand
    def results(*args, &block)
      buffer = "```\n"
      users = response = tenk_client.users.list(per_page: 1000).data

      discipline_groups = users.group_by(&:discipline)
      discipline_groups.map do |discipline, group|
        buffer += "\n"
        buffer += (discipline || '')
        group.each do |person|
          buffer += "\n  - [ ] #{person.display_name}"
        end
        buffer += "\n"
      end

      buffer += "```"
      yield buffer
    end
  end
end
