const { MongoClient } = require('mongodb');
const options = require('./options');
require('dotenv').config();

class JazenbotDb {
    constructor() {
        this._client = new MongoClient(process.env.MONGODB_URI, options);
    }

    async init() {
        try {
            await this._client.connect();
        } catch (e) {
            console.log(e);
        }
    }

    async getAllCommands() {
        try {
            return await this._client.db('dbjazenbot').collection('commands').find({}).toArray();
        } catch (e) {
            console.log(e);
        }
    }

    async getAllCommandNames() {
        try {
            return await (
                await this._client.db('dbjazenbot').collection('commands').find({}).toArray()
            ).reduce((acc, command) => {
                acc.push(command.name);
                return acc;
            }, []);
        } catch (e) {
            console.log(e);
        }
    }

    async getCommand(alias) {
        try {
            return await this._client.db('dbjazenbot').collection('commands').findOne({ name: alias });
        } catch (e) {
            console.log(e);
        }
    }

    async addCommand(alias, message, subonly = false, modonly = false) {
        try {
            let exists = !!(await this.getCommand(alias));
            if (exists) {
                return `Este comando já existe`;
            } else {
                return await this._client.db('dbjazenbot').collection('commands').insertOne({
                    name: alias,
                    message,
                    subonly,
                    modonly,
                    counter: 0,
                });
            }
        } catch (e) {
            console.log(e);
        }
    }

    async editCommand(command) {
        try {
            return await this._client.db('dbjazenbot').collection('commands').updateOne({ _id: command._id }, command);
        } catch (e) {
            console.log(e);
        }
    }

    async removeCommand(alias) {
        try {
            return await this._client.db('dbjazenbot').collection('commands').deleteOne({ name: alias }, true);
        } catch (e) {
            console.log(e);
        }
    }

    async updateCommandCounter(id) {
        try {
            return await this._client
                .db('dbjazenbot')
                .collection('commands')
                .updateOne(
                    { _id: id },
                    {
                        $inc: { counter: 1 },
                    }
                );
        } catch (e) {
            console.log(e);
        }
    }

    async dispose() {
        await this._client.close();
    }
}

module.exports = new JazenbotDb();
