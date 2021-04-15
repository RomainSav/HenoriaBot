const { MessageEmbed } = require("discord.js");

module.exports = (client, message, query) => {
    message.channel.send(
        new MessageEmbed()
            .setColor("BLUE")
            .setDescription("Je n'ai trouvé aucuns résultat sur youtube")
    );
}