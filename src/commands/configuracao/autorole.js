const Guild = require('../../database/Schemas/Guild')
const { seta } = require('../../dados/emojis')
const { no_perm } = require('../../dados/messages')

module.exports = {
    name: 'autorole',
    async execute(message, args) {

        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.reply(seta + no_perm)
        }

        var role =
        message.mentions.roles.first() ||
        message.guild.roles.cache.get(args[0]);

        

    },
}