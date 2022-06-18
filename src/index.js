const { Client, Intents, Collection } = require("discord.js");
const auth = require("./dados/auth");
const fs = require('fs');
const path = require('path');


const client = new Client({
    intents: [
        Intents.FLAGS.DIRECT_MESSAGES,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_BANS,
        Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        Intents.FLAGS.GUILD_INTEGRATIONS,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_SCHEDULED_EVENTS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_WEBHOOKS
    ]
});

client.commands = new Collection();
client.aliases = new Collection();
client.database = new Collection();

const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith('.js'))
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith('.js'))
const commandFolders = fs.readdirSync("./src/commands")

for (file of functions) {
    require(`./functions/${file}`)(client)
}
client.handleEvents(eventFiles, "./src/events")
client.handleCommands(commandFolders, "./src/commands")

require('./antiCrash.js')(process)

client.login(auth.discord_token);