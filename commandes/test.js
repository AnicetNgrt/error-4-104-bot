const log = require("./utils/log.js");

module.exports.run = function testCmd(client, guild, user, args, answer_channel) {
  log(args);
  log("test");

  answer_channel.send("test "+args);
};

module.exports.meta = {
  name: "test",
  help: {
    desc: "Juste pour les tests",
    args: ["arg1","arg2","arg3"]
  },
  argCount: 3
};