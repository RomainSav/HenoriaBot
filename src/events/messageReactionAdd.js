const { MessageEmbed, Collection, Message, MessageReaction, User } = require('discord.js');
const Henoria = require('../base/Henoria');
const Event = require('../structures/Event');
const fs = require('fs');
const path = require('path');

module.exports = class Message extends Event {

    /**
     * 
     * @param {Henoria} bot 
     * @param {MessageReaction} messageReaction 
     * @param {User} user 
     */
    async run(bot, messageReaction, user) {

        if (user.bot) return;

        // if is panel ticket channel
        if (messageReaction.message.channel.parentID === bot.config.tickets.panel) {

            messageReaction.users.remove(user.id);

            const open_ticket_channel = messageReaction.message.guild.channels.cache.find(ch => ch.id === bot.config.tickets.open);
            const support_role = messageReaction.message.guild.roles.cache.get(bot.config.tickets.support_role);

            let ticket_name;

            const counter = bot.db.tickets.number;

            if (counter < 10) {
                ticket_name = `000${counter}`
            } else if (counter < 100) {
                ticket_name = `00${counter}`
            } else if (counter < 1000) {
                ticket_name = `0${counter}`
            } else {
                ticket_name = `${counter}`
            }

            await messageReaction.message.guild.channels.create(`ticket-${ticket_name}`, {
                type: "text",
                topic: `${user.tag}`,
                parent: open_ticket_channel,
                permissionOverwrites: [
                    {
                        id: messageReaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                    },
                    {
                        id: user,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY"]
                    },
                    {
                        id: support_role,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "READ_MESSAGE_HISTORY"]
                    }
                ],
                reason: "Nouveau ticket de support"
            }).then((channel) => {

                channel.send(
                    new MessageEmbed()
                        .setColor("BLUE")
                        .setDescription('\nLe support vous repondra dans un délais de 24h :clock8:\nPour fermer le ticket: `+close`\n')
                        .setFooter(`HenoriaBot`, bot.user.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
                )

            })

            bot.db.tickets.number = counter + 1;
            
            fs.writeFile(path.join(__dirname, '..', 'utils', 'database.json'), JSON.stringify(bot.db, null, 4), (err) => {
                if (err) bot.logger.error(err);
            });
        }
    }
}