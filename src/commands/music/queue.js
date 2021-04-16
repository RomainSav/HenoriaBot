const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");

module.exports = class Queue extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'queue',
            guildOnly: true,
            dirname: __dirname,
            description: "Voir la file d'attente",
            usage: "queue"
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

        const queue = bot.player.getQueue(message);

        if (!queue) return message.channel.error(settings.language, 'MUSIC/NOT_PLAYING');

        message.channel.send(
            new MessageEmbed()
                .setColor("BLUE")
                .setTitle(`**Liste d'attente - ${settings.emojis.queue} ${queue.loopMode ? '(loop)' : ''}**`)
                .setDescription(`\nActuel : ${queue.playing.title} | ${queue.playing.author}\n` + (queue.tracks.map((track, i) => {
                    return `**${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`
                }).slice(0, 5).join("\n") + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length -5}** other songs...` : `**${queue.tracks.length}** musique(s) dans la file d'attente`}`))
        )

        /*message.channel.send(`**Liste d'attente - ${settings.emojis.queue} ${queue.loopMode ? '(loop)' : ''}**\nActuel : ${queue.playing.title} | ${queue.playing.author}\n` + (queue.tracks.map((track, i) => {
            return `**${i + 1}** - ${track.title} | ${track.author} (demandé par : ${track.requestedBy.username})`
        }).slice(0, 5).join("\n") + `\n\n${queue.tracks.length > 5 ? `And **${queue.tracks.length -5}** other songs...` : `**${queue.tracks.length}** musique(s) dans la file d'attente`}`))*/
    }
}