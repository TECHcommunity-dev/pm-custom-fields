import { withPluginApi } from "discourse/lib/plugin-api";
import EmberObject, { action } from "@ember/object";
import { isEmpty } from "@ember/utils";

function initializeIntelligentTagger(api) {
  api.modifyClass('controller:composer', {
    actions: {
      post() {
        let customValue = this.get('model.customFieldValue');
        
          let currentBody = this.get('model.reply') || '';
          this.set('model.reply', currentBody + `\n\nCustom Field: ${customValue}`);
        
        this._super();
      }
    }
  });
}

export default {
  name: "composer-topic-custom-field-container",
  initialize() {
    withPluginApi('0.0.1', initializeIntelligentTagger);
  }
};
