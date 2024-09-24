import { withPluginApi } from "discourse/lib/plugin-api";
import EmberObject, { action } from "@ember/object";
import { isEmpty } from "@ember/utils";

export default {
	name: "pm-custom-fields",

	initialize() {

		withPluginApi("0.8", (api) => {
			api.modifyClass('controller:topic', {
				pluginId: 'pm-custom-fields',
				actions: {
				      post() {
				        let customValue = this.get('model.customFieldValue');
				        
				          let currentBody = this.get('model.postStream') || '';
				          this.set('model.postStream', currentBody + `\n\nCustom Field: ${customValue}`);
				        
				        this._super();
				      }
				    }
			});
		});
	}
};
