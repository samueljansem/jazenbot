const miled = require('../mi-led');
const colors = require('../mi-led/colors');

const commands = (userstate, msg) => {
    let result = undefined;

    let command = getCommand(msg);

    if (commandFunctions.hasOwnProperty(command)) {
        result = commandFunctions[command](msg);
    } else {
        console.log(`* unknown command: ${command}`);
    }

    return result;
};

const commandFunctions = {
    commands: () => {
        let commands = Object.keys(commandFunctions).join(', ');
        return `Comandos disponíves: ${commands}`;
    },
    bot: () => {
        return `Fui criado pelo grande Jazen, meu objetivo é o extermínio da humani... ops, meu objetivo é servir!`;
    },
    dpi: () => {
        return `800dpi 0.4 in-game`;
    },
    mira: () => {
        return `1-2-2-1 (Rosa)`;
    },
    nt: () => {
        return `NEM TENTOU`;
    },
    social: () => {
        return `Você pode me encontrar em todas as redes sociais por aqui: linktr.ee/jazen`;
    },
    loja: () => {
        return `https://streamelements.com/samueljazen/store`;
    },
    donate: () => {
        return `Para fazer uma doação acesse: https://streamelements.com/samueljazen/tip`;
    },
    luz: async (msg) => {
        let color = msg.split(' ')[1];
        return await miled.setColor(color);
    },
    cores: () => {
        let cores = Object.keys(colors).join(', ');
        return cores;
    },
};

function getCommand(msg) {
    return msg.split(' ')[0].replace('!', '').toLocaleLowerCase();
}

module.exports = commands;
