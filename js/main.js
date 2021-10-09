'use strict';

const MINE = '💣';
const FLAG = '🏴';
const HEART = '😍';

var gBoard;
var gLevel = { size: 4, mines: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gMines = gLevel.mines;
var gMinesPos = [];
var gInterval;

var gElHeart1 = document.querySelector('.heart1');
var gElHeart2 = document.querySelector('.heart2');
var gElHeart3 = document.querySelector('.heart3');
var gHeader2 = document.querySelector('h2');
var gSmiley = document.querySelector('.smiley');
var gElMines = document.querySelector('.mines');
const gElBoard = document.querySelector('.board-container');

function initGame() {
    clearInterval(gInterval);
    gInterval = null;
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        minsPassed: 0,
    };
    gGame.isOn = true;
    gHeader2.innerText = 'LET\'S PLAY IN THE BATTLEFIELD';
    gElHeart1.innerText = (gLevel.size === 4) ? '' : HEART;
    gElHeart2.innerText = HEART;
    gElHeart3.innerText = (gLevel.size === 4) ? '' : HEART;
    gMines = gLevel.mines;
    gBoard = buildBoard(gLevel.size);
    renderBoard(gBoard, '.board-container');
    gSmiley.innerText = '😄';
}

function buildBoard(levelSize) {
    var board = [];
    for (var i = 0; i < levelSize; i++) {
        board.push([]);
        for (var j = 0; j < levelSize; j++) {
            board[i][j] = {
                minesAroundCount: '',
                isShown: false,
                isMine: false,
                isMarked: false,
            };
        }
    }
    return board;
}

// Beginner (4*4 with 2 MINES)
// Medium (8 * 8 with 12 MINES)
// Expert (12 * 12 with 30 MINES)
function changeLevels(elBtn) {
    switch (elBtn.innerText) {
        case 'Easy':
            gLevel.size = 4;
            gLevel.mines = 2;
            break;
        case 'Medium':
            gLevel.size = 8;
            gLevel.mines = 12;
            break;
        case 'Hard':
            gLevel.size = 12;
            gLevel.mines = 30;
            break;
    }
    initGame();
}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown || gBoard[i][j].isMarked) return;

    gGame.shownCount++;
    if (gGame.shownCount === 1) {
        addMines(gBoard, gLevel.mines);
        setMinesNegsCount(gBoard);
        startTimer();
    }
    gBoard[i][j].isShown = true;

    if (!gBoard[i][j].isMine) {
        gBoard[i][j].isShown = true;
        if (gBoard[i][j].minesAroundCount === 0) expandShown(gBoard, i, j);
        else elCell.innerText = gBoard[i][j].minesAroundCount;

        elCell.style.backgroundColor = 'lightblue';
        if (checkGameOver()) resetGame(true);
    } else {
        gBoard[i][j].isShown = true;
        elCell.innerText = MINE;
        elCell.style.backgroundColor = 'red';
        lifeDecreaser(elCell);
    }
}

function resetGame(isItWin) {
    if (!gGame.isOn) return;

    if (!isItWin) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].isMine) {
                    var currElCell = document.querySelector(`.cell${i}-${j}`);
                    currElCell.innerText = MINE;
                }
            }
        }
    }

    gHeader2.innerText = isItWin ? 'Congrats Champ' : 'Game over, try again';
    gSmiley.innerText = isItWin ? '😎' : '🤯';
    

    //Define new game
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
    };

    //stop the timer 
    clearInterval(gInterval);
    gInterval = null;
}

function expandShown(board, i, j) {
    var minesNegs = [];
    var cellrowIdx = i;
    var cellColIdx = j;
    for (var i = cellrowIdx - 1; i <= cellrowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellColIdx - 1; j <= cellColIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (i === cellrowIdx && j === cellColIdx) continue;
            if (gBoard[i][j].isMarked || gBoard[i][j].isMine) continue;
            if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
                minesNegs.push({ i: i, j: j });
            }
            var currElCell = document.querySelector(`.cell${i}-${j}`);
            if (!gBoard[i][j].isShown) {
                gGame.shownCount++;
                gBoard[i][j].isShown = true;
                currElCell.style.backgroundColor = 'lightblue';
                currElCell.innerText = gBoard[i][j].minesAroundCount === 0 ? '' : gBoard[i][j].minesAroundCount;
            }
        }
    }
    if (!minesNegs.length) return;
    for (var i = 0; i < minesNegs.length; i++) {
        var cellI = minesNegs[i].i;
        var cellJ = minesNegs[i].j;
        var currElCell = document.querySelector(`.cell${cellI}-${cellJ}`);
        expandShown(gBoard, currElCell, cellI, cellJ);
    }
}

function cellMarked(elCell, i, j) {
    if (gBoard[i][j].isShown) return;
    if (gMines === 0) return;

    if (!gBoard[i][j].isMarked) {
        gBoard[i][j].isMarked = true; 
        elCell.innerText = FLAG; 
        gMines--;
        
        if (gMines < 0) gMines = 0;
        gElMines.innerText = `${gMines}${FLAG} `;

        if (gBoard[i][j].isMine) {
            gGame.markedCount++;
            gBoard.isShown = true;
        }
        

    } else {
        if (gBoard[i][j].isMine) gGame.markedCount--;

        gBoard[i][j].isMarked = false;
        elCell.innerText = ''; 
        gMines++;

        if (gMines > gLevel.mines) gMines = gLevel.mines;
        gElMines.innerText = `${gMines}${FLAG}`;

    }
    if (checkGameOver()) resetGame(true);
}

function lifeDecreaser() {
    if (gElHeart1.innerText === HEART) {
        gElHeart1.innerText = ' ';
        return;
    }

    if (gElHeart2.innerText === HEART) {
        gElHeart2.innerText = ' ';
        return;
    }

    if (gElHeart3.innerText === HEART) {
        gElHeart3.innerText = ' ';
    } else {
        resetGame(false);
    }
}

function checkGameOver() {
    if (gGame.shownCount === (gLevel.size * gLevel.size) - gLevel.mines && gGame.markedCount === gLevel.mines) return true;
    else return false;
}
