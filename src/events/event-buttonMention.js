const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const emb = require('../dados/embeds')
const emoji = require('../dados/emojis')
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {

        if (!interaction.isButton()) return;

        const cases = {
            Discord: async () => {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emb.discord.title)
                        .setDescription(emb.discord.description)
                        .setColor(emb.discord.color)
                        .setImage(emb.about.banner)
                    ],
                    components: [ new MessageActionRow().addComponents(
                        new MessageButton()
                        .setStyle('LINK')
                        .setURL('https://discord.gg/8P9fb2UBj3')
                        .setLabel(`Clique Aqui para ir ao meu purgatório!`)
                        .setEmoji(`<:china_discord:987392823768805387>`)
                    ) ],
                    ephemeral: false,
                })
                return;
            },
            Site: async () => {
                interaction.reply({
                    content: `Ainda não tenho um site :(`,
                    ephemeral: false,
                })
                return;
            },
            Prefix: async () => {
                interaction.reply({
                    content: `Meu prefix nesse servidor é: `,
                    ephemeral: false,
                })
            },
            About: async () => {
                interaction.reply({
                    embeds: [
                        new MessageEmbed()
                        .setTitle(emb.about.title)
                        .setDescription(emb.about.description)
                        .setColor(emb.about.color)
                        .setImage(emb.about.banner)
                    ],
                    components: [
                        new MessageActionRow().addComponents([
                            new MessageButton()
                            .setCustomId('delete')
                            .setLabel('Apagar Mensagem')
                            .setStyle('SECONDARY')
                            .setEmoji(emoji.delete)
                        ])
                    ]
                })
            }
        };


        const handler = cases[interaction.customId];
        if (handler) await handler();

    },
}