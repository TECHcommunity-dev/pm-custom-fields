import { getOwner } from "@ember/application";
import { set } from "@ember/object";

export default {
  setupComponent(args, component) {
    const composerComponent = getOwner(this).lookup("service:composer");
    
    let composerModel = this.get("model");
    if (composerModel.action == "privateMessage") {
      set(composerComponent, "isPrivateMessage", false)
    } 
    else {          
      set(composerComponent, "isPrivateMessage", true)
    }
    
    component.set("composerComponent", composerComponent);
  },
};
