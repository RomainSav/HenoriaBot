const languageData = {
    NOT_TICKET_CHANNEL: `Ce salon n'est pas un ticket`
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;