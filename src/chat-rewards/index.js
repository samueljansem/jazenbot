const rp = require('request-promise');

const channel = 'samueljazen';

const rewards = (username, rewardType, tags, client) => {
    let result = undefined;
    
    if (rewardFunction.hasOwnProperty(rewardType)) {
        result = rewardFunction[rewardType](username, rewardType, tags, client);
    }
    else {
        console.log(`* unknown redeem: ${rewardType}`);
    }

    return result;
};


const rewardFunction = {
    'f5bdba69-9ed7-402d-ba2b-031be28ff99b': (username, rewardType, tags, client) => { //ravezinha
        return `${username} ativou o modo Rave!`;
    },
    '4bc27f28-702e-4547-86fd-4f85e9f0d75e': (username, rewardType, tags, client) => { //tirocerto

    },
    '36dab8f0-700d-48f5-9508-eb02165d8a29': (username, rewardType, tags, client) => { //roleta
        getRandomChatter(channel, { skipList: [username] })
            .then(user => {
                if (user === null) {
                    client.say(channel, `${username}, não há ninguém disponível`);
                }
                else {
                    let { name } = user;
                    client.say(channel, `${name} foi de base na roleta! segura 5 minutin ai amigão`);
                    client.timeout(channel, name, 300, 'Foi pego na roleta amigão');
                }
            })
    }
};

function getChatters(channelName, _attemptCount = 0) {
    return rp({
        uri: `https://tmi.twitch.tv/group/user/${channelName}/chatters`,
        json: true
    })
        .then(data => {
            return Object.entries(data.chatters)
                .reduce((p, [type, list]) => p.concat(list.map(name => {
                    if (name === channelName) type = 'broadcaster';
                    return { name, type };
                })), []);
        })
        .catch(err => {
            if (_attemptCount < 3) {
                return getChatters(channelName, _attemptCount + 1);
            }
            throw err;
        })
}

function getRandomChatter(channelName, opts = {}) {
    let {
        onlyViewers = false,
        noBroadcaster = true,
        noModerators = true,
        skipList = []
    } = opts;

    return getChatters(channelName)
        .then(data => {
            let chatters = data
                .filter(({ name, type }) =>
                    !(
                        (onlyViewers && type !== 'viewers') ||
                        (noBroadcaster && type === 'broadcaster') ||
                        (noModerators && type === 'moderators') ||
                        skipList.includes(name)
                    )
                );
            return chatters.length === 0 ?
                null :
                chatters[Math.floor(Math.random() * chatters.length)];
        });
}

module.exports = rewards;
