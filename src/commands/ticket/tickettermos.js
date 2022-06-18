const Ticket = require('../../database/Schemas/Ticket')
const emoji = require('../../dados/emojis')
const messages = require('../../dados/messages')
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')

module.exports = {
    name: 'ticketterms',
    aliases: ["tt"],
    async execute(message, args) {

        if (!message.member.permissions.has('ADMINISTRADOR')) {
            return message.reply(emoji.seta + messages.no_perm)
        };

        Ticket.findOne({ idS: message.guild.id }, async function (err, server) {

            var terms = args.slice(0).join(' ');
            if (!terms) return message.reply(emoji.seta + messages.no_terms)

            await Ticket.findOneAndUpdate(
                { idS: message.guild.id },
                { 
                    $set: {
                        termos: terms
                    }
                },
            )

            await message.channel.bulkDelete(1)
            var embed = new MessageEmbed()
            .setTitle('Termos Atualizados')
            .setDescription(`Novos termos: ${terms}`)
            .setColor('RED')

            var del_btn = new MessageButton()
            .setCustomId('delete')
            .setEmoji(emoji.delete)
            .setStyle('SECONDARY')
            .setLabel('Apagar Mensagem')
        
            var row = new MessageActionRow()
            row.addComponents([del_btn])

            await message.channel.send({
                embeds: [embed],
                components: [row]
            })

        })

    },
}