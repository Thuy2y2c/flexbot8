const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

module.exports = client => {

  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Kích Hoạt, Lệnh đã tải thành công!`);
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Đã kết nối với tên ${client.user.username}!`);
  client.user.setStatus("online");
};
