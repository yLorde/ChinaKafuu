const { MessageEmbed } = require('discord.js');
const { alma } = require('../../dados/emojis');
const User = require('../../database/Schemas/User')

module.exports = {
    name: 'money',
    aliases: ["bal", "balance", "eco"],
    async execute(message, args) {

        await User.findOne({ idS: message.guild.id }, async function (err, user) {
            
            var coins = user.coins;
            var bank = user.bank;

            const embed = new MessageEmbed()
            .setTitle('Cemitério')
            .addField(alma + 'Alma', `${coins}`, true)

            await message.reply({
                embeds: [embed]
            })

        });

    },
}