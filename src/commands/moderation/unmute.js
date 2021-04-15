const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Unmute extends Command {

    constructor(bot) {
        super(bot, {
            name: 'unmute',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["MANAGE_ROLES", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["DEAFEN_MEMBERS"],
            description: "Enlever le role muet à un membre",
            usage: "unmute [member]"
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        const muted_role = message.guild.roles.cache.find(r => r.name === "Mute");

        if(!message.channel.permissionsFor(message.author).has("DEAFEN_MEMBERS")) {
            return message.channel.error(settings.language, 'USER_PERMISSION', 'MANAGE_MESSAGES').then(m => m.delete({ timeout: 10000 }))
        }
        
        if (!message.channel.permissionsFor(bot.user).has("MANAGE_ROLES")){
            bot.logger.error(`Missing permission: \`MANAGE_ROLES\` in [${message.guild.id}].`);
            return message.channel.error(settings.language, 'MISSING_PERMISSION', 'MANAGE_ROLES').then(m => m.delete({ timeout: 10000 }));
        }

        const muted_user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.error(settings.language, "EVENTS/MISSING_USER").then(m => m.delete({timeout: 10000}));
        }

        if (!muted_user) {
            return message.channel.error(settings.language, "EVENTS/USER_DONT_EXISTS", args[0]).then(m => m.delete({timeout: 10000}));
        }

        if (muted_user.id === message.author.id) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_AUTO_UNMUTE").then(m => m.delete({timeout: 10000}));
        }

        if (!muted_user.roles.cache.has(muted_role.id)) {
            return message.channel.error(settings.language, "EVENTS/DONT_HAVE_MUTE_ROLE", muted_user.user.username).then(m => m.delete({timeout: 10000}));
        }

        await muted_user.roles.remove(muted_role)
            .then(member => {
                return message.channel.success(settings.language, "MODERATION/SUCCESS_UNMUTE", member.user.username)
            })

    }

}