const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js')
const emoji = require('../../dados/emojis')
const messages = require('../../dados/messages')

module.exports = {
    name: 'criarcargo',
    async execute(message, args) {

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply(emoji.seta + messages.no_perm)
        };

        var cor = args[0];
        var roleName = args.slice(1).join(' ')

        if (!roleName) return message.reply(emoji.seta + messages.no_name);
        if (!cor.startsWith('#')) {
            return message.reply(emoji.seta + messages.format_color);
        };
        if (cor.length < 2) {
            return message.reply(emoji.seta + messages.invalid_color)
        };
        
        var guild = message.guild;
        await message.channel.bulkDelete(1);

        guild.roles.create({
            name: roleName,
            color: cor,
            mentionable: false,
        }).then(role => {

            var embed = new MessageEmbed()
                .setTitle(emoji.staff + ' Criador de Cargos')
                .setDescription(`${emoji.seta} cargo criado: ${role}`)
                .setColor('RED')

            const button = new MessageButton()
                .setCustomId('delete')
                .setStyle('SECONDARY')
                .setLabel('Apagar Mensagem')
                .setEmoji(emoji.delete)

            message.channel.send({
                content: message.author.toString(),
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        })

    },
}