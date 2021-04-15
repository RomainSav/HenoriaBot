const { MessageEmbed, Collection } = require('discord.js');
const Event = require('../structures/Event');

module.exports = class Message extends Event {

    async run(bot, message) {

        if (message.author.bot) return;

        // If bot was mentioned
        if (message.content === `<@${bot.user.id}>`) {
            const embed = new MessageEmbed()
            .setAuthor(bot.user.username, bot.user.displayAvatarURL({ format: 'png' }))
            .setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
            .setDescription(`Salut à toi ! Pour voir les commandes que je propose, il te suffit de faire -help`);
            return message.channel.send(embed);
        }

        // If message was a command
        const args = message.content.split(' ');
        if ([bot.config.prefix, `<@!${bot.user.id}>`].find(p => message.content.startsWith(p))) {
            const command = args.shift().slice(bot.config.prefix.length).toLowerCase();
            let cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
            if (!cmd && message.content.startsWith(`<@!${bot.user.id}>`)) {
                cmd = bot.commands.get(args[0]) || bot.commands.get(bot.aliases.get(args[0]));
                args.shift();
                if (!cmd) return;
            } else if (!cmd) {
                return;
            }

            // Make sure guild only commands are done in the guild only
            if (message.guild && cmd.guildOnly) return message.error(bot.config.language, `EVENTS/GUILD_COMMAND_ERROR`).then(m => m.delete({timeout: 5000}));

            // Make sure NSFW commands are only being run in a NSFW channel
            if ((message.channel.type != 'dm') && ((!message.channel.nsfw) && cmd.conf.nsfw)) {
                if (message.deletable) message.delete();
                return message.error(bot.config.language, 'EVENTS/NOT_NSFW_CHANNEL').then(m => m.delete({ timeout:5000 }));
            } 

            // Make sure user does not have access to ownerOnly commands
            if (cmd.conf.ownerOnly && !bot.config.ownerID.includes(message.author.id)) return message.channel.send('Nice try').then(m => m.delete({ timeout:5000 }));

            // Check bot has permissions
            if (cmd.conf.botPermissions[0] && message.guild) {
                if (!message.channel.permissionsFor(bot.user).has('SEND_MESSAGES')) return;
				if (!message.channel.permissionsFor(bot.user).has('EMBED_LINKS')) {
					return message.sendT(bot.config.language, 'MISSING_PERMISSION', 'EMBED_LINKS');
				}
            }

           // Check to see if user is in 'cooldown'
			if (!bot.cooldowns.has(cmd.help.name)) {
				bot.cooldowns.set(cmd.help.name, new Collection());
			}

            const now = Date.now();
			const timestamps = bot.cooldowns.get(cmd.help.name);
			const cooldownAmount = (cmd.conf.cooldown || 3000);

            if (timestamps.has(message.author.id)) {
				const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

				if (now < expirationTime) {
					const timeLeft = (expirationTime - now) / 1000;
					return message.error(bot.config.language, 'EVENTS/COMMAND_COOLDOWN', timeLeft.toFixed(1)).then(m => m.delete({ timeout:5000 }));
				}
			}

            // run the command
            if (bot.config.debug) bot.logger.debug(`Command: ${cmd.help.name} was ran by ${message.author.tag}${!message.guild ? '' : ` in guild: ${message.guild.id}`}.`);
            cmd.run(bot, message, args, bot.config);
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        }

    }

}