const Card = require("../../Card");
const { PRIORITY_INTERROGATE_EXECUTE, PRIORITY_INTERROGATE_MEETING } = require("../../const/Priority");

module.exports = class InterrogateTarget extends Card {

	constructor(role) {
		super(role);

		this.meetings = {
			"Interrogate Target": {
				states: ["Day"],
				flags: ["voting"],
				action: {
					labels: ["interrogate"],
					priority: PRIORITY_INTERROGATE_MEETING,
					run: function () {
						if (this.dominates()) {
							this.target.holdItem("Manacles");
							this.actor.role.data.prisoner = this.target;
						}
					}
				}
			},
			"Jail ": {
				actionName: "Execute Prisoner",
				states: ["Night"],
				flags: ["group", "speech", "voting", "anonymous"],
				inputType: "boolean",
				leader: true,
				shouldMeet: function () {
					for (let player of this.game.players)
						if (player.hasItem("Manacles"))
							return true;

					return false;
				},
				action: {
					priority: PRIORITY_INTERROGATE_EXECUTE,
					run: function () {
						var prisoner = this.actor.role.data.prisoner;

						if (!prisoner)
							return;

						if (this.target == "Yes")
							prisoner.kill("basic", this.actor);
					}
				}
			}
		};
	}

}