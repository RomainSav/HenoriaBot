const Client = require('./base/Henoria');
require('./structures');
const bot = new Client();
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const path = require('path');
const fs = require('fs');

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

    // load music events
    const musicEvtFiles = await readdir(path.join(__dirname, 'music'));
    bot.logger.log(`=-=-=-=-=-=-=- Loading music events(s): ${musicEvtFiles.length} -=-=-=-=-=-=-=`);
    musicEvtFiles.forEach(file => {
        const event = require(`./music/${file}`);
        bot.logger.log(`Loading Music Event : ${file}`);
        bot.player.on(file.split(".")[0], event.bind(null, bot));
    })

    bot.login(bot.config.token).then(() => {
        bot.loadActivity();
        bot.loadMuteRole();
    })

})();