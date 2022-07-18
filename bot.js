const Discord = require('discord.js');
const { Client } = require('discord.js');
const client = new Discord.Client();
const chalk = require('chalk');
const fs = require('fs');
const ayarlar = require('./ayarlar.json');
const moment = require('moment')
const https = require('https');
require('./util/eventLoader')(client);
require('discord.js-buttons')(client);

var colors = require('colors');
const { channel } = require('diagnostics_channel');
var prefix = ayarlar.prefix;
var token = ayarlar.token;
var room = ayarlar.commandproxies;
var version = ayarlar.versionbot;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
/*fs.readdir('./attacks/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} attacks loading.`);
  files.forEach(f => {
    let props = require(`./attacks/${f}`);
    log(`Attack: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});*/

fs.readdir("./attacks/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0) {
    console.log(new Error("Đã xảy ra lỗi!"));
    process.exit(1);
    return;
  }

  jsfile.forEach((f) =>{
    let props = require(`./attacks/${f}`);
    console.log(`Đã tải ${f}.`);
    client.commands.set(props.help.name, props);
  });
})

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./attacks/${command}`)];
      let cmd = require(`./attacks/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./attacks/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./attacks/${command}`)];
      let cmd = require(`./attacks/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('clickButton', async (button) => {
  if (button.id === 'stop') {
	var exec = require('child_process').exec
	exec(`screen -S ${button.clicker.user.username} -X quit`, (error, stdout, stderr) => {
	});
	button.defer();
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

client.on('ready', message => {
	

console.log(' ███▄ ▄███▓ ██▓ ███▄    █  ██▓  █████▒██▓    ▓█████ ▒██   ██▒▄▄▄██▀▀▀▄▄▄    ██▒   █▓'.red);
console.log('▓██▒▀█▀ ██▒▓██▒ ██ ▀█   █ ▓██▒▓██   ▒▓██▒    ▓█   ▀ ▒▒ █ █ ▒░  ▒██  ▒████▄ ▓██░   █▒'.red);
console.log('▓██    ▓██░▒██▒▓██  ▀█ ██▒▒██▒▒████ ░▒██░    ▒███   ░░  █   ░  ░██  ▒██  ▀█▄▓██  █▒░'.red);
console.log('▒██    ▒██ ░██░▓██▒  ▐▌██▒░██░░▓█▒  ░▒██░    ▒▓█  ▄  ░ █ █ ▒▓██▄██▓ ░██▄▄▄▄██▒██ █░░'.red);
console.log('▒██▒   ░██▒░██░▒██░   ▓██░░██░░▒█░   ░██████▒░▒████▒▒██▒ ▒██▒▓███▒   ▓█   ▓██▒▒▀█░  '.red);
console.log('░ ▒░   ░  ░░▓  ░ ▒░   ▒ ▒ ░▓   ▒ ░   ░ ▒░▓  ░░░ ▒░ ░▒▒ ░ ░▓ ░▒▓▒▒░   ▒▒   ▓▒█░░ ▐░  '.red);
console.log('░  ░      ░ ▒ ░░ ░░   ░ ▒░ ▒ ░ ░     ░ ░ ▒  ░ ░ ░  ░░░   ░▒ ░▒ ░▒░    ▒   ▒▒ ░░ ░░  '.red);
console.log('░      ░    ▒ ░   ░   ░ ░  ▒ ░ ░ ░     ░ ░      ░    ░    ░  ░ ░ ░    ░   ▒     ░░  '.red);
console.log('       ░    ░           ░  ░             ░  ░   ░  ░ ░    ░  ░   ░        ░  ░   ░  '.red);
console.log('                                                                                ░   '.red);

	
})

client.once('ready', () => {
    console.log('');

    client.user.setPresence({
        status: 'available',
        activity: {
            name: 'ĐỨC LOVE PHƯƠNG',
            type: 'WATCHING',
            url: 'https://discord.com'
        }
    });

  setInterval(function(){
    const channel = client.channels.cache.find(channel => channel.name === room)
    var url = "https://www.proxyscan.io/download?type=socks4"
    const file = fs.createWriteStream("proxies.txt")
    fs.writeFileSync('proxies.txt', ' ');
    const request = https.get(url, function(response) {
        response.pipe(file)
        console.log(`[${moment.utc(Date.now())}] [*] Cập thành công từ cơ sở dữ liệu proxy.`)
    });
    const embed = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle(version)
	.setDescription(`Proxy được cài đặt trong tập tin ${file.path}`)
    channel.send(embed)
      }, 600 * 1000);
});

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.red(e.replace(regToken, 'that was.redacted')));
// });

client.on('warn', e => {
  console.log(chalk.b.red(e.replace(regToken, 'that was.redacted')));
});

client.on('error', e => {
  console.log(chalk.b.red(e.replace(regToken, 'that was.redacted')));
});

client.login(token);