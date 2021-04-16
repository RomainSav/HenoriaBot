const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Stop extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'stop',
            guildOnly: true,
            dirname: __dirname,
            description: "Arrêter la musique",
            usage: "stop"
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

        if (!bot.player.getQueue(message)) return message.channel.error(settings.language, 'MUSIC/NOT_PLAYING');

        bot.player.setRepeatMode(message, false);
        const success = bot.player.stop(message);
        
        if (success) return message.channel.info(settings.language, "MUSIC/SUCCESS_STOPPED")
    }
}