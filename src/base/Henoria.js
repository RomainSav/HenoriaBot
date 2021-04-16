const { Client, Collection } = require('discord.js');
const path = require('path');
const {Player} = require('discord-player');

module.exports = class Henoria extends Client {
    
    constructor(options) {
        super(options);

        this.logger = require('../utils/logger');
            
        this.aliases = new Collection();
        this.commands = new Collection();
        this.cooldowns = new Collection();

        this.config = require('../../resources/config.json');

        this.db = require('../utils/database.json');

		this.Activity = [];
		this.PresenceType = 'PLAYING';

        this.player = new Player(this, {
            leaveOnEnd: false,
            leaveOnEndCooldown: false,
            leaveOnStop: false,
            leaveOnEmpty: true,
            leaveOnEmptyCooldown: false,
            autoSelfDeaf: true,
            quality: 'high'
        });
    }

    /**
     * @param {array} array 
     * @param {string} type 
     */
    loadActivity() {
        let allMembers = 0;
        this.guilds.cache.map(guild => {
            allMembers += guild.memberCount;
        })
        this.Activity = [
            "www.henoria.fr",
            "+help | Henoria",
            "Henoria MC:BE",
            `${allMembers} Membre(s)`
        ];
        try {
            let i = 0;
            setInterval(() => {
                this.user.setActivity(`${this.Activity[i++ % this.Activity.length]}`, { type: this.PresenceType })
            }, 10000)
        } catch (e) {
            console.log(e);
        }
    }

    loadMuteRole() {
        this.guilds.cache.map(guild => {
            let mute_role = guild.roles.cache.find(r => r.name === "Mute")
            if (mute_role === null) {
                guild.roles.create({
                    data: {
                        name: "Mute",
                        color: "GRAY",
                        mentionable: false,
                    },
                    reason: "Missing `Mute` role",
                }).then((role) => {
                    guild.channels.cache.map(channel => {
                        channel.overwritePermissions([
                            {
                                id: role.id,
                                deny: ["SEND_MESSAGES", "SPEAK", "STREAM"]
                            }
                        ])
                    })
                })
            }
        })
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