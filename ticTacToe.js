var result = "";
module.exports = {
    getResult: () => {
        return result
    },
    getEmptyPositions: (board) => {
        var emptyPosition = [];
        for (var i = 0; i < board.length; i++) {
            if (board[i] == 'E') {
                emptyPosition.push(i);
            }
        }
        return emptyPosition;
    },

    fillBoard: (botMoves, userMoves) => {
        var board = ["E", "E", "E", "E", "E", "E", "E", "E", "E"];
        for (var i = 0; i < botMoves.length; i++) {
            board[botMoves[i]] = 'O'
        }
        for (var i = 0; i < userMoves.length; i++) {
            board[userMoves[i]] = 'X'
        }
        return board;
    },


    checkForWin: (board) => {
        var B = board;
        //check rows
        for (var i = 0; i <= 6; i = i + 3) {
            if (B[i] !== "E" && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
                if (B[i] == 'X') {
                    result = "You won"; //update the state result
                } else {
                    result = "Sorry,I won"; //update the state result
                }

                return true;
            }
        }

        //check columns
        for (var i = 0; i <= 2; i++) {
            if (B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
                 if (B[i] == 'X') {
                    result = "You won"; //update the state result
                } else {
                    result = "Sorry,I won"; //update the state result
                }
                return true;
            }
        }

        //check diagonals
        for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            if (B[i] !== "E" && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
                 if (B[i] == 'X') {
                    result = "You won"; //update the state result
                } else {
                    result = "Sorry,I won"; //update the state result
                }
                return true;
            }
        }

        var available = B.indexOf('E') > -1;
        if (!available) {
            //the game is draw
            result = "draw"; //update the state result
            return true;
        }
        else {
            return false;
        }
    },
    checkForCriticalWinMove: (board) => {
        var B = board;
        var criticalWinMove = -1;
        //check rows
        for (var i = 0; i <= 6; i = i + 3) {
            var oCells = [];
            var emptyCells = [];
            for (j = i; j < i + 3; j++) {
                if (B[j] == "O") {
                    oCells.push(j);
                }
                if (B[j] == "E") {
                    emptyCells.push(j);
                }
            }
            if (oCells.length == 2 && emptyCells.length == 1) {
                criticalWinMove = emptyCells[0];
                return criticalWinMove;
            }
        }

        //check columns
        for (var i = 0; i <= 2; i++) {
            var oCells = [];
            var emptyCells = [];
            for (j = i; j <= i + 6; j = j + 3) {
                if (B[j] == "O") {
                    oCells.push(j);
                }
                if (B[j] == "E") {
                    emptyCells.push(j);
                }
            }
            if (oCells.length == 2 && emptyCells.length == 1) {
                criticalWinMove = emptyCells[0];
                return criticalWinMove;
            }



            // if (B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
            //     result = B[i] + "-won"; //update the state result
            //     return true;
            // }
        }

        //check diagonals
        for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            var diagonal = [B[i], B[i + j], B[i + 2 * j]];
            var oCells = [];
            var emptyCells = [];
            for (var d = 0; d < diagonal.length; d++) {
                if (diagonal[d] == "O") {
                    oCells.push(d);
                }
                if (diagonal[d] == "E") {
                    emptyCells.push(d);
                }
            }
            if (oCells.length == 2 && emptyCells.length == 1) {

                switch (emptyCells[0]) {
                    case 0:
                        criticalWinMove = i;
                        break;
                    case 1:
                        criticalWinMove = i + j;
                        break;
                    case 2:
                        criticalWinMove = i + 2 * j;
                        break;

                }
                return criticalWinMove;
            }

        }
        return criticalWinMove

    },

    checkForCriticalDeffence: (board) => {
        var B = board;
        var criticalDeffenceMove = -1;
        //check rows
        for (var i = 0; i <= 6; i = i + 3) {
            var xCells = [];
            var emptyCells = [];
            for (j = i; j < i + 3; j++) {
                if (B[j] == "X") {
                    xCells.push(j);
                }
                if (B[j] == "E") {
                    emptyCells.push(j);
                }
            }
            if (xCells.length == 2 && emptyCells.length == 1) {
                criticalDeffenceMove = emptyCells[0];
                return criticalDeffenceMove;
            }
        }

        //check columns
        for (var i = 0; i <= 2; i++) {
            var xCells = [];
            var emptyCells = [];
            for (j = i; j <= i + 6; j = j + 3) {
                if (B[j] == "X") {
                    xCells.push(j);
                }
                if (B[j] == "E") {
                    emptyCells.push(j);
                }
            }
            if (xCells.length == 2 && emptyCells.length == 1) {
                criticalDeffenceMove = emptyCells[0];
                return criticalDeffenceMove;
            }



            // if (B[i] !== "E" && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
            //     result = B[i] + "-won"; //update the state result
            //     return true;
            // }
        }

        //check diagonals
        for (var i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
            var diagonal = [B[i], B[i + j], B[i + 2 * j]];
            var xCells = [];
            var emptyCells = [];
            for (var d = 0; d < diagonal.length; d++) {
                if (diagonal[d] == "X") {
                    xCells.push(d);
                }
                if (diagonal[d] == "E") {
                    emptyCells.push(d);
                }
            }
            if (xCells.length == 2 && emptyCells.length == 1) {
                criticalDeffenceMove = emptyCells[0];
                switch (emptyCells[0]) {
                    case 0:
                        criticalDeffenceMove = i;
                        break;
                    case 1:
                        criticalDeffenceMove = i + j;
                        break;
                    case 2:
                        criticalDeffenceMove = i + 2 * j;
                        break;

                }
                return criticalDeffenceMove;
            }

        }
        return criticalDeffenceMove

    }

}