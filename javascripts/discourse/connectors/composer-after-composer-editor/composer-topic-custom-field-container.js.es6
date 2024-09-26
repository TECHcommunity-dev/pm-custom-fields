import { getOwner } from "@ember/application";
import { set } from "@ember/object";

export default {
  setupComponent(args, component) {
    const composerComponent = getOwner(this).lookup("service:composer");
    
    let composerModel = this.get("model");

    if (composerModel.action == "privateMessage") {
      set(composerComponent, "isPrivateMessage", true)
    } 
    else if (composerModel.action == "reply" && composerModel.get('privateMessage') == true) {
      set(composerComponent, "isPrivateMessage", true)
    }
    else {          
      set(composerComponent, "isPrivateMessage", false)
    }
    
    component.set("composerComponent", composerComponent);
  },
};
