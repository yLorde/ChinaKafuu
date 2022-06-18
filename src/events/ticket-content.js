const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const emoji = require('../dados/emojis')
const messages = require('../dados/messages')
const Ticket = require('../database/Schemas/Ticket')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        if (!interaction.isButton()) return;

        const cases = {

            ticket_close: async () => {
                const { user } = interaction;

                interaction.reply({
                    content: user.toString(),
                    embeds: [
                        new MessageEmbed()
                        .setColor('RED')
                        .setDescription(messages.ticket_close_confirm)
                    ],
                    components: [new MessageActionRow().addComponents([
                        new MessageButton()
                        .setCustomId('close_ticket_confirm')
                        .setStyle('SUCCESS')
                        .setLabel('CONFIRMAR'),

                        new MessageButton()
                        .setCustomId('delete')
                        .setStyle('DANGER')
                        .setLabel('CANCELAR')
                    ])], 
                })

            },
            close_ticket_confirm: async () => {
                interaction.channel.delete().catch(() => { })
            },
            show_terms: async () => {
                const { user, guild } = interaction;
                Ticket.findOne({ idS: guild.id }, async function (err, server) {
                    interaction.reply({
                        content: user.toString(),
                        embeds: [
                            new MessageEmbed()
                            .setTitle(emoji.termos + ' Termos')
                            .setDescription(server.termos)
                            .setColor('RED')
                        ],
                        components: [new MessageActionRow().addComponents([
                            new MessageButton()
                            .setCustomId('delete')
                            .setStyle('SECONDARY')
                            .setLabel('Apagar Mensagen')
                            .setEmoji(emoji.delete)
                        ])]
                    })
                })
            }

        };

        const handler = cases[interaction.customId];
        if (handler) await handler();

    },
}