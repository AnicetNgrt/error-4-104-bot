// Command Handler
// desc: raccorde les commandes et les arguments
//  aux fonctions correspondantes dans ./commandes/ 

const fs = require("fs");
const log = require("./commandes/utils/log.js");

var cmdNames = []
var cmdModules = {}

fs.readdir("./commandes/", function (err, files){
    if (err) return console.log(err);
    files.forEach( function cmdLoader(file){
      if (!file.endsWith(".js")) return;
      log("Successfully loaded " + file)
      let name = file.split(".")[0];
      cmdModules[name] = require(`./commandes/${file}`);
      cmdNames.push(name);
    });
});


module.exports.run = function cmdHandler(client, guild, user, command, args, answer_channel) {
  if(!cmdNames.includes(command)) {
    return log("command not found");
  }
  argCount = cmdModules[command].meta.argCount;

  if(args.length < argCount) {
    return log("argument(s) missing, "+argCount+" required");
  }

  cmdModules[command].run(client, guild, user, args, answer_channel);
}