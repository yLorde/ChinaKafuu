const Guild = require('../database/Schemas/Guild')
const Ticket = require('../database/Schemas/Ticket')
const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const emojis = require('../dados/emojis')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isButton()) return;

        const cases = {

            view_terms: async () => {
                var { guild } = interaction;

                Ticket.findOne({ idS: guild.id }, async function (err, server) {

                    if (server.termos === "desconfigurado") {

                        Guild.findOne({ idS: guild.id}, async function (err, server) {

                            interaction.reply({
                                content: `configure os termos usando: ${server.prefix}ticketterms`,
                                ephemeral: true
                            })
        
                        })

                    } else {

                        interaction.reply({
                            embeds: [
                                new MessageEmbed()
                                .setTitle('Termos')
                                .setColor('RED')
                                .setDescription(`**${server.termos}**` + '\n\n Caso não aceite basta clicar em "ignorar essa mensagem"')
                            ],

                            components: [new MessageActionRow().addComponents([
                                new MessageButton()
                                .setCustomId('open_ticket')
                                .setLabel('Eu Aceito, abrir ticket')
                                .setStyle('SECONDARY')
                                .setEmoji(emojis.termos)
                            ])],   
                            ephemeral: true,
                        })

                    }

                });

            }

        };

        const handler = cases[interaction.customId];
        if (handler) await handler();

    },
}