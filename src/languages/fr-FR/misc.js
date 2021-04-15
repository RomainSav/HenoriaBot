// languageData
const languageData = {
	MISSING_PERMISSION: (permission) => `I am missing the permission: \`${permission}\`.`,
    INCORRECT_FORMAT: (commandExample) => `Please use the format: \`${commandExample}\`.`,
};

const translate = (key, args) => {
	const translation = languageData[key];
	if (typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;