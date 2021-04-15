const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Ban extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'unban',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["BAN_MEMBERS", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["BAN_MEMBERS"],
            description: "Débannir un membre",
            usage: "unban [member]"
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        if(!message.channel.permissionsFor(message.author).has("BAN_MEMBERS")) {
            return message.channel.error(settings.language, 'USER_PERMISSION', 'BAN_MEMBERS').then(m => m.delete({ timeout: 10000 }))
        }

        if (!message.channel.permissionsFor(bot.user).has("BAN_MEMBERS")){
            bot.logger.error(`Missing permission: \`BAN_MEMBERS\` in [${message.guild.id}].`);
            return message.channel.error(settings.language, 'MISSING_PERMISSION', 'BAN_MEMBERS').then(m => m.delete({ timeout: 10000 }));
        }

        if (!args[0]) {
            return message.channel.error(settings.language, "EVENTS/MISSING_USER").then(m => m.delete({timeout: 10000}))
        }

        let userID = args[0].replace('<@!', '').replace('>', '').replace('<@', '');
        const member = await bot.users.fetch(userID);

        const reason = args.slice(1).join(" ");

        message.guild.fetchBans().then(bans => {
            
            let banned_user = bans.find(u => u.id === userID);

            if (banned_user === null) {
                return message.channel.error(settings.language, "EVENTS/USER_NOT_BAN", toUnBan.user.username).then(m => m.delete({timeout: 10000}));
            }

            message.guild.members.unban(member, reason)
                .then(user => {
                    return message.channel.success(settings.language, "MODERATION/SUCCESS_UNBAN", user.username).then(m => m.delete({timeout: 10000}));
                })

        })
    }
}