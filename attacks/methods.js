const Discord = require("discord.js");
const disbut = require('discord.js-buttons')


exports.run = async (client, message, args) => {
const host = args.join(" ").split(":").slice(0,1)
const port = message.content.split (":")[1]
const proxy = args.join(" ").slice(2)
const ayarlar = require('../ayarlar.json');
var room = ayarlar.commandroom;
var version = ayarlar.versionbot;
var img = ayarlar.img;
var img = ayarlar.img;
if (message.channel.id != room) {
	return;
  }
console.log('Xem tên phương pháp tấn công:' +  message.guild.id)
const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setDescription(`overload, cpudowner, cpurip, tcpkiller, joinmotd, botjoiner, joinkiller, nullping, nettydowner ,join ,aegis ,nantibot ,handshake , bungeesmasher, killnet, spigot, bye`)
 message.channel.send(embed);
 message.react('✅');
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['methods'],
  permLevel: 0
}

exports.help = {
  name: 'methods',
  description: 'Phương Pháp Tấn Công',
  usage: 'methods'
}