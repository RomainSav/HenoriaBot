const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Play extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'play',
            guildOnly: true,
            dirname: __dirname,
            description: "Jouer une musique",
            usage: "play [name|url]"
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

        if (!args[0]) return message.channel.error(settings.language, `MUSIC/EMPTY_SONG_NAME`)

        /*if (query.match(/^(https?:\/\/)?(www\.)?(m\.)?(youtube\.com|youtu\.?be)\/.+$/gi)) {
           
        }*/

        const query = args.join(" ");

        if (!query.includes("open.spotify.com")) {

            bot.player.play(message, query, { firstResult: true })

        }
    }
}