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
	if (message.channel.id != room) {
		return;
	}
	var exec = require('child_process').exec
		exec(`pkill 'java'`, (error, stdout, stderr) => {
	});
	console.log('Dừng lại tất cả cuộc tấn công:' +  message.guild.id)
	const embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(version)
		.setDescription("TẤT CẢ CUỘC TẤN CÔNG ĐÃ DỪNG LẠI!")
		.setFooter('© » FlexBOT 2022-2023', img)
		.setThumbnail("")
	 message.channel.send(embed);
	 message.react('✅');
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['stop'],
  permLevel: 0
}

exports.help = {
  name: 'stop',
  description: 'Lệnh dừng lại',
  usage: 'stop'
}