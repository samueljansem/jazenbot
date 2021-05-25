require('dotenv').config();

const user = {
    name: process.env.MIHOME_USER,
    password: process.env.MIHOME_PASSWORD,
    options: {
        country: 'us',
    },
};

module.exports = user;
