const languageData = {
	// CLEAR MESSAGES
	MESSAGES_DELETED: (messages) => `${messages} message(s) on bien été supprimés`,
	SUCCESS_MUTE: (member) => `**${member}** a été rendu muet`,
	SUCCESS_UNMUTE: (member) => `**${member}** n'est plus muet`
};

const translate = (key, args) => {
	const translation = languageData[key];
	if(typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;