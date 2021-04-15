const { MessageEmbed } = require("discord.js");

module.exports = (client, message, track) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription(`Lecture en cours : ${track.title}`)
    );
}