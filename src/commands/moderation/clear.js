const { Message } = require('discord.js');
const Henoria = require('../../base/Henoria');
const Config = require('../../../resources/config.json');
const Command = require('../../structures/Command');

module.exports = class Clear extends Command {

    constructor(bot) {
        super(bot, {
            name: 'clear',
            guildOnly: true,
            dirname: __dirname,
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'MANAGE_MESSAGES'],
            userPermissions: ["MANAGE_MESSAGES"],
            cooldown: 5000,
            description: 'Supprimer des messages dans un salon',
            usage: 'clear [amount]'
        })
    }

    /**
     * @param {Henoria} bot 
     * @param {Message} message 
     * @param {*} args 
     * @param {Config} settings 
     */
    async run(bot, message, args, settings) {

        if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) return message.channel.error(settings.language, 'USER_PERMISSION', 'MANAGE_MESSAGES').then(m => m.delete({ timeout: 10000 }));

        // Make sure bot can delete other peoples messages
        if (!message.channel.permissionsFor(bot.user).has("MANAGE_MESSAGES")) {
            bot.logger.error(`Missing permission: \`MANAGE_MESSAGES\` in [${message.guild.id}].`);
			return message.channel.error(settings.language, 'MISSING_PERMISSION', 'MANAGE_MESSAGES').then(m => m.delete({ timeout: 10000 }));
        }

        // Get number of messages to removed
		const amount = parseInt(args[0]) + 1;

        if (!amount) return message.channel.error(settings.language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));

        if (isNaN(amount) || (amount > 100) || (amount < 1)) return message.channel.error(settings.language, 'INCORRECT_FORMAT', settings.prefix.concat(this.help.usage)).then(m => m.delete({ timeout: 5000 }));
    
        await message.channel.messages.fetch({ limit: amount }).then(async messages => {

            await message.channel.bulkDelete(messages, true).catch(err => bot.logger.error(`Command : '${this.help.name}' has error : ${err.message}`));
            message.channel.success(settings.language, 'MODERATION/MESSAGES_DELETED', (messages.size - 1)).then(m => m.delete({timeout: 3000}))
        })
    }

}