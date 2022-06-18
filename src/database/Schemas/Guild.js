const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let guildSchema = new Schema({
  idS: { type: String },
  prefix: { type: String, default: "c." },
  nome: { type: String, default: "null" },
  welcome: {
    channel: { type: String, default: "null" },
  },
  exit: {
    channel: { type: String, default: "null" },
  },
  captcha: {
    role: { type: String, default: "null" },
  },
  logs: {
    channel: { type: String, default: "null" },
    status: { type: Boolean, default: false },
  },
  autorole: {
    role: { type: String, default: "null" },
  },
  mutes: {
    list: { type: Array, default: [] },
    has: { type: Number, default: 0 },
  },
  levelUp: {
    channel: { type: String, default: "null" },
    role: { type: Array, default: [] },
  },
});

let Guild = mongoose.model("Guilds", guildSchema);
module.exports = Guild;