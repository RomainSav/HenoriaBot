const { Message, MessageEmbed } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require("../../structures/Command");
const { cmd } = require('../../utils/logger');

module.exports = class Help extends Command {
    
    constructor(bot) {
        super(bot, {
            name: 'help',
            guildOnly: true,
            dirname: __dirname,
            description: "Voir les commandes disponibles",
            usage: "help"
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        await message.channel.send({
            embed: {
                color: "BLUE",
                title: "Liste des commandes de HenoriaBot",
                fields: [
                    {
                        name: '🔔 Info',
                        value: '`help`',
                    },
                    {
                        name: '🎶 Musique',
                        value: '`play`, `pause`, `resume`, `stop`, `queue`, `shuffle`, `skip`'
                    },
                    {
                        name: `📩 Support`,
                        value: '`add`, `close`'
                    },
                    {
                        name: '🛠️ Modération',
                        value: '`ban`, `tempban`, `unban`, `mute`, `tempmute`, `unmute`, `clear`',
                    },
                    {
                        name: '🚨 Admin',
                        value: '`lock`, `unlock`',
                    },

                ]
            }
        })

    }
}