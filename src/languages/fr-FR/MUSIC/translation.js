const settings = require('../../../../resources/config.json');

const languageData = {
    NOT_IN_VOICE_CHANNEL: `Vous n'êtes pas dans un salon vocal`,
    NOT_IN_SAME_CHANNEL: `Vous n'êtes pas dans le même salon vocal`,
    EMPTY_SONG_NAME: `Merci d'indiquer le titre d'une musique`,
    INVALID_URL: `L'url est invalide`,
    ALREADY_PAUSED: `La musique est déjà en pause`,
    ALREADY_PLAYING: `La musique est déjà en écoute`,
    NOT_PLAYING: `Aucune musique est en écoute`,
    SUCCESS_PAUSED: (song) => `La musique ${song} a été mise sur pause`,
    SUCCESS_RESUMED: (song) => `La musique ${song} a repris `,
    SUCCESS_STOPPED: `La musique s'est arrêtée`,
    SKIP: `La musique vient d'être changée`,
    SHUFFLE: (songs) => `File d'attente mélangée **${songs}** musique(s)`
};

const translate = (key, args) => {
    const translation = languageData[key];
    if (typeof translation === 'function') return translation(args);
    else return translation;
}

module.exports = translate;