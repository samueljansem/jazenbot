const em = require('./common');
const axios = require('axios').default;
require('dotenv').config();

class TwitchLive {
    constructor() {
        this._timer = null;
        this._token = null;
    }

    async init() {
        await this.getToken();

        this._timer = setInterval(() => {
            this.isLive();
        }, 5000);
    }

    async getToken() {
        let url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.TMI_CLIENTID}&client_secret=${process.env.TMI_CLIENTSECRET}&grant_type=client_credentials`;

        let { data } = await axios.post(url);

        this._token = data['access_token'];
    }

    async isLive() {
        let url = `https://api.twitch.tv/helix/search/channels?query=${process.env.TMI_CHANNEL}`;

        let args = {
            headers: {
                'client-id': process.env.TMI_CLIENTID,
                authorization: `Bearer ${this._token}`,
            },
        };

        let { data } = await axios.get(url, args).catch((er) => console.log(er));

        let channel = data.data.find((item) => item['broadcaster_login'] == process.env.TMI_CHANNEL);

        let islive = !!channel['is_live'];

        em.emit('islive', islive);
    }
}

module.exports = new TwitchLive();
