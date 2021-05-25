const mihome = require('node-mihome-miled');
const deviceInfo = require('./device-info');
const user = require('./user');
const colors = require('./colors');

class MiLed {
    constructor() {
        this._device = null;
        this.init();
    }

    async init() {
        await this.login();
        this._device = await this.getDevice();
    }

    async login() {
        mihome.miioProtocol.init();
        mihome.aqaraProtocol.init();
        await mihome.miCloudProtocol.login(user.name, user.password);
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
            return `Cor alterada para ${color}`;
        } else {
            return `Cor indisponível, para saber quais cores você pode utilizar, use !cores`;
        }
    }
}

module.exports = new MiLed();