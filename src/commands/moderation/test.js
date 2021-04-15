const Command = require('../../structures/Command');

module.exports = class Test extends Command {

    constructor(bot) {
        super(bot, {
            name: 'test',
            guildOnly: false,
            dirname: __dirname,
        })
    }

    async run(bot, message, args, settings) {
        message.channel.send("TEST");
    }

}