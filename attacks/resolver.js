const https = require('https');
const Discord = require("discord.js");

exports.run = async (client, message, args) => {
const ip = message.content.split (" ")[1]
const ayarlar = require('../ayarlar.json');
var room = ayarlar.commandroom;
var img = ayarlar.img;

if (message.channel.id != room) {
	return;
}

if(!args[0]) {
    const embed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle('CẢNH BÁO')
      .setDescription("`Vui lòng nhập địa chỉ IP`")
      .setFooter('© » FlexBOT 2022-2023', img)
   message.channel.send(embed);
   message.react('❌');
   return;
}

const options = {
    hostname: 'api.mcsrvstat.us',
    port: 443,
    path: '/2/' + args[0],
    method: 'GET'
}
const request = https.request(options, response => {
    let str = '';
    response.on('data', data => {
        str += data;
    });
    response.on('end', () => {
        resp = JSON.parse(str);
        if(!resp.hostname) {
            message.channel.send('Không tìm thấy địa chỉ IP: ' + args[0]);
            return;
        }
        //create answer message with default offline data
        let embed = {
            color: 'RANDOM',
            title: args[0],
            thumbnail: {
                url: 'https://api.mcsrvstat.us/icon/' + args[0]
            },
            fields: [{ name: 'Trạng thái', value: 'Không tín hiệu' }],
            image: {
                url: 'https://api.mcsrvstat.us/icon/' + args[0]
            },
            footer: {
                text: '© » FlexBOT 2022-2023'
            }
        };
        //fill with data if it's online
        if(resp.online) {
            embed.fields[0].value = 'Trực tuyến';
            embed.fields.push({
                name: 'Địa Chỉ',
                value: resp.ip,
                inline: true
            });
            embed.fields.push({
                name: 'Cổng',
                value: resp.port,
                inline: true
            });
            embed.fields.push({
                name: 'MOTD',
                value: (resp.motd) ? resp.motd.clean.join('\n') : 'Thiếu',
                inline: true
            });
            embed.fields.push({
                name: 'Người chơi',
                value: resp.players.online + '/' + resp.players.max,
                inline: true
            });
            embed.fields.push({
                name: 'Phiên bản',
                value: resp.protocol,
                inline: true
            });
        }
        //send answer
        message.channel.send({ embed: embed });
		message.react('✅');
    });
});
//error handling
request.on('error', err => {
    console.log(err);
    message.channel.send('Không thể lấy thông tin máy chủ!');
	message.react('❌');
})
//close request
request.end()

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['resolver'],
    permLevel: 0
  }
  
  exports.help = {
    name: 'resolver',
    description: 'Özel',
    usage: 'resolver'
  }