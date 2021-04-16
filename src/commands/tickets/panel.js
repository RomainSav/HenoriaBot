const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require('../../structures/Command');

module.exports = class Panel extends Command {

    constructor(bot) {
        super(bot, {
            name: 'panel',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            description: 'Envoyer le panel pour ouvrir un ticket',
            usage: 'panel',
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

        message.channel.send(
            new MessageEmbed()
                .setTitle(`Ouvrir un ticket ${settings.emojis.ticket}`)
                .setDescription(`Vous pouvez ouvrir un ticket de support en réagissant ${settings.emojis.ticket}`)
                .setFooter(`HenoriaBot`, bot.user.displayAvatarURL({dynamic: true}))
                .setColor("BLUE")
        ).then((msg) => {
            msg.react(`${settings.emojis.ticket}`)
        })

    }

}