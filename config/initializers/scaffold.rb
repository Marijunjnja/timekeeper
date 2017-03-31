require 'rails/generators'
require 'rails/generators/erb/scaffold/scaffold_generator'

module Rails
  module Generators
    class ReactScaffoldGenerator < Erb::Generators::ScaffoldGenerator
       def copy_view_files
        Dir.chdir('render-server') do
          system "slush revelry:module #{controller_class_name.pluralize.dasherize.downcase}"
        end
      end

      hook_for :form_builder, :as => :scaffold
      hook_for :jbuilder_props, default: true
    end
  end
end
