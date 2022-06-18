const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let clientSchema = new Schema({
    _id: { type: String },
    manutenção: { type: Boolean, default: false },
    reason: { type: String },
    blackslist: { type: Array, default: [] },
    ranks: {
        coins: { type: Array, default: [] },
    },
    guilds: { type: String, default: "null" },
    commands: { type: String, default: "null" },
})

let Client = mongoose.model("Client", clientSchema)
module.exports = Client;