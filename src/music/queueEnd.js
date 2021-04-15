const { MessageEmbed } = require("discord.js");

module.exports = (client , message, queue) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription("La musique s'est arretée car la file d'attente est vide !")
    );
}