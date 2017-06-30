
var serviceAccount = require('./serviceAccountKey.json');

var firebase = require("firebase-admin");


firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
    databaseURL: "https://fiight-74063.firebaseio.com"
});

module.exports = {
    starGame: (userId) => {
        firebase.database().ref('games/' + userId).set({
            userMoves: '',
            botMoves: ''
        });
    },
    addUserMove: (move, userId) => {
        return new Promise((resolve, reject) => {
            var userMoves = '';
            firebase.database().ref('games/' + userId + '/userMoves')
                .once('value', function (snap) {
                    userMoves = snap.val()
                    userMoves += move;
                    firebase.database().ref('games/' + userId + '/userMoves/').set(userMoves, (err) => {
                        resolve('resolve')
                    });
                })

        })

    },
    addBotMove: (move, userId) => {
        return new Promise((resolve, reject) => {
            var botMoves = '';
            firebase.database().ref('games/' + userId + '/botMoves')
                .once('value').then(snap => {
                    botMoves = snap.val()
                    botMoves += move;
                  firebase.database().ref('games/' + userId + '/botMoves/').set(botMoves,(err) => {
                        resolve('resolve')
                    });
                })

        })

    },
    getUserMoves: (userId) => {
        return firebase.database().ref('games/' + userId + '/userMoves')
            .once('value')


    },
    getBotMoves: (userId) => {
        return firebase.database().ref('games/' + userId + '/botMoves')
            .once('value')
    }
}