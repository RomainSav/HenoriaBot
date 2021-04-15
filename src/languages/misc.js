// languageData
const languageData = {
	MISSING_PERMISSION: (permission) => `I am missing the permission: \`${permission}\`.`,
};

const translate = (key, args) => {
	const translation = languageData[key];
	if (typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;