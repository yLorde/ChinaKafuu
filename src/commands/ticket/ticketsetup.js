const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const emoji = require('../../dados/emojis')
var Ticket = require('../../database/Schemas/Ticket')
const messages = require('../../dados/messages')

module.exports = {
    name: 'ticketsetup',
    aliases: ["ts"],
    async execute(message, args) {

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply(emoji.seta + messages.no_perm)
        };

        Ticket.findOne({ idS: message.guild.id }, async function (err, server) {

        var staffRole = 
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);

        var categoria = args[1] || message.channel.parent.id;

        await Ticket.findOneAndUpdate(
            { idS: message.guild.id },
            {
                $set: {
                    channel: message.channel.id,
                    staff: staffRole.id,
                    parent: categoria
                }
            }
        )

        if (!staffRole) return message.reply(emoji.seta + messages.select_role)

        const embed = new MessageEmbed()
        .setTitle(`Ticket - ${message.guild.name}`)
        .setDescription(`Clique abaixo para concordar com os termos e abrir um ticket!`)
        .setColor('RED')

        const btn_ticket = new MessageButton()
        .setCustomId('view_terms')
        .setStyle('SECONDARY')
        .setLabel('Ver Termos')
        .setEmoji(emoji.aceitarTermos)

        const embedSucess = new MessageEmbed()
        .setTitle('Ticket Criado com sucesso!')
        .setColor('RED')
        .setDescription(`Cargo staff selecionado: ${staffRole}\nCategoria selecionada: **<#${categoria}>**
\nEle irá criar os canais de ticket nessa categoria, caso queira mudar faça o ticket na categoria desejada, ou coloque o id da categoria no final do comando.`)

        const delBtn = new MessageButton()
        .setCustomId('delete')
        .setEmoji(emoji.delete)
        .setLabel('Apagar Mensagem')
        .setStyle('SECONDARY')

        var row = new MessageActionRow()
        row.addComponents([btn_ticket])

        await message.channel.bulkDelete(1)
        await message.channel.send({
            embeds: [embed],
            components: [row]
        })
        await message.channel.send({
            embeds: [embedSucess],
            components: [new MessageActionRow().addComponents([delBtn])]
        })

        })

    },
}