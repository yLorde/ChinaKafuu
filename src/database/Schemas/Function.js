const mongoose = require('mongoose')
const Schema = mongoose.Schema

let functionSchema = new Schema({
 
    idS: { type: String },
    criados: { type: Number, default: 0 },
    nome: { type: String, default: "null" },
    info: {
        nome: { type: String },
        membros: { type: String },
        verificado: { type: Boolean, default: false },
        premium: { type: Boolean, default: false },
        whitelist: { type: Boolean, default: false },
        blacklist: { type: Boolean, default: false },
    },
    channels: {
        instagram: { type: String, default: "null" },
        welcome: { type: String, default: "null" },
        leave: { type: String, default: "null" },
        log: { type: String, default: "null" },
        messageDelete: { type: String, default: "null" },
        messageEdit: { type: String, default: "null" },
        joinCall: { type: String, default: "null" },
        joinAndLeaveLog: { type: String, default: "null" },
        onlyImage: { type: String, default: "null" },
        memberCount: { type: String, default: "null" },
        memberCountName: { type: String, default: "null" }
    },
    loja: {
        role: { type: String, default: "null" },
        estoque: { type: Number, default: 0 }
    },
    
})

const Function = mongoose.model("Function", functionSchema)
module.exports = Function;