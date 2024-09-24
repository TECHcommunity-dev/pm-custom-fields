import { withPluginApi } from "discourse/lib/plugin-api";
import EmberObject, { action } from "@ember/object";
import { isEmpty } from "@ember/utils";

function initializeIntelligentTagger(api) {
  const ComposerController = api.container.lookupFactory("controller:composer");
  ComposerController.reopen({
    editPostItem: function () {
      console.log(this.get('model.title'));
      console.log(this.get('model.reply'));
    }.observes('model.reply')
  });
}

export default {
  name: "composer-topic-custom-field-container",
  initialize() {
    withPluginApi('0.0.1', initializeIntelligentTagger);
  }
};
