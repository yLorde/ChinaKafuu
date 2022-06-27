const User = require('../database/Schemas/User');
const Guild = require('../database/Schemas/Guild');
const { level_up } = require('../dados/messages');
const { seta } = require('../dados/emojis')

module.exports = {
    name: 'messageCreate',
    async execute(message) {

            User.findOne({ idS: message.guild.id }, async function (err, user) {

            if (message.author.bot) return;
            if (!message.guild) return;

            if (!user) {
                return message.reply(seta + ' Estou te adicionando no banco de dados...');
            }

            let xp = user.Exp.xp;
            let level = user.Exp.level;
            let nextLevel = user.Exp.nextLevel * level;
            
            var xpGive = Math.floor(Math.random() * 10) + 1;
            
            await User.findOneAndUpdate(
                { 
                    idU: message.author.id, 
                    idS: message.guild.id,
                },
                {
                    $set: {
                        "Exp.xp": xp + xpGive,
                    }
                }
            );

            if (user.Exp.xp >= nextLevel) {

                await User.findOneAndUpdate(
                    { 
                        idU: message.author.id, 
                        idS: message.guild.id,
                    },
                    { 
                        $set: { 
                            "Exp.xp": 0, 
                            "Exp.level": level + 1 
                        },
                    },
                )

                Guild.findOne({ idS: message.guild.id }, async function (err, server) {

                    if (server.levelUp.channel != "null") {
                        client.channels.cache.get(server.levelUp.channel).send({
                            content: seta + `<@${message.author.id}>` + level_up + `${level+1}`
                        })
                        return;
                    } else {
                        message.reply({
                            content: seta + `<@${message.author.id}>` + level_up + `${level+1}`
                        })
                    }

                })

            };
        });
    },
}