const { MessageEmbed, MessageButton, Emoji, MessageActionRow, ApplicationFlags, User } = require("discord.js");
const moment = require('moment')
moment.locale('pt-br')
const { seta, apagar } = require("../../dados/emojis");

module.exports = {
    name: 'guildinfo',
    aliases: ["serverinfo", "serverabout"],
    async execute(message) {

        const members = message.guild.members.cache;
        const channels = message.guild.channels.cache;
        const date = message.guild.createdAt
        const joined = message.member.joinedAt
        const region = {
            brazil: ':flag_br: Brasil'
        }
        var embed = new MessageEmbed()
            .setThumbnail(message.guild.iconURL({ dynamic: true }))
            .setTitle('🔍 Informações do servidor')
            .setColor('RED')
            .setDescription(`
${seta} **Nome:** ${message.guild.name}
${seta} **Dono:** <@${message.guild.ownerId}>
${seta} **ID:** ${message.guild.id}
${seta} **👥Membro(s):** ${message.guild.memberCount}
${seta} **🤖Bot(s):** ${members.filter(member => member.user.bot).size}
${seta} **🎁Boosts:** ${message.guild.premiumSubscriptionCount}
${seta} **💬Canais de texto:** ${channels.filter(channel => channel.type === 'text').size}
${seta} **🗣Canais de voz:** ${channels.filter(channel => channel.type === 'voice').size}
${seta} **Criado em:** ${moment(date).format('DD/MM/YYYY, à\\s HH:mm:ss')}
${seta} **Você entrou em:** ${moment(joined).format('DD/MM/YYYY, à\\s HH:mm:ss')}`)
.setTimestamp()

        const button = new MessageButton()
        .setCustomId('delete')
        .setLabel('Apagar Mensagen')
        .setStyle('SECONDARY')
        .setEmoji(apagar)
        
        await message.channel.bulkDelete(1)
        await message.channel.send({
            content: message.author.toString(),
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        })

    },
}