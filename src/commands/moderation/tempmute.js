const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");
const parseDuration = require('parse-duration');
const humanizeDuration = require('humanize-duration');

module.exports = class Tempmute extends Command {

    constructor(bot) {
        super(bot, {
            name: 'tempmute',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ["MANAGE_ROLES", 'SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["DEAFEN_MEMBERS"],
            description: "Rendre un membre muet",
            usage: "tempmute [member] [time]"
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

        const duration = parseDuration(args[1]);
        if (!duration) {
            return message.channel.error(settings.language, "EVENTS/NOT_VALID_TIME")
        }

        if (muted_user.id === message.author.id) {
            return message.channel.error(settings.language, "EVENTS/CANNOT_AUTO_MUTE").then(m => m.delete({timeout: 10000}));
        }

        const reason = args.slice(2).join(" ");

        muted_user.roles.add(muted_role)
            .then((member) => {
                message.channel.send(
                    new MessageEmbed()
                        .setColor("DARK_BLUE")
                        .setAuthor(`${member.user.tag} a été mute ${humanizeDuration(duration, {language: 'fr'})}`, member.user.displayAvatarURL({dynamic: true}))
                        .setDescription(`**Raison:** ${reason}`)
                        .setTimestamp()
                )

                setTimeout(() => {
                    if (member.roles.cache.has(muted_role.id)) {
                        member.roles.remove(muted_role);
                    }
                }, duration)
            })
            .catch((err) => {
                bot.logger.error(err)
            })

    }

}