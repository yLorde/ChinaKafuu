const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let userSchema = new Schema({
    idU: { type: String },
    idS: { type: String },
    tag: { type: String },
    guild: { type: String },
    coins: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
    bank: { type: Number, default: 0 },
    Exp: {
        xp: { type: Number, default: 0 },
        level: { type: Number, default: 1 },
        nextLevel: { type: Number, default: 100 },
    },
    work: {
        exp: { type: Number, default: 1 },
        level: { type: Number, default: 1 },
        nextLevel: { type: Number, default: 250 },
        cooldown: { type: Number, default: 0 },
        coins: { type: Number, default: 200 },
        name: { type: String, default: "null" },
    },
    reminder: {
        list: { type: Array, default: [] },
        has: { type: Number, default: 0 },
    },
    marry: {
        time: { type: Number, default: 0 },
        user: { type: String, default: "null" },
        has: { type: Boolean, default: false },
    },
})

const User = mongoose.model("Users", userSchema);
module.exports = User;