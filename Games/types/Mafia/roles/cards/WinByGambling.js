const Card = require("../../Card");
const { PRIORITY_WIN_BY_GAMBLING } = require("../../const/Priority");


module.exports = class WinByGambling extends Card {

	constructor(role) {
		super(role);
		//this.target = "";
		this.gambleCount = 0;

		this.winCheck = {
			priority: PRIORITY_WIN_BY_GAMBLING,
			check: function (counts, winners, aliveCount) {
				if (this.gambleCount === 3) {
					winners.addPlayer(this.player, this.name);
					return true;
				}
			}
		};
		this.listeners = {

			"state": function (stateInfo) {
				if (!this.player.alive)
					return;
			},
			"death": function (player, killer, deathType) {
				if (player == this.target && deathType == "gamble" && this.player.alive) {
					this.gambleCount++;
				}
			}
		};
	}

}