const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js')
const Guild = require('../database/Schemas/Guild')
const User = require('../database/Schemas/User')
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
                    ephemeral: true,
                })
                return;
            },
            Site: async () => {
                interaction.reply({
                    content: `Ainda não tenho um site :(`,
                    ephemeral: true,
                })
                return;
            },
            xp_money: async () => {
                const { guild } = interaction;
                User.findOne({ idS: guild.id }, async function (err, user) {
                    const embed = new MessageEmbed()
                    .setTitle('Money & XP')
                    .setDescription(`Seu Dinheiro total: ${user.coins + user.bank}\nSeu XP atual: ${user.Exp.xp}\nSeu nível: ${user.Exp.level}`)

                    interaction.reply({
                        embeds: [embed],
                        ephemeral: true
                    })
                });
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
                    ephemeral: true
                })
            }
        };


        const handler = cases[interaction.customId];
        if (handler) await handler();

    },
}