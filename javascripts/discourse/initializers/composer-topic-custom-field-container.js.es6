import { withPluginApi } from "discourse/lib/plugin-api";
import EmberObject, { action } from "@ember/object";
import { isEmpty } from "@ember/utils";

export default {
	name: "pm-custom-fields",

	initialize() {

		withPluginApi("0.8", (api) => {
			api.modifyClass('route:tag-show', {
				pluginId: 'pm-custom-fields',
				actions: {
					//Modified createTopic action methods on 22-02-2021 as discourse update createTopic action method.
					createTopic() {
						//Called super class createTopic action to grab the changes in discourse core. [08-04-2021]
						this._super(...arguments);

						if (this.get("currentUser.has_topic_draft")) {
							this.openTopicDraft();
						} else {
							const Composer = require("discourse/models/composer");
							const controller = this.controllerFor("tag.show");
							const composerController = this.controllerFor("composer");
							const {
								makeArray
							} = require("discourse-common/lib/helpers");

							composerController
								.open({
									categoryId: controller.get("category.id"),
									action: Composer.CREATE_TOPIC,
									draftKey: Composer.NEW_TOPIC_KEY,
								})
								.then(() => {
									let customFieldValue = this.get('customFieldValue');

									// Get current post body and append custom text
									let postBody = this.get('model.raw');
									
									postBody = `${postBody}\n\nCustom Field Value: ${customFieldValue}`;
									

									// Update post body with custom text
									this.set('model.raw', postBody);
								});
						}
					}
				}
			});
		});
	}
};
