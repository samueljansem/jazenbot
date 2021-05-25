require('dotenv').config();

const config = {
    tmi: {
        options: {
            clientId: process.env.TMI_CLIENTID,
        },
        identity: {
            username: process.env.TMI_USERNAME,
            password: process.env.TMI_PASSWORD,
        },
        connection: {
            reconnect: true,
            secure: true,
        },
        channels: [process.env.TMI_CHANNEL],
    },
    auth: {
        token: process.env.TMI_TOKEN,
    },
};

module.exports = config;
