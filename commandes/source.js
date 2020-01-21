const log = require("./utils/log.js");

module.exports.run = function sourceCmd(client, guild, user, args, answer_channel) {
  answer_channel.send("https://repl.it/@AnicetN/error-4-104-bot");
};

module.exports.meta = {
  name: "source",
  help: {
    desc: "Donne le lien vers le code source du bot",
    args: []
  },
  argCount: 0
};