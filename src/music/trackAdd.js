const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue, track) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`${track.title} a été ajouté à la file d'attente !`)
    );
}