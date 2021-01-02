const Discord = require('discord.js');
const mysql = require('mysql');
const config = require('../config');

var con = mysql.createConnection({
	host: config.db.host,
	user: config.db.user,
	password: config.db.password,
	database: config.db.database
});

module.exports = {
	name: 'info',
	description: "This command is used to get users information in FiveM",
	execute(message, args){
		function onErr (error, err) {
			message.reply("There was an ERROR, probably because you havent linked your Discord to FiveM");
			console.log(err);
		}

		con.query(`SELECT * FROM users WHERE discord = 'discord:${message.author.id}'`, (error, rows) => {
			try {
					const pos = rows[0].position;
					const embed = new Discord.MessageEmbed()
					.setTitle('User Information')
					.setColor('#0099ff')
					.addField('Identifier ', "``" + rows[0].identifier + "``")
					.addField('License ', "``" + rows[0].license + "``")
					.addField('Money ', "``" + rows[0].money + "``")
					.addField('Bank ', "``" + rows[0].bank + "``")
					.addField('Permission Level ', "``" + rows[0].permission_level + "``")
					.addField('Group ', "``" + rows[0].group + "``")
					.addField('Job ', "``" + rows[0].job + "``")
					.addField('Position ', "``" + `X: ${JSON.parse(pos).x} ` + `Y: ${JSON.parse(pos).y} ` + `Z: ${JSON.parse(pos).z}` + "``")
					.addField('Phone Numer ', "``" + rows[0].phone_number + "``")
					.setFooter('Made by SteaX#0001', "https://media.discordapp.net/attachments/596027347375882240/729463092035190848/Logo1.png?width=676&height=676")
					message.channel.send(embed);
			}
			catch (err) {
				onErr(error, err);
			}
		});
	}
}
