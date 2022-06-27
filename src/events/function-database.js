const Guild = require('../database/Schemas/Guild')
const User = require('../database/Schemas/User')
const Commands = require('../database/Schemas/Command')
const Client = require('../database/Schemas/Client')
const Function = require('../database/Schemas/Function')
const Ticket = require('../database/Schemas/Ticket')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        try {

            if (message.author.bot) return;
            if (!message.guild) return;

            var user = await User.findOne({
                idU: message.author.id,
                idS: message.guild.id
            });
            var bot = await Client.findOne({
                _id: client.user.id,
            });
            var fnct = await Function.findOne({
                idS: message.guild.id,
            });
            var ticket = await Ticket.findOne({
                idS: message.guild.id,
            });
            var guild = await Guild.findOne({
                idS: message.guild.id,
            });
    
            if (!user) {
                await User.create({
                    idU: message.author.id,
                    idS: message.guild.id,
                    tag: message.author.tag,
                    guild: message.guild.name
                })
            }
    
            if (!bot) {
                await Client.create({
                    _id: client.user.id,
                    reason: "",
                    manuntenção: false
                })
            }
    
            if (!fnct) {
                await Function.create({
                    idS: message.guild.id,
                    "info.nome": message.guild.name,
                    "info.membros": message.guild.memberCount,
                })
            }

            if (!ticket) {
                await Ticket.create({
                    idS: message.guild.id,
                    nome: message.guild.name,
                })
            }

            if (!guild) {
                await Guild.create({
                    idS: message.guild.id,
                    nome: message.guild.name,
                })
            }

        } catch (err) {



        }

    },
}