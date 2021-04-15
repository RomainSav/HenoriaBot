const languageData = {
	// CLEAR MESSAGES
	MESSAGES_DELETED: (messages) => `${messages} messages were successfully deleted.`,
};

const translate = (key, args) => {
	const translation = languageData[key];
	if(typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;