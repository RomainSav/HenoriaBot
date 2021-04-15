const { MessageEmbed } = require("discord.js");

module.exports = (client, message, queue) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription("Je me suis déconnecté car le salon vocal était vide !")
    );
};