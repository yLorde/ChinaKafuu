const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const emoji = require('../../dados/emojis')
const messages = require('../../dados/messages')

module.exports = {
    name: 'limpar',
    async execute(message, args) {

        if (!message.member.permissions.has("MANAGE_MESSAGES")) {
            return message.reply(emoji.importante + messages.no_perm)
        }

        var del = args[0]

        if (!del) {
            return message.reply(emoji.seta + messages.no_del_size)
        }

        if (isNaN(del)) {
            await message.channel.bulkDelete(1)
            return
        }

        if (del < 2) return message.reply(emoji.seta + messages.select_more_of_2)
        if (del > 100) return message.reply(emoji.seta + messages.select_down_of_100)
        if (del == 0) return message.reply(emoji.seta + messages.no_del_size)

        let bb = await message.channel.bulkDelete(del, { filterOld: 14 }).then(msgs => {

            const cleared = new MessageEmbed()
                .setColor('RED')
                .setTitle(emoji.importante + ' Limpador de mensagens')
                .setDescription(`${emoji.lixeira} **Mensagens Limpas:** ${msgs.size}\n\n${emoji.seta} **Solicitante:** ${message.author.tag}`)
                .setTimestamp()

            const button = new MessageButton()
                .setCustomId('delete')
                .setStyle('SECONDARY')
                .setLabel('Apagar Mensagem')
                .setEmoji(emoji.china_02)

            message.channel.send({
                embeds: [cleared],
                components: [new MessageActionRow().addComponents(button)]
            })
        })


    },
}