const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Lock extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'lock',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["MANAGE_CHANNELS", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["ADMINISTRATOR"],
            description: "Verouiller un salon",
            usage: "lock"
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
            return message.channel.error(settings.language, 'USER_PERMISSION', 'ADMINISTRATOR').then(m => m.delete({ timeout: 10000 }))
        }

        if (!message.channel.permissionsFor(bot.user).has("MANAGE_CHANNELS")){
            bot.logger.error(`Missing permission: \`MANAGE_CHANNELS\` in [${message.guild.id}].`);
            return message.channel.error(settings.language, 'MISSING_PERMISSION', 'MANAGE_CHANNELS').then(m => m.delete({ timeout: 10000 }));
        }

        message.channel.updateOverwrite(message.guild.roles.everyone, {
            SEND_MESSAGES: false
        }).then(() => {
            message.channel.info(settings.language, `ADMIN/CHANNEL_LOCK`);
        })
    }
}