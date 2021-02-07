'use strict';
const Discord = require('discord.js');
const moment = require('moment-timezone');

module.exports.notify = event => {
  notify();
};

function notify(){
  const client = new Discord.Client();
  client.on('ready', () => {
    const promises = []

    client.guilds.cache.forEach(guild=>{
      const channels = guild.channels.cache.reduce((acc,cur)=>{
        if(cur.name === "エントリーbot" && cur.isText()){
          acc.push(cur)
        }
        return acc
      },[]);
      console.log(channels.length)
      channels.forEach(channel=>{
        promises.push(sendMessage(guild,channel));
      })
    })

    Promise.all(promises).then(()=>{
        client.destroy();
    })
  });
  client.login(process.env.token);
}

function getMessage(){
  return `[BOT]${moment().tz("Asia/Tokyo").format("MM[月]DD[日]")}の参加募集
参加を希望するプレイヤーはリアクションにて参加可能時間を指定のうえ、エントリーしてください。
[23時00分][23時30分][23時??分][24時以降]`
}

async function sendMessage(guild,channel){
  const message = await channel.send(getMessage());
  // await message.react("💩")
  // await message.react("🔰")
}
