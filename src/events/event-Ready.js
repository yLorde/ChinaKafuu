const Guild = require('../database/Schemas/Guild')
const User = require('../database/Schemas/User')
const Commands = require('../database/Schemas/Command')
const Client = require('../database/Schemas/Client')
const Function = require('../database/Schemas/Function')
const Ticket = require('../database/Schemas/Ticket')
const c = require('colors')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    name: 'ready',
    async execute(client) {

        client.database.users = User;
        client.database.guilds = Guild;
        client.database.commands = Commands;
        client.database.clientUtils = Client;
        client.database.functions = Function;
        client.database.ticket = Ticket;

        const dbIndex = require('../database/index')
        dbIndex.start();
    
        let cmdSize = `${client.commands.toJSON().length}`
        let servidores = client.guilds.cache.size;


        await Client.findOneAndUpdate(
            { _id: client.user.id },
            {
                $set: {
                    commands: cmdSize,
                    guilds: servidores
                }
            }
        )

        console.log(c.red
            (`
##############################################################
##                      BOT INICIADO                        ##
##                     Servidores: 00${client.guilds.cache.size}                      ##
##                     usuários: 0${client.users.cache.size}                       ##
##                     Comandos: 0${cmdSize}                        ##
##                   Criado por: Lord                       ##
##############################################################
            `))
            console.log(c.red
(`##############################################################
##                   Made in: Node.js                       ##
##                  Language: JavaScript                    ##
##                 Powered By: discord.js                   ##
##                     Version: v1.0                        ##
##############################################################`))

        client.user.setStatus('dnd');
        client.user.setActivity({
            name: 'Resso',
            type: 'LISTENING'
        });

    },
}