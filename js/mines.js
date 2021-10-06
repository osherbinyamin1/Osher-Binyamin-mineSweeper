'use strict';

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[i].length; j++) {
            var minesAroundCounter = countNegs(board, i, j);
            board[i][j].minesAroundCount = minesAroundCounter;
        }
    }
}

function countNegs(board, rowIdx, colIdx) {
    var negsCount = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue;
            if (i === rowIdx && j === colIdx) continue;
            if (board[i][j].isMine) negsCount++;
        }
    }
    return negsCount;
}

function addMines(board, minesCount) {
    for (var i = 0; i < minesCount; i++) {
        var pos = setMinePos(board);
        gMinesPos.push(pos);
        board[pos.i][pos.j].isMine = !board[pos.i][pos.j].isMine;
    }
    return board;
}

function setMinePos(board) {
    var notMineCells = [];
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (!board[i][j].isMine && !board[i][j].isShown) notMineCells.push({ i: i, j: j });
        }
    }
    var randIdx = getRandomInt(0, notMineCells.length - 1);
    var randPos = notMineCells[randIdx];
    return randPos;
}