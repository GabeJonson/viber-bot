module.exports = (board, winner,buttons) => {

    let keyboard = {
        Type: "keyboard",
        Buttons: [{
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "0",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "1",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "2",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "3",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "4",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "5",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "6",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "7",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }, {
            "Columns": 2,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "8",
            "BgColor": "#e0e0e0",
            "Text": '-',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        }]
    };
    if (board) {
        for (let i = 0; i < board.length; i++) {
            if (board[i] == "X" || board[i] == 'O') {
                keyboard.Buttons[i].Text = board[i];
                keyboard.Buttons[i].ActionBody = board[i];
            }
        }
    }
    if (winner) {
        keyboard.Buttons.push({
            "Columns": 3,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "game",
            "BgColor": "#42f442",
            "Text": 'Play again',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        });
        keyboard.Buttons.push({
            "Columns": 3,
            "Rows": 1,
            "ActionType": "reply",
            "ActionBody": "wiki",
            "BgColor": "#f44141",
            "Text": 'I give up',
            "TextHAlign": "center",
            "TextVAlign": "middle",

        });

    }
    if(buttons){
        keyboard.Buttons=buttons;
    }


    return keyboard
};

