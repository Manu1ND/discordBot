'use strict';

import { Client } from "discord.js";
import pkg from 'node-schedule';
const { RecurrenceRule, scheduleJob, Range } = pkg;

var bot = new Client();

const prefix = "manu"
const commands = { "ping": "Checks Latency", "sum": "Adds args; eg: manusum 10 20 21" }

bot.on('ready', () => {
	// change channel name to name of channel or just set to equal the channel ID if you already know it.
	var channel = '803275269007212604';


	var rule = new RecurrenceRule(); // Creates new Recurrence Rule
	rule.dayOfWeek = [new Range(1, 5)];
	rule.hour = 14;
	rule.minute = [55, 57, 59];
	rule.second = [0, 30];

	scheduleJob(rule, function () {
		bot.channels.cache.get(`803275269007212604`).send("Among us at 3pm? @everyone");
	})

	console.log("Bot is ready.");
});

bot.on("message", function (message) {
	if (message.author.bot) return; // to check if the author of the bot is a bot
	if (!message.content.toLowerCase().startsWith(prefix)) return;

	const commandBody = message.content.slice(prefix.length);
	const args = commandBody.split(' '); // splits and arguments    args = 10 15 20 command = sum
	const command = args.shift().toLowerCase(); // removes command name from const args and assigns it to const command

	if (command === "ping") {
		const timeTaken = Date.now() - message.createdTimestamp;
		message.reply(`Pong! This message had a latency of ${timeTaken}ms.`);
	}

	else if (command === "sum") {
		const numArgs = args.map(x => parseFloat(x));
		const sum = numArgs.reduce((counter, x) => counter += x);
		message.reply(`The sum of all the arguments you provided is ${sum}!`);
	}

	else if (command === "help") {
		var helpText = 'Prefix: manu\n';
		for (var commandName in commands) {
			helpText += `${commandName}: ${commands[commandName]}\n`;
		}
		message.reply(helpText);
	}
});

//login
bot.login('ODA2NjIxMDQ1MDQxMDA0NTQ0.YBsGYw.bPh5YHZmmq1cwWGfsc5zJ6K_ZH4');