const languageData = {
	// CLEAR MESSAGES
	MESSAGES_DELETED: (messages) => `${messages} message(s) on bien été supprimés`,
};

const translate = (key, args) => {
	const translation = languageData[key];
	if(typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;