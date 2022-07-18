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
console.log('Dùng lệnh hiện phiên bản BOT:' +  message.guild.id)
const embed = new Discord.MessageEmbed()
	.setColor('RANDOM')
	.setTitle("PHIÊN BẢN BOT")
	.setDescription("")
	.addFields(
		{ name: '1.19', value: '759', inline: true },
		{ name: '1.18.2', value: '758', inline: true },
		{ name: '1.18.X', value: '757', inline: true },
		{ name: '1.17.X', value: '756', inline: true },
		{ name: '1.16.5', value: '754', inline: true },
		{ name: '1.16.3', value: '753', inline: true },
		{ name: '1.16.2', value: '751', inline: true },
		{ name: '1.16.1', value: '736', inline: true },
		{ name: '1.16', value: '735', inline: true },
		{ name: '1.15.2', value: '578', inline: true },
		{ name: '1.15.1', value: '575', inline: true },
		{ name: '1.15', value: '573', inline: true },
		{ name: '1.14.4', value: '498', inline: true },
		{ name: '1.14.3', value: '490', inline: true },
		{ name: '1.14.2', value: '485', inline: true },
		{ name: '1.14.1', value: '480', inline: true },
		{ name: '1.14', value: '477', inline: true },
		{ name: '1.13.2', value: '404', inline: true },
		{ name: '1.13.1', value: '401', inline: true },
		{ name: '1.13', value: '393', inline: true },
		{ name: '1.12.X', value: '340', inline: true },
		{ name: '1.10.X', value: '210', inline: true },
		{ name: '1.9.X', value: '110', inline: true },
		{ name: '1.8.X', value: '47', inline: true },
	)
	.setFooter('© » FlexBOT 2022-2023', img)
	.setThumbnail("")
 message.channel.send(embed);
 message.react('✅');
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['protocols'],
  permLevel: 0
}

exports.help = {
  name: 'protocols',
  description: 'Lệnh phiên bản BOT',
  usage: 'protocols'
}