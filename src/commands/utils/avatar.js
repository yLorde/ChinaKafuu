const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { apagar, seta } = require("../../dados/emojis");

module.exports = {
    name: 'avatar',
    aliases: ["useravatar"],
    async execute(message, args) {

        let mention = message.mentions.users.first();
        let userID = message.guild.members.cache.get(args[0]);
        let self = !args[0];
        let server = args[0] === "server";
        const userRegex = new RegExp(args.join(" "), "i");

        let find = message.guild.members.cache.find(a => {
            return userRegex.test(a.nickname) ? userRegex.test(a.nickname) : a.user.username.toLowerCase() === args.join(' ').toLowerCase();
        })


        let embed = new MessageEmbed()
        embed.setColor('RED')
            .setTitle(seta + ' Avatar')
        await message.channel.bulkDelete(1)

        const button = new MessageButton()
            .setCustomId('delete')
            .setLabel('Apagar Mensagem')
            .setStyle('SECONDARY')
            .setEmoji(apagar)

        if (mention) {
            embed.setTitle(seta + ' Avatar de ' + mention.username)
            embed.setDescription(`[Avatar URL](${mention.displayAvatarURL({ size: 4096, dynamic: true })})`)
            embed.setImage(mention.displayAvatarURL({ size: 4096, dynamic: true }).replace('.webp', '.png'))
            return message.channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        } else;
        if (userID) {
            embed.setTitle(seta + ' Avatar de ' + userID.user.username)
            embed.setDescription(`[Avatar URL](${userID.user.displayAvatarURL({ size: 4096, dynamic: true })})`)
            embed.setImage(userID.user.displayAvatarURL({ size: 4096, dynamic: true }).replace('.webp', '.png'))
            return message.channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        } else;
        if (self) {
            embed.setTitle(seta + 'Seu Avatar')
            embed.setDescription(`[Avatar URL](${message.author.displayAvatarURL({ size: 4096, dynamic: true })})`)
            embed.setImage(message.author.displayAvatarURL({ size: 4096, dynamic: true }).replace('.webp', '.png'))
            return message.channel.send({
                content: message.author.toString(),
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        } else;
        if (server) {
            embed.setTitle(seta + ' Avatar Do Servidor')
            embed.setDescription(`[Avatar URL Link](${message.guild.iconURL({ size: 4096, dynamic: true })})`)
            embed.setImage(message.guild.iconURL({ size: 4096, dynamic: true }).replace('.webp', '.png'))
            return message.channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        } else;
        if (find) {
            embed.setDescription(`[Avatar URL](${find.user.displayAvatarURL({ size: 4096, dynamic: true })})`)
            embed.setImage(find.user.displayAvatarURL({ size: 4096, dynamic: true }).replace('.webp', '.png'))
            return message.channel.send({
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        } else return;

    },
}