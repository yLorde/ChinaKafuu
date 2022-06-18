const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const emoji = require('../../dados/emojis')

module.exports = {
    name: 'mineskin',
    async execute(message, args) {

        let nick = args[0];
        if(!nick) return message.reply('Você deve informar um nick.')

        const embed = new MessageEmbed()
        .setTitle(`${emoji.seta} ${nick}'s Minecraft Skin`)
        .setImage(`https://mc-heads.net/body/${nick}/3000`)
        .setColor('RED')

        const button = new MessageButton()
        .setCustomId('delete')
        .setEmoji(emoji.delete)
        .setStyle('SECONDARY')
        .setLabel('Apagar Mensagem')

        await message.channel.bulkDelete(1)
        await message.channel.send({
            content: message.author.toString(),
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        })

    },
}