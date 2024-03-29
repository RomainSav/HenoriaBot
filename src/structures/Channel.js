const { Structures } = require('discord.js');

module.exports = Structures.extend('TextChannel', Channel => {
    
	class CustomChannel extends Channel {
		// This will send the translated message
		sendT(language, key, args) {
			try {
				return this.send(this.client.translate(language, key, args));
			} catch (err) {
				this.client.logger.error(err.message);
			}
		}

		info(language, key, args) {
			try {
				return this.send({ embed: {color: "BLUE", description: `${this.client.translate(language, key, args)}`} })
			} catch (err) {
				this.client.logger.error(err.message);
			}
		}

		// This will add the error emoji as the prefix and then translate the message
		error(language, key, args) {
			try {
				let emoji;
				if (this.type == 'dm') {
					emoji = this.client.config.emojis.cross;
				} else {
					emoji = this.permissionsFor(this.client.user).has('USE_EXTERNAL_EMOJIS') ? this.client.config.emojis.cross : ':negative_squared_cross_mark:';
				}
				return this.send({ embed:{ color:15158332, description:`${emoji} ${this.client.translate(language, key, args)}` } });
			} catch (err) {
				this.client.logger.error(err.message);
			}
		}

		// This will add the success emoji as the prefix and then translate the message
		success(language, key, args) {
			try {
				let emoji;
				if (this.type == 'dm') {
					emoji = this.client.config.emojis.tick;
				} else {
					emoji = this.permissionsFor(this.client.user).has('USE_EXTERNAL_EMOJIS') ? this.client.config.emojis.tick : ':white_check_mark:';
				}
				return this.send({ embed:{ color:3066993, description:`${emoji} ${this.client.translate(language, key, args)}` } });
			} catch (err) {
				this.client.logger.error(err.message);
			}
		}
	}
	return CustomChannel;
});