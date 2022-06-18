const Guild = require('../database/Schemas/Guild')
const { yellow } = require('colors')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        Guild.findOne({ idS: message.guild.id }, async function (err, server) {
        
            var prefix = server.prefix;

            if (
                message.author.bot ||
                !message.guild ||
                !message.content.startsWith(prefix)
            ) return
    
            const args = message.content.slice(prefix.length).trim().split(/\s+/g)
            const commandName = args.shift().toLowerCase()
    
            const command =
                client.commands.get(commandName) ||
                client.commands.find(
                    (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
                )
    
            if (!command) return
    
            try {
                await command.execute(message, args)
            } catch (err) {
                message.reply(`Erro ao tentar executar esse comando.`)
                console.log(yellow(err))
            }  
        
        })

    },
}