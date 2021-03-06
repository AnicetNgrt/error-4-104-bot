const log = require("./commandes/utils/log.js");
const keepAlive = require('./server');

const Discord = require('discord.js');
const client = new Discord.Client();

const cmdHandler = require("./cmdhandler");
const reactionHandler = require("./reactionhandler");

client.on('ready', function clientReady(){
  log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('/help', {});
});

client.on('message', function messageReceived(message){
  if(!message.content.startsWith("/")) return;
  text = message.content.slice(1);
  parts = text.match(/(?:[^\s"]+|"[^"]*")+/g);
  for(i = 0; i < parts.length; i++) {
    if(parts[i].endsWith("\"")) {
      parts[i] = parts[i].slice(0, parts[i].length-1);
    }
    if(parts[i].startsWith("\"")) {
      parts[i] = parts[i].slice(1);
    }
  }
  command = parts[0];
  args = parts.slice(1);
  cmdHandler.run(client, message.guild, message.author, command, args, message.channel);
});

/*
client.on('messageReactionAdd', message => {

});

client.on('messageReactionRemove', message => {

});
*/

keepAlive();
client.login(process.env.token);