const { MessageEmbed } = require("discord.js");

module.exports = (client , message, queue, playlist) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${playlist.title} a été ajouté a la file d'attente (**${playlist.tracks.length}** musiques) !`)
    );
}