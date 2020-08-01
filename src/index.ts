/**

Here are some useful URLs

-- Get the page for durability (stills needs scraping)
https://rustlabs.com/item/{itemName}#tab=destroyed-by;filter=0,1,1,1,0;sort=4,0,3

*/
import { QueryMan, QueryType } from "./Query";

/** Qman can run queries based on the type */
var qman: QueryMan = new QueryMan();
qman.runQuery(QueryType.Durability, 'armored-door');


/** 

Discord stuff here

import * as Discord from "discord.js";

var client: Discord.Client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
 
client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong');
  }
});
 
client.login('token');

*/