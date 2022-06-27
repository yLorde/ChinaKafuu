const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const moment = require('moment')
const { seta, importante, apagar, pessoa } = require('../../dados/emojis');

module.exports = {
    name: 'userinfo',
    aliases: ["whois"],
    async execute(message, args, client) {

        var user =
            message.mentions.members.first() ||
            message.guild.members.cache.get(args[0])
        if (!user) user = message.author;
        var member = message.guild.members.cache.get(user.id)
        var nickname = member.nickname !== undefined && member.nickname !== null ? member.nickname : 'Nenhum'

        let embed = new MessageEmbed()
            .setDescription(pessoa + ` Informações sobre: ${user}`)
            .setThumbnail(user.displayAvatarURL({ size: 4096, dynamic: true }))
            .addField(seta + 'Nickname:', `${nickname}`)
            .addField(seta + 'ID:', `${user.id}`)
            .addField(seta + 'Entrou no server em:', `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss')}`)
            .addField(seta + 'Roles:', `\n<@&${member.roles.cache.map(r => r.id).join('> \n<@&')}>`)
            .setTimestamp()
            .setColor('RED')

        const button = new MessageButton()
            .setCustomId('delete')
            .setLabel('Apagar Mensage')
            .setStyle('SECONDARY')
            .setEmoji(apagar)

        await message.channel.bulkDelete(1)
        await message.channel.send({
            content: message.author.toString(),
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        });

    },
}