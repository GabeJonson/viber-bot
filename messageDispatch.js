const TextMessage = require('viber-bot').Message.Text;
const UrlMessage = require('viber-bot').Message.Url;
const LocationMessage = require('viber-bot').Message.Location;
const keyboard = require('./keyboard');
const location = new LocationMessage('42.6989914', '23.3081606');
const websait = new UrlMessage('http://robo.bg');
const websaitKvaba = new UrlMessage('http://kvaba.com');
const ticaTacToeWiki = new UrlMessage('https://en.wikipedia.org/wiki/Tic-tac-toe');
const firebase = require('./database');
const ticTacToe = require('./ticTacToe');
const messagesData = require('./messages.json');
module.exports = (text, response) => {
    let newMessage = getMessage(text)[0];
    console.log(newMessage);
    if(text.match(/game|play|игра|играи/i)){
        firebase.starGame(response.userProfile.id);
        return new TextMessage('Lets play Tic Tac Toe', keyboard())
    }
    if (!newMessage) {
        if (text.match(/[а-яА-Я]+/ig)) {
            return new TextMessage(`Съжалявам,${response.userProfile.name} , не разбирам въпроса.`)
        } else {
            return new TextMessage(`Sorry ${response.userProfile.name}, I do not understand.`);
        }

    } else {
        switch (newMessage.type) {
            case 'text':
                console.log('switch case text' + newMessage.response);
                return new TextMessage(newMessage.response)
                break;
            case 'url':
                console.log('switch case url' + newMessage.response);
                return new UrlMessage(newMessage.response);
                break;
            case 'keyboard':
                console.log('switch case keyboard' + newMessage.response);
                console.log(keyboard(newMessage.buttons));
                return new TextMessage(newMessage.response, keyboard(null, null, newMessage.buttons));
                break;


        }
    }

    /* if (msg.match(/game|play|игра|играи/i)) {
     firebase.starGame(response.userProfile.id)
     return new TextMessage('Lets play Tic Tac Toe', keyboard())
     } else if (msg.match(/wiki/i)) {
     return ticaTacToeWiki;
     } else if (msg.match(/сайт|site/i)) {
     return websait;
     } else if (msg.match(/къде|where/i)) {
     return location;
     } else if (msg.match(/hi|hello/i)) {
     return new TextMessage(`Hi ${response.userProfile.name} `)
     } else if (msg.match(/здрасти|здравей|ей|хей/i)) {
     return new TextMessage(`Здравей, ${response.userProfile.name} `)
     }  else if (msg.match(/robo|робо/ig)) {
     return websait;
     } else if (msg.match(/kvaba|кваба/ig)) {
     return websaitKvaba;
     }else if (msg.match(/^O|X/ig)) {
     let userId = response.userProfile.id
     Promise.all([firebase.getUserMoves(userId), firebase.getBotMoves(userId)])
     .then(values => {
     let botMoves = values[1].val();
     let userMoves = values[0].val();
     let board = ticTacToe.fillBoard(botMoves, userMoves);
     return new TextMessage('Please choose empry cell', keyboard(board))
     })

     }else if (msg.match(/[а-яА-Я]+/ig)) {
     return new TextMessage(`Съжалявам, ${response.userProfile.name}, не разбирам въпроса.`)
     }else{
     return new TextMessage( `Sorry ${response.userProfile.name}, I do not understand.`)
     }*/


};

let messageMatcher = (msg, text) => {

    let regex = new RegExp(msg.text, 'i');

    return regex.test(text);
};

let getMessage = (text) => {

    return messagesData.messages.filter((msg) => messageMatcher(msg, text));
};
