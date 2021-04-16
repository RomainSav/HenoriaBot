const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require('../../structures/Command');

module.exports = class Add extends Command {

    constructor(bot) {
        super(bot, {
            name: 'add',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            description: 'Ajouter un membre au ticket',
            usage: 'add',
            ownerOnly: true
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        if (message.channel.parentID != settings.tickets.open) {
            return message.channel.error(settings.language, 'TICKETS/NOT_TICKET_CHANNEL').then(m => m.delete({timeout: 10000}))
        }

        let add_user = message.guild.member(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!args[0]) {
            return message.channel.error(settings.language, "EVENTS/MISSING_USER").then(m => m.delete({timeout: 10000}))
        }

        if (!add_user) {
            return message.channel.error(settings.language, "EVENTS/USER_DONT_EXISTS", args[0]).then(m => m.delete({timeout: 10000}))
        }

        await message.channel.updateOverwrite(add_user, {
            VIEW_CHANNEL: true,
            SEND_MESSAGES: true,
            ATTACH_FILES: true,
            READ_MESSAGE_HISTORY: true
        })

        await message.channel.send(
            new MessageEmbed()
                .setColor("BLUE")
                .setDescription(`<@!${add_user.user.id}> a été ajouté au ticket`)
                .setFooter(`HenoriaBot`, bot.user.displayAvatarURL({dynamic: true}))
        )
    }

}