const Item = require("../Item");

module.exports = class Manacles extends Item {

    constructor(reveal) {
        super("Manacles");

        this.reveal = reveal;
        this.lifespan = 1;
        this.meetings = {
            "Jail ": {
                actionName: "Execute Prisoner",
                states: ["Night"],
                flags: ["group", "speech", "voting", "anonymous"],
                inputType: "boolean",
                canVote: false
            }
        };
    }

    shouldDisableMeeting(name, options) {
        var stateInfo = this.game.getStateInfo();

        if (stateInfo.name.match(/Night/) && name != "Jail ")
            return true;
    }

}