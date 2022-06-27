const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");
const { seta, apagar } = require("../../dados/emojis");
const { no_name, no_perm } = require("../../dados/messages");

module.exports = {
    name: 'editchannel',
    aliases: ["renomearcanal"],
    async execute(message, args) {

        if (!message.member.permissions.has) {
            return message.reply(seta + no_perm)
        }

        var newName = args.slice(1).join(' ');
        var channel = 
        message.mentions.channels.first() ||
        message.guild.channels.cache.get(args[0]);

        if (!channel) {
            channel = message.channel
            newName = args.slice(0).join(' ')
        }

        if (!newName) return message.reply(emoji.seta + no_name)
        
        await channel.setName(newName)

        await message.channel.bulkDelete(1)

        const embed = new MessageEmbed()
        .setTitle('Editar Canal')
        .setDescription('Canal renomeado com sucesso.')

        const button = new MessageButton()
        .setCustomId('delete')
        .setLabel('Apagar Mensagem')
        .setEmoji(apagar)
        .setStyle('SECONDARY')

        await message.channel.send({
            content: message.author.toString(),
            embeds: [embed],
            components: [new MessageActionRow().addComponents(button)]
        })
    },
}