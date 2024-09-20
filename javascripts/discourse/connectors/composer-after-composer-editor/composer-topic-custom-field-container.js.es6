import Composer from 'discourse/models/composer';
import { withPluginApi } from 'discourse/lib/plugin-api';
import { getOwner } from "@ember/application";
import { set } from "@ember/object";

export default {
   setupComponent(args, component) {
    const composerComponent = getOwner(this).lookup("service:composer");
    
    let composerModel = this.get("model");
    if (composerModel.action == "privateMessage") {
      withPluginApi('0.8.12', api => {
        api.modifyClass('controller:composer', {
			pluginId: 'custom-composer',

			init() {
			  this._super(...arguments);
			  this.set('customFieldValue', ''); // Initialize the custom field value
			},

			actions: {
			  createTopic() {
				let customFieldValue = this.get('customFieldValue');
				
				// Get current post body and append custom text
				let postBody = this.get('model.raw');
				if (customFieldValue) {
				  postBody = `${postBody}\n\nCustom Field Value: ${customFieldValue}`;
				}

				// Update post body with custom text
				this.set('model.raw', postBody);

				// Proceed with the default createTopic action
				this._super(...arguments);
			  }
			}
		});
      }
    } 

    component.set("composerComponent", composerComponent);
  },
};
