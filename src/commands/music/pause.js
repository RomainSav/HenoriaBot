const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Ban extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'pause',
            guildOnly: true,
            dirname: __dirname,
            description: "Mettre une musique sur pause",
            usage: "pause"
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        if (!message.member.voice.channel) {
            return message.channel.error(settings.language, "MUSIC/NOT_IN_VOICE_CHANNEL")
        }

        if (message.guild.me.voice.channel && message.member.voice.channel.id != message.guild.me.voice.channel.id) {
            return message.channel.error(settings.language, "MUSIC/NOT_IN_SAME_CHANNEL")
        }

        if (!bot.player.getQueue(message)) {
            return message.channel.error(settings.language, "MUSIC/NOT_PLAYING");
        }

        if (bot.player.getQueue(message).paused) {
            return message.channel.error(settings.language, "MUSIC/ALREADY_PAUSED");
        }

        const success = bot.player.pause(message);

        if (success) {
            return message.channel.info(settings.language, "MUSIC/SUCCESS_PAUSED", bot.player.getQueue(message).playing.title)
        }
    }
}