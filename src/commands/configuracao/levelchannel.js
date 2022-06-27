const { seta, apagar } = require('../../dados/emojis')
const { no_perm } = require('../../dados/messages')
const Guild = require('../../database/Schemas/Guild')
const {
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require('discord.js')
const { relativeTimeRounding } = require('moment')

module.exports = {
    name: 'levelchannel',
    aliases: ["lc"],
    async execute(message, args) {

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply(seta + no_perm)
        };

        var channel =
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]) ||
        message.channel;

        const Embed = new MessageEmbed()
        .setTitle('Canal de LevelUp')
        .setColor('RED')
        .setDescription(`<#${channel.id}> Foi definido como canal para avisos de Level Up`)
        
        const btn = new MessageButton()
        .setCustomId('delete')
        .setEmoji(apagar)
        .setStyle('SECONDARY')
        .setLabel('Apagar Mensagem')

        await message.reply({
            embeds: [Embed],
            components: [new MessageActionRow().addComponents([btn])]
        })

        await Guild.findOneAndUpdate(
            { idS: message.guild.id },
            {
                $set: {
                    "levelUp.channel": channel.id
                }
            }
        )
        
        if (args[0] === "remove") {
            await Guild.findOneAndUpdate(
                { idS: message.guild.id },
                {
                    $set: {
                        "levelUp.channel": "null"
                    }
                }
            )

            const Embed = new MessageEmbed()
            .setTitle('Canal de LevelUp')
            .setColor('RED')
            .setDescription(`Foi removido o canal de level Up`)
            
            const btn = new MessageButton()
            .setCustomId('delete')
            .setEmoji(apagar)
            .setStyle('SECONDARY')
            .setLabel('Apagar Mensagem')
    
            await message.reply({
                embeds: [Embed],
                components: [new MessageActionRow().addComponents([btn])]
            })

            return;
        };

    },
}