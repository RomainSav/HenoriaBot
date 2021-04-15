const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Ban extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'ban',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["BAN_MEMBERS", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["BAN_MEMBERS"],
            description: "Bannir un membre",
            usage: "ban [member]"
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

        const banned_user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.error(settings.language, "EVENTS/MISSING_USER").then(m => m.delete({timeout: 10000}))
        }

        if (!banned_user) {
            return message.channel.error(settings.language, "EVENTS/USER_DONT_EXISTS", args[0]).then(m => m.delete({timeout: 10000}))
        }
        
        if (banned_user.id === message.author.id) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_AUTO_BAN").then(m => m.delete({timeout: 10000}));
        }

        if (!banned_user.bannable) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_BAN", banned_user.user.username).then(m => m.delete({timeout: 10000}));
        }

        const reason = args.slice(1).join(" ");

        await banned_user.ban({reason: reason})
            .then(member => {
                return message.channel.success(settings.language, "MODERATION/SUCCESS_BAN", member.user.username).then(m => m.delete({timeout: 10000}));
            })
    }
}