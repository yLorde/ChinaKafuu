const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const emoji = require('../../dados/emojis')
const messages = require('../../dados/messages')

module.exports = {
    name: 'removerole',
    aliases: ["tirarcargo", "rrole"],
    async execute(message, args, client) {

        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply(emoji.seja + messages.no_perm)
        }

        let user = 
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]);

        let role = 
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[1]);

        if (!user) return message.reply(emoji.seta + messages.no_member);
        if (!role) return message.reply(emoji.seta + messages.select_role);

        if (message.member.roles.highest.position < role.position) {
            return message.reply(emoji.seta + messages.up_role_you)
        };

        if (message.member.roles.highest.position < user.roles.highest.position) {
            return message.reply(emoji.seta + messages.up_member_you)
        };

        const embed = new MessageEmbed()
        .setTitle(`${emoji.importante} Gerenciador De Cargos`)
        .setDescription(`Atualizado os cargos do membro ${user}, foi removido ${role}`)
        .setColor('RED')

        const button = new MessageButton()
        .setCustomId('delete')
        .setLabel('Apagar Mensagem')
        .setStyle('SECONDARY')
        .setEmoji(emoji.delete)
        
        var row = new MessageActionRow()
        row.addComponents([button])

        const err = new MessageEmbed()
        .setTitle(emoji.importante + messages.command_execute_erro)
        .setDescription(messages.impossible_add_role)

        await message.channel.bulkDelete(1)
        var send = await message.channel.send({
            embeds: [embed],
            components: [row]
        })

        user.roles.remove(role.id).catch(e => {
            console.log(`[Erro no comando tirarcargo]: ${e}`)
            send.edit({
                embeds: [err],
                components: [row]
            })
        })

    },
}