const { MessageEmbed, MessageButton, MessageActionRow, MessageSelectMenu } = require("discord.js")
const { emoji, desc } = require('../../dados/help')
const messages = require('../../dados/messages')
const images = require('../../dados/images')
const emj = require('../../dados/emojis')

module.exports = {
    name: 'help',
    aliases: ["ajuda", "comandos", "commands", "?", "cmd"],
    async execute(message) {


        var embed_principal = new MessageEmbed()
            .setColor('RED')
            .setTitle(emoji.title + ` Meus comandos `)
            .setDescription(messages.embed_principal_help)
            .setImage(images.banner)

        var painel = new MessageActionRow().addComponents([
            new MessageSelectMenu()
                .setCustomId('menu')
                .setPlaceholder('Selecione a categoria')
                .addOptions([
                    {
                        label: 'Admin',
                        description: desc.admin,
                        emoji: emoji.admin,
                        value: 'admin'
                    },
                    {
                        label: 'Configurações',
                        description: desc.configurações,
                        emoji: emoji.configurações,
                        value: 'config'
                    },
                    {
                        label: 'Economia',
                        description: desc.economia,
                        emoji: emoji.economia,
                        value: 'economia'
                    },
                    {
                        label: 'Gadjets',
                        description: desc.gadjets,
                        emoji: emoji.gadjets,
                        value: 'gadj'
                    },
                    {
                        label: 'Joguinhos',
                        description: desc.joguinhos,
                        emoji: emoji.joguinhos,
                        value: 'joguinhos'
                    },
                    {
                        label: 'Minecraft',
                        description: desc.minecraft,
                        emoji: emoji.minecraft,
                        value: 'minecraft'
                    },
                    {
                        label: 'Moderação',
                        description: desc.moderação,
                        emoji: emoji.moderação,
                        value: 'mod'
                    },
                    {
                        label: 'Outros',
                        description: desc.outros,
                        emoji: emoji.outros,
                        value: 'outros'
                    },
                    {
                        label: 'Utilidades',
                        description: desc.utilidades,
                        emoji: emoji.utilidades,
                        value: 'utils'
                    },
                    {
                        label: 'Menu Inicial',
                        description: 'Volta do menu inicial.',
                        emoji: '🏠',
                        value: 'home',
                    },
                ])
            ])

        await message.channel.bulkDelete(1)
        message.channel.send({
            content: message.author.toString(),
            embeds: [embed_principal],
            components: [painel]
        }).then(msg => {

            const filtro = (interaction) => interaction.isSelectMenu()
            const collector = msg.createMessageComponentCollector({
                filtro
            })

            collector.on('collect', async (collected) => {
                let valor = collected.values[0]
                collected.deferUpdate()

                if (valor === 'admin') {
                    var embed_admin = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Admin')
                    .setColor('RED')
                    .setDescription(`
**createrole/criarcargo** [COR] [NOME]\nPermissão: \`Administrador\`
`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_admin],
                        components: [painel]
                    })
                }

                if (valor === 'config') {
                    var embed_config = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Configurações')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_config],
                        components: [painel]
                    })
                }

                if (valor === 'economia') {
                    var embed_economia = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Economia')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_economia],
                        components: [painel]
                    })
                }

                if (valor === 'gadj') {
                    var embed_gadj = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Gadjets')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_gadj],
                        components: [painel]
                    })
                }

                if (valor === 'joguinhos') {
                    var embed_joguinhos = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Joguinhos')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_joguinhos],
                        components: [painel]
                    })
                }

                if (valor === 'minecraft') {
                    var embed_minecraft = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Minecraft')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_minecraft],
                        components: [painel]
                    })
                }

                if (valor === 'mod') {
                    var embed_mod = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Moderação')
                    .setColor('RED')
                    .setDescription(`
**addrole/darcargo** [membro] [cargo] \nPermissão: \`Gerenciar Cargos\`\n
**removerole/tirarcargo** [membro] [cargo]\nPermissão: \`Gerenciar Cargos\`\n
**editchannel/renomearcanal** [canal] [novo nome]\nPermissão: \`Gerenciar Canais\`\n
**limpar/clear** [quantidade]\nPermissão: \`Gerenciar Mensagens\`\n
`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_mod],
                        components: [painel]
                    })
                }

                if (valor === 'outros') {
                    var embed_outros = new MessageEmbed()
                    .setTitle(emoji.title + ' Outros Comandos')
                    .setColor('RED')
                    .setDescription(`Sem comandos registrados.`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_outros],
                        components: [painel]
                    })
                }

                if (valor === 'utils') {
                    var embed_utils = new MessageEmbed()
                    .setTitle(emoji.title + ' Comandos De Utilidades')
                    .setColor('RED')
                    .setDescription(`
**avatar** [membro/server] \nPermissão: \`Nenhuma\`\n
**clima/weather** [cidade & país]\nPermissão: \`Nenhuma\`\n
**guildinfo/serverinfo**\nPermissão: \`Nenhuma\`\n
**userinfo/whois** [membro]\nPermissão: \`Nenhuma\`\n
`)

                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_utils],
                        components: [painel]
                    })
                }

                if (valor === 'home') {
                    msg.edit({
                        content: message.author.toString(),
                        embeds: [embed_principal],
                        components: [painel]
                    })
                }

            })

        })


    },
}