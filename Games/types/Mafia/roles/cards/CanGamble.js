const Card = require("../../Card");
const { PRIORITY_GAMBLE } = require("../../const/Priority");

module.exports = class CanGamble extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Probe": {
				actionName: "Gamble",
				states: ["Day"],
				flags: ["voting"],
				action: {
					labels: ["effect", "probe"],
					priority: PRIORITY_GAMBLE,
					run: function () {
						this.target.giveEffect("Probe", this.actor);
					}
				}
			}
		}
	}
}
