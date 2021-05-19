const db = require('../mongodb/index');
require('dotenv').config();

class CommandHandler {
    constructor() {
        db.init();
        this._commandList = null;
    }

    async exec(userstate, msg) {
        if (this._commandList == null) this._commandList = await db.getAllCommands();

        let result = undefined;

        let commandName = getCommandName(msg);

        if (commandName == '!command' && isModOrBroadcaster(userstate)) {
            commandManager.exec(msg);
        }

        let command = this._commandList.find((x) => x.name == commandName);

        if (command) {
            console.log(`* command executed: ${command.name}`);
            await db.updateCommandCounter(command._id);
            return command.message;
        } else {
            console.log(`* unknown command: ${command}`);
        }

        return result;
    }
}

function getCommandName(msg) {
    return msg.split(' ')[0].replace('!', '');
}

function isModOrBroadcaster(userstate) {
    let channel = process.env.TMI_CHANNEL;
    return userstate.name == channel || userstate.mod == true;
}

const commandManager = {
    type: (msg) => {
        return msg.split(' ')[1];
    },
    name: (msg) => {
        return msg.split(' ')[2];
    },
    message: () => {
        let array = msg.split(' ');
        for (let i = 0; i < 3; i++) array.shift();
        return array.join(' ');
    },
    exec: () => {},
};

module.exports = new CommandHandler();
