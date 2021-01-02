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
	name: 'job',
	description: "This command is used to get users job amount in FiveM",
	execute(message, args){
		function onErr (error, err) {
			message.reply("There was an ERROR, probably because you havent linked your Discord to FiveM");
		}

		con.query(`SELECT * FROM users WHERE discord = 'discord:${message.author.id}'`, (error, rows) => {
			try {
				message.reply(`You work as ${rows[0].job}, at the grade number ${rows[0].job_grade}`);
			}
			catch (err) {
				onErr(error, err);
			}
		});
	}
}