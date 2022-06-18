const Ticket = require('../database/Schemas/Ticket')
const  {
    MessageEmbed,
    MessageButton,
    MessageActionRow,
    Permissions
} = require('discord.js')
const emoji = require('../dados/emojis')
const messages = require('../dados/messages')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isButton()) return

        const cases = {

            open_ticket: async () => {

                const { guild, member } = interaction;
                Ticket.findOne({ idS: guild.id }, async function(err, server) {
                    
                    const tickets = guild.channels.cache.filter((c) => c.name.includes(member.user.id))
                    if (tickets.size > 0) {
                        const ticket = tickets.first();
                        await interaction.reply({
                            content: messages.ticket_oppend,
                            ephemeral: true
                        })
                        return;
                    }

                    const channel = await guild.channels.create(
                        `ticket-${member.user.id}`,
                        {
                            type: 'GUILD_TEXT',
                            parent: server.parent,
                            permissionsOverwrites: [
                                {
                                    id: client.user.id,
                                    allow: Permissions.ALL
                                },
                                {
                                    id: guild.id,
                                    deny: Permissions.ALL
                                },
                                {
                                    id: member.user.id,
                                    allow: [
                                        Permissions.FLAGS.VIEW_CHANNEL,
                                        Permissions.FLAGS.SEND_MESSAGES,
                                        Permissions.FLAGS.READ_MESSAGE_HISTORY,
                                        Permissions.FLAGS.ATTACH_FILES,
                                    ]
                                },
                                {
                                    id: server.staff,
                                    allow: [
                                        Permissions.FLAGS.VIEW_CHANNEL,
                                        Permissions.FLAGS.SEND_MESSAGES,
                                        Permissions.FLAGS.READ_MESSAGE_HISTORY,
                                        Permissions.FLAGS.ATTACH_FILES
                                    ],
                                },
                            ],
                        }
                    )

                    const embed = new MessageEmbed()
                    .setTitle(emoji.ticket_of + ` ${member.user.username}'s Ticket`)
                    .setDescription(emoji.seta + messages.ticket_message)
                    .setColor('RED')

                    const btn_fechar = new MessageButton()
                    .setCustomId('ticket_close')
                    .setStyle('SECONDARY')
                    .setLabel('Fechar Ticket')
                    .setEmoji(emoji.fechatTicket)

                    const btn_termos = new MessageButton()
                    .setCustomId('show_terms')
                    .setEmoji(emoji.termos)
                    .setStyle('SECONDARY')
                    .setLabel('Termos')

                    await channel.send({
                        content: member.user.toString(),
                        embeds: [embed],
                        components: [new MessageActionRow().addComponents([btn_fechar, btn_termos])]
                    })

                    interaction.reply({
                        content: messages.sucess_oppened_ticket + `<#${channel.id}>`,
                        ephemeral: true,
                    })

                })

            }

        };

        const handler = cases[interaction.customId];
        if (handler) await handler();
    },
}