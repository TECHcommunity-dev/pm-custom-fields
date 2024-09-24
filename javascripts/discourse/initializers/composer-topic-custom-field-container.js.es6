import { withPluginApi } from "discourse/lib/plugin-api";
import EmberObject, { action } from "@ember/object";
import { isEmpty } from "@ember/utils";
import { getOwner } from "@ember/application";
import { set } from "@ember/object";



export default {
  setupComponent(args, component) {
    const composerComponent = getOwner(this).lookup("service:composer");
      let composerModel = this.get("model");

      let currentBody = this.get('model.reply') || '';
      this.set('model.reply', currentBody + `\n\nCustom Field:`);

    }
    component.set("composerComponent", composerComponent);
  },
};
