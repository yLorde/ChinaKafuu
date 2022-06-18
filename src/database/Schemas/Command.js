const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let commandScehma = new Schema({
    _id: { type: String },
    usages: { type: Number, default: 0 },
    manuntenção: { type: Boolean, default: false },
    reason: { type: String },
})

let Command = mongoose.model("Commands", commandScehma)
module.exports = Command;