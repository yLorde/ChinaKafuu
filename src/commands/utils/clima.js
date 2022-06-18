const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const weather = require('weather-js')
const emoji = require('../../dados/emojis')

module.exports = {
    name: 'clima',
    async execute(message, args) {

        weather.find({
            search: args,
            degreeType: 'C'
        }, async function (err, result) {
            message.channel.bulkDelete(1)
            if (err) console.log(err);
            if (!result) {
                let erro = new MessageEmbed()
                .setDescription('Forneça uma cidade.')
                message.channel.send({ embeds: [erro] })
                return
            }
            if (!result[0]) {
                let erro = new MessageEmbed()
                .setDescription('Essa cidade não existe.')
                message.channel.send({ embeds: [erro] })
                return
            }
    
            let user = message.author
            //const img = 'https://1.bp.blogspot.com/-GhzQ1I1l3h0/T9tBeNCbWFI/AAAAAAAAAI0/OrOAoocHe4I/s1600/mundo-noite.jpg'
    
            const embed = new MessageEmbed()
            embed.setTitle(`${emoji.verificado} Clima temporal de: ${result[0].location.name}`)
            embed.addField(`${emoji.seta} Temperatura`, `${result[0].current.temperature}°C`)
            embed.addField(`${emoji.seta} Sensação Térmica`, `${result[0].current.feelslike}°C`)
            embed.addField(`${emoji.seta} Umidade`, `${result[0].current.humidity}%`)
            embed.addField(`${emoji.seta} Ventos`, `${result[0].current.windspeed}`)
            embed.setColor('RED')

            await message.channel.send({
                content: message.author.toString(),
                embeds: [embed],
            })
        });

    },
}