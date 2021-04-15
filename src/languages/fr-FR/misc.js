const permisisons = require('../../../resources/permissions.json');

// languageData
const languageData = {
	MISSING_PERMISSION: (permission) => `Il me manque la permission: \`${permisisons[permission]}\`.`,
    INCORRECT_FORMAT: (commandExample) => `Utiliser le format: \`${commandExample}\`.`,
};

const translate = (key, args) => {
	const translation = languageData[key];
	if (typeof translation === 'function') return translation(args);
	else return translation;
};

module.exports = translate;