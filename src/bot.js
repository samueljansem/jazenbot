const tmi = require('tmi.js');
const config = require('./tmi-client-config');
const client = new tmi.client(config.tmi);
const commands = require('./chat-commands');
const rewards = require('./chat-rewards');
const twitchLive = require('./events/twitch-live');

init();

function init() {
    client.on('message', onMessageHandler);
    client.on('connected', onConnectedHandler);
    client.on('subscription', onSubHandler);
    client.on('resub', onResubHandler);
    client.on('redeem', onRedeemHandler);
    client.connect();
    twitchLive.init();
}

async function onMessageHandler(channel, userstate, msg, self) {
    if (self || userstate.username === 'streamelements') return;

    let response = undefined;

    if (isChatCommand(msg)) response = await commands(userstate, msg);

    if (!!response) client.say(channel, response);
}

function onSubHandler(channel, username, method, message, userstate) {
    client.say(channel, `${username} muito obrigadoo pelo sub, fortalece demais!`);
}

function onResubHandler(channel, username, months, message, userstate, methods) {
    let cumulativeMonths = ~~userstate['msg-param-cumulative-months'];

    client.say(channel, `${username} já está a ${cumulativeMonths} com a gente, muito obrigado pela força zé!`);
}

function onRedeemHandler(channel, username, rewardType, tags) {
    let response = undefined;

    response = rewards(username, rewardType, tags, client);

    if (!!response) client.say(channel, response);
}

function onConnectedHandler(addr, port) {
    console.log(`* connected to ${addr}:${port}`);
}

const isChatCommand = (msg) => {
    return msg.charAt(0) == '!';
};
