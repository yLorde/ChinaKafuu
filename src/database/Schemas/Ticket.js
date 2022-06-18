const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    idS: { type: String },
    nome: { type: String },
    parent: { type: String, default: "null" },
    channel: { type: String, default: "null" },
    staff: { type: String, default: "null" },
    termos: { type: String, default: "desconfigurado" },
})

const Ticket = mongoose.model("Ticke", ticketSchema);
module.exports = Ticket;