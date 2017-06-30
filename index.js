
'use strict';

const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;
const TextMessage = require('viber-bot').Message.Text;
const StickerMessage = require('viber-bot').Message.Sticker;
const winston = require('winston');
const toYAML = require('winston-console-formatter');
const RichMediaMessage = require('viber-bot').Message.RichMedia;
const LocationMessage = require('viber-bot').Message.Location;
const UrlMessage = require('viber-bot').Message.Url;
const keyboard = require('./keyboard');
const firebase = require('./database');
var request = require('request');
const ticaTacToe = require('./ticTacToe');
const messageDispatch = require('./messageDispatch')

function createLogger() {
	const logger = new winston.Logger({
		level: "debug" // We recommend using the debug level for development
	});

	logger.add(winston.transports.Console, toYAML.config());
	return logger;
}
function say(response, message) {
	response.send(new TextMessage(message));
}
const stickers=['40131','40115','40130','40121','40107','40141','114402']
function sendSticker(response) {
   var stickersCount=stickers.length;
   var randSticker = Math.floor(Math.random() * (stickersCount-1 + 1))
	response.send(new StickerMessage(stickers[randSticker]));
}

const logger = createLogger();


// Creating the bot with access token, name and avatar
const bot = new ViberBot(logger, {
	authToken: "4621f1def3715242-3fe0bb40cf5a02ce-1b9cdf0e95ff7989", // Learn how to get your access token at developers.viber.com
	name: "Robo",
	avatar: "https://raw.githubusercontent.com/devrelv/drop/master/151-icon.png" // Just a placeholder avatar to display the user
});

// The user will get those messages on first registration
bot.onSubscribe(response => {
	say(response, `Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me `);
});
bot.onConversationStarted((userProfile, isSubscribed, context, onFinish) =>
    onFinish(new TextMessage(`Hi, ${userProfile.name}! Nice to meet you.`)));
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	console.log(message)
	if ((message instanceof StickerMessage)) {
		console.log('Send sticker')
		sendSticker(response)
	}
	// This sample bot can answer only text messages, let's make sure the user is aware of that.
	if (!(message instanceof TextMessage) && !(message instanceof StickerMessage)) {
		logger.debug(message);
		console.log(message);
		say(response, `Sorry. I can only understand text messages.`);
	}
});

bot.onTextMessage(/^[\d]/i, (message, response) => {
	var userId = response.userProfile.id
	if(message.text>=0&&message.text<9){
	firebase.addUserMove(message.text, userId).then((res) => {
		Promise.all([firebase.getUserMoves(userId), firebase.getBotMoves(userId)])
			.then(values => {
				var botMoves = values[1].val();
				var userMoves = values[0].val();
				var board = ticaTacToe.fillBoard(botMoves, userMoves);
				if (ticaTacToe.checkForWin(board)) {
					response.send(new TextMessage(ticaTacToe.getResult(), keyboard(board,true)))
				} else {
					if (ticaTacToe.checkForCriticalWinMove(board) != -1) {
						var bestBotMove = ticaTacToe.checkForCriticalWinMove(board);
						firebase.addBotMove(bestBotMove, userId)
							.then((err) => {
								board[bestBotMove] = 'O';
								if (ticaTacToe.checkForWin(board)) {
									response.send(new TextMessage(ticaTacToe.getResult(), keyboard(board,true)))
								} else {
									response.send(new TextMessage(board.toString(), keyboard(board)))
								}
							})
					} else if (ticaTacToe.checkForCriticalDeffence(board) != -1) {
						var bestBotMove = ticaTacToe.checkForCriticalDeffence(board);
						firebase.addBotMove(bestBotMove, userId)
							.then((error) => {
								board[bestBotMove] = 'O';
								if (ticaTacToe.checkForWin(board)) {
									response.send(new TextMessage(ticaTacToe.getResult(), keyboard(board,true)))
								} else {
									response.send(new TextMessage('Nice try :)', keyboard(board)))
								}
							})
					} else {
					
						var emptyCellss = ticaTacToe.getEmptyPositions(board);					
						var emptyCellsNumber = emptyCellss.length - 1;
						var botMove = emptyCellss[Math.floor(Math.random() * (emptyCellsNumber + 1))]
						firebase.addBotMove(botMove, userId).then((err) => {
							board[botMove] = 'O';
							if (ticaTacToe.checkForWin(board)) {
								response.send(new TextMessage(ticaTacToe.getResult(), keyboard(board,true)))
							} else {
								response.send(new TextMessage('Your turn :)', keyboard(board)))
							}
							
						})

					}
				}
			})
			.catch(error => { console.log(error) })
	}


	);
}else{
response.send(new TextMessage('Cheater'))
}

});

bot.onTextMessage(/./, (message, response) => {

response.send(messageDispatch(message.text,response))
}); 


const http = require('http');
const port = process.env.PORT || 1337;

const express = require('express')
const app = express()

app.use('/', bot.middleware());
app.get('/',(req,res)=> {

});
const webhookUrl = 'https://kvaba-bot-viber.herokuapp.com/';
app.listen(port, bot.setWebhook(webhookUrl))
//app.listen(port,()=>console.log(`Server running at port:${port}`))