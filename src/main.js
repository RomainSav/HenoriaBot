const Client = require('./base/Henoria');
require('./structures/Channel');
const bot = new Client();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const path = require('path');

(async () => {

    // load commands
    const cmdFolders = await readdir(path.join(__dirname, 'commands'));
    bot.logger.log('=-=-=-=-=-=-=- Loading command(s) -=-=-=-=-=-=-=');
    cmdFolders.forEach(async (dir) => {
    
        const commands = await readdir(path.join(__dirname, 'commands', dir));
        commands.forEach((cmd) => {
            const resp = bot.loadCommand(`./commands/${dir}`, cmd);
            if (resp) bot.logger.error(resp);
        })
    })

    // load events
    const evtFiles = await readdir(path.join(__dirname, 'events'));
	bot.logger.log(`=-=-=-=-=-=-=- Loading events(s): ${evtFiles.length} -=-=-=-=-=-=-=`);
    evtFiles.forEach(file => {
        delete require.cache[file];
        const {name} = path.parse(file);
        try {
            const event = new (require(`./events/${file}`))(bot, name);
            bot.logger.log(`Loading Event : ${name}`);
            bot.on(name, (...args) => event.run(bot, ...args));
        } catch (err) {
            bot.logger.error(`Failed to load Event: ${name} error: ${err.message}`);
        }
    })

    bot.login(bot.config.token).then(() => {
        bot.loadActivity();
        bot.loadMuteRole();
    })

})();