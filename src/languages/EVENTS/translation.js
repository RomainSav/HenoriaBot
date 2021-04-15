const languageData = {
	GUILD_COMMAND_ERROR: 'That command can only be ran in a server.',
    NOT_NSFW_CHANNEL: 'That command can only be done in a `NSFW` channel.',
    COMMAND_COOLDOWN: (seconds) => `You must wait ${seconds} seconds between each command.`,
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;