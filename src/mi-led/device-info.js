require('dotenv').config();

const deviceInfo = {
    id: '240727541',
    model: 'yeelink.light.color5',
    address: '192.168.1.72',
    token: process.env.MIHOME_DEVICETOKEN,
    refresh: 5000,
};

module.exports = deviceInfo;
