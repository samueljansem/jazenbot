const mihome = require('node-mihome-miled');
const deviceInfo = require('./device-info');
const user = require('./user');
const colors = require('./colors');
const events = require('events');
const emitter = new events.EventEmitter();

class MiLed {
    constructor() {
        this._device = null;
        this._isLive = null;

        emitter.on('is_live', (islive) => {
            this._isLive = islive;
            if (islive) this.init();
            else this.logout();
            console.log(`* live state changed to ${islive}`);
        });
    }

    async init() {
        await this.login();
        this._device = await this.getDevice();
    }

    async logout() {
        await mihome.miCloudProtocol.logout();
        console.log('* logout micloud')
    }

    async login() {
        mihome.miioProtocol.init();
        mihome.aqaraProtocol.init();
        await mihome.miCloudProtocol.login(user.name, user.password);
        console.log('* trying to login on micloud');
    }

    async getDevice() {
        let device = await mihome.device({
            id: deviceInfo.id,
            model: deviceInfo.model,
            address: deviceInfo.address,
            token: deviceInfo.token,
            refresh: deviceInfo.refresh,
        });

        return device;
    }

    async setColor(color) {
        if (colors.hasOwnProperty(color)) {
            let params = [colors[color], 'smooth', 500];
            this._device.setColor(params);
            console.log(`* cor alterada para ${color}`);
            return `Cor alterada para ${color}`;
        } else {
            return `Cor indisponível, para saber quais cores você pode utilizar, use !cores`;
        }
    }
}

module.exports = new MiLed();
