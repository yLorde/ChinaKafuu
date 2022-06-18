const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js")
const emoji = require('../../dados/emojis')

module.exports = {
    name: 'minehead',
    async execute(message, args) {

        const nick = args[0]
        if (!nick) return message.reply('Você deve informar um nick.')

        const embed = new MessageEmbed()
        .setTitle(`${emoji.seta} ${nick}'s Minecraft Head`)
        .setImage(`https://mc-heads.net/head/${nick}/128`)
        .setColor('RED')

        await message.channel.bulkDelete(1)
        const button = new MessageButton()
        .setCustomId('delete')
        .setEmoji(emoji.delete)
        .setStyle('SECONDARY')
        .setLabel('Apagar Mensagem')

        await message.channel.send({
            content: message.author.toString(),
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        })

    },
}