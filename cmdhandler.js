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
      let cmdModule = require(`./commandes/${file}`);
      if(cmdModule == undefined) return log(file+" missing module");
      if(cmdModule.run == undefined) return log(file+" missing run()");
      if(cmdModule.meta == undefined) return log(file+" missing meta");
      if(cmdModule.meta.name == undefined) return log(file+" missing meta.name");
      cmdNames.push(cmdModule.meta.name);
      cmdModules[cmdModule.meta.name] = cmdModule;
      log("Successfully loaded " + file);
    });
});


module.exports.run = function cmdHandler(client, guild, user, command, args, answer_channel) {
  if(!cmdNames.includes(command)) {
    return answer_channel.send("Commande inconnue... ")
      .then(msg => {
        msg.delete(5000);
      });
  }
  argCount = cmdModules[command].meta.argCount;

  if(args.length < argCount) {
    return answer_channel.send("il manque des arguments... "+argCount+" arguments requis")
      .then(msg => {
        msg.delete(5000);
      });
  }

  cmdModules[command].run(client, guild, user, args, answer_channel);
}