'use strict';

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var minesAroundCounter = countNegs(board, i, j);
            if(minesAroundCounter === 0) board[i][j].minesAroundCount = ''
            else board[i][j].minesAroundCount = minesAroundCounter;
        }
    }
}

function countNegs(board, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine) count++;
        }
    }
    return count;
}

function addMines(board , minesCount ,rowIdx , colIdx) {
    var minesCounter = 0;
    for (var i = 0; i < minesCount; i++) {
        var row = Math.floor(Math.random() * board.length);
        var col = Math.floor(Math.random() * board[0].length);
        if (!board[row][col].isMine && row !== rowIdx && col !== colIdx) {
            board[row][col].isMine = true;
            minesCounter++;
        }
    }
}
