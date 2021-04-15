const languageData = {
    CHANNEL_LOCK: `**:lock: Le salon est verrouillé**`,
    CHANNEL_UNLOCK: `**:unlock: Le salon est déverrouillé**`
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;