const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Mute extends Command {

    constructor(bot) {
        super(bot, {
            name: 'mute',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["MANAGE_ROLES"],
            userPermissions: ["DEAFEN_MEMBERS"],
            description: "Rendre un membre muet",
            usage: "mute [member]"
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
            return message.channel.error(settings.language, "EVENTS/MISSING_USER").then(m => m.delete({timeout: 10000}))
        }

        if (!muted_user) {
            return message.channel.error(settings.language, "EVENTS/USER_DONT_EXISTS", args[0]).then(m => m.delete({timeout: 10000}))
        }

        if (muted_user.id === message.author.id) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_AUTO_MUTE")
        }

        const reason = args.slice(1).join(" ");

        await muted_user.roles.add(muted_role)
            .then((member) => {
                return message.channel.success(settings.language, "MODERATION/SUCCESS_MUTE", member.user.username)
            })
            .catch((err) => {
                bot.logger.error(err)
            })



    }

}