const { 
    MessageEmbed, 
    MessageButton,
    MessageActionRow
} = require("discord.js");
const emoji = require('../dados/emojis')

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (message.author.bot) return;

        const embed = new MessageEmbed()
        .setTitle(`**Alguém me chamou? <a:china_10:987375464702152734>**`)
        .setDescription(`<:china_seta:987377708189253673> Oláaa ${message.author}, como você está? UwU, aqui em baixo vai algumas informações úteis.`)
        .setColor('RED')
        .setThumbnail(client.user.displayAvatarURL({ size: 4096, dynamic: true }))

        const btn_discord = new MessageButton()
        .setCustomId('Discord')
        .setStyle('SECONDARY')
        .setLabel('Meu Discord')

        const btn_site = new MessageButton()
        .setCustomId('Site')
        .setStyle('SECONDARY')
        .setLabel('Meu Website')

        const btn_prefix = new MessageButton()
        .setCustomId('Prefix')
        .setStyle('SECONDARY')
        .setLabel('Meu Prefix')

        const btn_about = new MessageButton()
        .setCustomId('About')
        .setStyle('SECONDARY')
        .setLabel('Sobre Mim')
        
        const btn_del = new MessageButton()
        .setCustomId('delete')
        .setStyle('DANGER')
        .setEmoji(emoji.lixeira)

        const row = new MessageActionRow()
        row.addComponents([btn_discord, btn_site, btn_prefix, btn_about, btn_del])

        if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) {
            await message.channel.bulkDelete(1)
            return message.channel.send({
                content: message.author.toString(),
                embeds: [embed],
                components: [row]
            })
        }

    },
}