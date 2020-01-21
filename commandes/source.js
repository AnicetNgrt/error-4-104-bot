const log = require("./utils/log.js");

module.exports.run = function sourceCmd(client, guild, user, args, answer_channel) {
  let str = "sur Repl: https://repl.it/@AnicetN/error-4-104-bot";
  str += "\nsur GitHub: https://github.com/AnicetNgrt/error-4-104-bot";
  answer_channel.send(str);
};

module.exports.meta = {
  name: "source",
  help: {
    desc: "Donne les liens vers le code source du bot",
    args: []
  },
  argCount: 0
};