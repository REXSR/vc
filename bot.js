const Discord = require('discord.js')

const fs = require('fs');

const clinet = new Discord.Client({disableEveryone: true, maxMessagesCache: 1});

const config = require('./Configuration.json');

const tpoints = JSON.parse(fs.readFileSync('./Text.json', 'UTF8'));

const vpoints = JSON.parse(fs.readFileSync('./Voice.json', 'UTF8'));

clinet.config = config;

clinet.login(client.config.token);

clinet.on('ready',async => {

  console.log(`.Codes TOP.`);

  clinet.users.forEach(m => {

    if(m.bot) return;

    if(!tpoints[m.id]) tpoints[m.id] = {points: 0, id: m.id};

    fs.writeFileSync("./Text.json", JSON.stringify(tpoints, null, 2));

    if(!vpoints[m.id]) vpoints[m.id] = {points: 0, id: m.id};

    fs.writeFileSync("./Voice.json", JSON.stringify(vpoints, null, 2));

  });

});

clinet.on('message', message => {

  if(message.author.bot || message.channel.type === 'dm') return;

  let args = message.content.split(' ');

  let member = message.member;

  let mention = message.mentions.users.first();

  let guild = message.guild;

  let author = message.author;

  let rPoints = Math.floor(Math.random() * 4) + 1;// Random Points

  tpoints[author.id].points += rPoints;

  fs.writeFileSync("./Text.json", JSON.stringify(tpoints, null, 2));

  if(args[0] === `${hero.config.prefix}top`) {

    let _voicePointer = 1;

    let _textPointer = 1;

    let _voiceArray = Object.values(vpoints);

    let _textArray = Object.values(tpoints);

    let _topText = _textArray.slice(0, 5).map(r => `**\`.${_textPointer++}\` | <@${r.id}> \`XP: ${r.points}\`**`).sort((a, b) => a > b).join('\n');

    let _voiceText = _voiceArray.slice(0, 5).map(r => `**\`.${_voicePointer++}\` | <@${r.id}> \`XP: ${r.points}\`**`).sort((a, b) => a > b).join('\n');

    let topRoyale = new Discord.RichEmbed();

    topRoyale.setTitle(' \ðŸ“‹Guild Score Leaderboards');

    topRoyale.addField(`**TOP 5 TEXT ðŸ’¬**`, _topText, true);

    topRoyale.addField(`**TOP 5 VOICE ðŸŽ™**`, _voiceText, true);

    topRoyale.setFooter(message.author.username, message.author.avatarURL, message.author.tag);

    topRoyale.setColor("GREEN");

    message.channel.send(topRoyale).catch(e => {

      if(e) return message.channel.send(`**. Error; \`${e.message}\`**`);

    });

  }

});

client.on('voiceStateUpdate', (u, member) => {

  let author = member.user.id;

  let guild = member.guild;

  if(member.voiceChannel === null) return;

  let rPoints = Math.floor(Math.random() * 4) + 1;// Random Points

  setInterval(() => {

    if(!member.voiceChannel) return;

    if(member.selfDeafen) return;

    vpoints[author].points += rPoints;

    fs.writeFileSync("./Voice.json", JSON.stringify(vpoints, null, 2));

  }, 5000); // 5 Secs

});








client.login(process.env.BOT_TOKEN);
