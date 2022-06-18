const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const fetch = require('node-fetch')
const emoji = require('../../dados/emojis')

module.exports = {
    name: 'mineserverinfo',
    async execute(message, args) {

        const ip = args[0];
        
        if (!ip) {
            return message.reply(emoji.seta + 'Você deve inserir um IP.')
        }

        await message.channel.bulkDelete(1)
        const button = new MessageButton()
        .setCustomId('delete')
        .setStyle('SECONDARY')
        .setLabel('Apagar Mensagem')
        .setEmoji(emoji.delete)

        var send = await message.channel.send({ embeds: [
            new MessageEmbed()
            .setDescription(emoji.procurando + 'procurando...')
            .setColor('RED')
        ] })

        const [host, port = 25565] = args[0].split(":")
        const server = await fetch(`
            https://mcapi.us/server/status?ip=${host}&port=${port}`).then((res) => res.json())

        if (server.online) {
            const embed = new MessageEmbed()
            .setTitle(emoji.importante + ' Informações do Servidor')
            .addField(emoji.seta + 'Status', server.online ? "Online" : Offline )
            .addField(emoji.seta + 'Players', `${server.players.now.toLocaleString()}/${server.players.max.toLocaleString()}`)
            .addField(emoji.seta + 'IP', `${host}:${port}`)
            .setImage(`http://status.mclive.eu/${ip}/${ip}/25565/banner.png`)
            .setThumbnail("attachment://ImageBanner.png")
            .setColor('RED')

            await send.edit({
                content: message.author.toString(),
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })

        } else {
            const embed = new MessageEmbed()
            .addField('Erro', 'IP inválido ou offline.')
            .addField('IP', `${host}:${port}`)
            .setColor('RED')

            await send.edit({
                content: message.author.toString(),
                embeds: [embed],
                components: [new MessageActionRow().addComponents(button)]
            })
        }

    },
}