const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Say extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'say',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["ADMINISTRATOR"],
            description: "Faire des annonces",
            usage: "say"
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        if (!message.channel.permissionsFor(message.author).has("ADMINISTRATOR")) {
            return message.channel.error(settings.language, 'USER_PERMISSION', 'ADMINISTRATOR').then(m => m.delete({ timeout: 10000 })).then(m => m.delete({timeout: 10000}))
        }

        if (!args[0]) {
            return message.channel.error(settings.language, 'EVENTS/MISSING_CHANNEL').then(m => m.delete({timeout: 10000}))
        }

        let channel = message.guild.channels.cache.get(args[0].replace('<#', '').replace('>',  ''));

        if (!channel) {
            return message.channel.error(settings.language, "EVENTS/CHANNEL_DONT_EXISTS").then(m => m.delete({timeout: 10000}))
        }

        await channel.send(args.slice(1).join(" "));
    }
}