const Guild = require('../database/Schemas/Guild')

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {

        var guild = member.guild;
        await Guild.findOne({ idS: guild.id}, async function (err, server) {

            if (server.autorole.role != "null") {
                var cargo = guild.roles.cache.get(role)
                guild.member.cache.get(member.id).roles.addd(cargo)
            };

        })

    },
}