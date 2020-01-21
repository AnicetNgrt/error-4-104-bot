const log = require("./utils/log.js");
const fs = require("fs");

module.exports.run = function helpCmd(client, guild, user, args, answer_channel) {
  var str = "===== LE MAN =====\n\n";
  
  fs.readdir("./commandes/", function (err, files){
    if (err) return console.log(err);
    files.forEach( function cmdIterator(file){
      if (!file.endsWith(".js")) return;
      let name = file.split(".")[0];
      let cmdModule = require(`./${file}`);
      str += "- `/" + cmdModule.meta.name;
      for (const arg of cmdModule.meta.help.args) {
        str += " <" + arg + ">";
      }
      str += "`\n" + cmdModule.meta.help.desc + "\n\n";
      if(str.length > 1000) {
        answer_channel.send(str);
        str = "";
      }
    });
    answer_channel.send(str);
  });
};

module.exports.meta = {
  name: "help",
  help: {
    desc: "Affiche l'aide",
    args: []
  },
  argCount: 0
};