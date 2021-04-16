const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');

module.exports = class Tempban extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'tempban',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["BAN_MEMBERS", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["BAN_MEMBERS"],
            description: "Bannir un membre temporairement",
            usage: "tempban [member]"
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

        const duration = parseDuration(args[1]);
        if (!duration) {
            return message.channel.error(settings.language, "EVENTS/NOT_VALID_TIME")
        }
        
        if (banned_user.id === message.author.id) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_AUTO_BAN").then(m => m.delete({timeout: 10000}));
        }

        if (!banned_user.bannable) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_BAN", banned_user.user.username).then(m => m.delete({timeout: 10000}));
        }

        const reason = args.slice(2).join(" ");

        banned_user.ban({reason: reason})
            .then(member => {
                message.channel.send(
                    new MessageEmbed()
                        .setColor("DARK_BLUE")
                        .setAuthor(`${member.user.tag} a été banni ${humanizeDuration(duration, {language: 'fr'})}`, member.user.displayAvatarURL({dynamic: true}))
                        .setDescription(`**Raison:** ${reason}`)
                        .setTimestamp()
                )

                setTimeout(() => {

                    message.guild.fetchBans().then(banList => {
                        const user = banList.get(member.id).user;
                        if (user) {
                            message.guild.members.unban(member);
                        }
                    })
                }, duration)
            })
    }
}