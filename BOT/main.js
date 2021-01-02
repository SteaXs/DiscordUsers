const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.js');
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

client.on('ready', () => {
	console.log("Botas dabar turetu but online!");
});

client.login(config.botToken);

client.on('message', message => {
	if (!message.content.startsWith(config.prefix) || message.author.bot) return;
	const args = message.content.slice(config.prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === 'money') {
		client.commands.get('money').execute(message, args);
	} else if (command === 'bank') {
		client.commands.get('bank').execute(message, args);
	} else if (command === 'job') {
		client.commands.get('job').execute(message, args);
	} else if (command === 'info') {
		client.commands.get('info').execute(message, args);
	}
});