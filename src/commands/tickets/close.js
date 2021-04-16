const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require('../../structures/Command');

module.exports = class Close extends Command {

    constructor(bot) {
        super(bot, {
            name: 'close',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            description: 'Fermer le ticket',
            usage: 'close',
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

        message.channel.send(
            new MessageEmbed()
                .setColor("YELLOW")
                .setDescription(`\nLe ticket a été fermé par <@!${message.author.id}>`)
        ).then(msg => {
                msg.channel.setName(`close-${msg.channel.name.split("-")[1]}`)
                msg.channel.members.map(user => {
            })
        })

        message.channel.send(
            new MessageEmbed()
                .setColor("RED")
                .setDescription(`Le ticket va être supprimé dans 5 secondes`)
        ).then(msg => {
            setTimeout(() => {
                msg.channel.delete();
            }, 5000)
        })
    }

}