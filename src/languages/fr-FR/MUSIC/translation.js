const settings = require('../../../../resources/config.json');

const languageData = {
    NOT_IN_VOICE_CHANNEL: `Vous n'êtes pas dans un salon vocal`,
    NOT_IN_SAME_CHANNEL: `Vous n'êtes pas dans le même salon vocal`,
    EMPTY_SONG_NAME: `Merci d'indiquer le titre d'une musique`,
    INVALID_URL: `L'url est invalide`
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;