const languageData = {
	GUILD_COMMAND_ERROR: 'Cette commande ne peux que être executer dans un serveur',
    NOT_NSFW_CHANNEL: 'Cette commande ne peux que être executer dans un salon `NSFW`',
    COMMAND_COOLDOWN: (seconds) => `Vous devez attendre ${seconds} secondes(s) entre chaque commande`,
    MISSING_USER: 'Vous devez mentionner un membre',
    USER_DONT_EXISTS: (member) => `L'utilisateur **${member}** n'existe pas`,
    CANNOT_AUTO_MUTE: "Vous ne pouvez pas vous mute vous même",
    CANNOT_AUTO_UNMUTE: "Vous ne pouvez pas vous unmute vous même",
    DONT_HAVE_MUTE_ROLE: (member) => `**${member}** n'est pas muet`,
    CANNOT_AUTO_BAN: "Vous ne pouvez pas vous ban vous même",
    CANNOT_BAN: (member) => `Je ne peux pas bannir **${member}**`,
    USER_NOT_BAN: (member) => `**${member}** n'est pas banni`
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;