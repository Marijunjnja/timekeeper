require 'rails_helper'

RSpec.describe JsonHelper, type: :helper do
  class ExampleModel
    def attributes
      {}
    end

    def errors
      {}
    end

    def children
      @_children ||= []
    end
  end

  class ExampleSubModel
    attr_accessor :parent

    def attributes
      {}
    end

    def errors
      {}
    end
  end

  describe '#json_form' do
    it do
      parent = ExampleModel.new
      child = ExampleSubModel.new
      parent.children << child
      child.parent = parent
      expect(helper.json_form(parent, nest: [:children])).to respond_to(:attributes)
      expect(helper.json_form(child, nest: [:parent])).to respond_to(:attributes)
    end
  end
end
