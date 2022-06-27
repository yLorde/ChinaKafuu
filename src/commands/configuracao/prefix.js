const { seta } = require('../../dados/emojis')
const { no_perm, invalid_prefix, prefixo_igual } = require('../../dados/messages')
const Guild = require('../../database/Schemas/Guild')

module.exports = {
    name: 'prefix',
    aliases: ["setprefix"],
    async execute(message, args) {

        if (!message.member.permissions.has("ADMINISTRADOR")) {
            return message.reply(seta + no_perm)
        }

        Guild.findOne({ idS: message.guild.id }, async function (err, server) {
            
            var prefixo = args[0];
            if (!prefixo) return message.reply(seta + invalid_prefix);
            if (prefixo.length > 5) return message.reply(seta + invalid_prefix)
            if (prefixo === server.prefix) return message.reply(seta + prefixo_igual)

            await Guild.findOneAndUpdate(
                { idS: message.guild.id },
                {
                    $set: {
                        prefix: prefixo
                    }
                }
            )

            return message.reply(seta + ` Agora o prefix desse servidor é: \`${prefixo}\``)

        })

    },
}