const { Client, Collection } = require('discord.js');
const path = require('path');

module.exports = class Henoria extends Client {
    
    constructor(options) {
        super(options);

        this.logger = require('../utils/logger');
            
        this.aliases = new Collection();
        this.commands = new Collection();
        this.cooldowns = new Collection();

        this.config = require('../../resources/config.json');
    }

    loadCommand(commandPath, commandName) {
        try {
            const cmd = new (require(`.${commandPath}${path.sep}${commandName}`))(this);
            this.logger.log(`Loading Command: ${cmd.help.name}`);
            cmd.conf.location = commandPath;
            if (cmd.init) cmd.init(this);
            this.commands.set(cmd.help.name, cmd);
            cmd.help.aliases.forEach((alias) => {
                this.aliases.set(alias, cmd.help.name);
            });
            return false
        } catch (err) {
            return `Unable to load command ${commandName} : ${err}`;
        }
    }

    translate(language, key, args) {
        let languageFile;
		if (key.includes('/')) {
			const word = key.split('/');
			languageFile = require(`../languages/${language}/${word[0]}/translation`);
			return languageFile(word[1], args);
		} else {
			languageFile = require(`../languages/${language}/misc`);
			return languageFile(key, args);
		}
    }
}