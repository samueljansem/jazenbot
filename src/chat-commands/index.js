const miled = require('../mi-led');
const colors = require('../mi-led/colors');
const db = require('../mongodb/index');
const em = require('../events/common');
require('dotenv').config();

class CommandHandler {
    constructor() {
        db.init();
        this._commandList = null;
        this._islive = null;

        em.on('islive', (islive) => {
            this._islive = islive;

            if (islive) miled.init();
        });
    }

    async exec(userstate, msg) {
        if (this._commandList == null) this._commandList = await db.getAllCommands();

        let result = undefined;

        let commandName = getCommandName(msg);

        if (commandName == '!command' && isModOrBroadcaster(userstate)) {
            commandManager.exec(msg);
        }

        if (commandName == 'luz') {
            if (this._islive) {
                let color = getCommandColor(msg);
                let message = await miled.setColor(color);
                return message;
            }
            return `Esse comando só pode ser utilizado quando o pai ta on!`;
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

function getCommandColor(msg) {
    return msg.split(' ')[1];
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
    exec: () => { },
};

module.exports = new CommandHandler();
