import Composer from 'discourse/models/composer';
import { withPluginApi } from 'discourse/lib/plugin-api';

export default {
   setupComponent(args, component) {
    const composerComponent = getOwner(this).lookup("service:composer");
    
    let composerModel = this.get("model");
    if (composerModel.action == "privateMessage") {
      withPluginApi('0.8.12', api => {
        api.modifyClass('controller:composer', {
          actions: {
            post() {
              let customValue = this.get('model.customFieldValue');
              if (customValue) {
                let currentBody = this.get('model.reply') || '';
                this.set('model.reply', currentBody + `\n\nCustom Field: ${customValue}`);
              }
              this._super();
            }
          }
        });
      }
    } 

    component.set("composerComponent", composerComponent);
  },
};
