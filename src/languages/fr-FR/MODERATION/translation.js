const languageData = {
	// CLEAR MESSAGES
	MESSAGES_DELETED: (messages) => `${messages} message(s) on bien été supprimés`,
	SUCCESS_MUTE: (member) => `**${member}** a été rendu muet`,
	SUCCESS_UNMUTE: (member) => `**${member}** n'est plus muet`,
	SUCCESS_BAN: (member) => `**${member}** a été banni`,
	SUCCESS_UNBAN: (member) => `**${member}** a été debani`
};

const translate = (key, args) => {
	const translation = languageData[key];
	if(typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;