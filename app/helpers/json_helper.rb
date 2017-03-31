  module JsonHelper
    # E.g., json_form(@article, nest: [:author, :comments])
    def json_form(model, opts = {})
      # return unless model
      Jbuilder.new do |json|
        _json_form_json(json, model, opts)
      end
    end

    private

    def _json_form_json(json, model, opts={})
      return unless model
      json.merge! model.attributes
      json.errors model.errors.any? ? model.errors.to_hash : nil

      # Requested inclusion of nested attributes
      if opts[:nest]
        opts[:nest].each do |relationship_sym|
          nested_model = model.send(relationship_sym)
          # Relationship is a collection we need to map
          if nested_model.respond_to? :map
            json.set! relationship_sym, nested_model do |model|
              _json_form_json(json, model)
            end
          # Singular relationship to set
          else
            json.set! relationship_sym, json_form(nested_model)
          end
        end
      end
    end
  end
