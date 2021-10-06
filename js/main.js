'use strict';

const MINE = '💣';

var gBoard;
var gLevel = { size: 4, mines: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gInterval;
var gMinesPos = [];

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
    gBoard = buildBoard(gLevel.size);
    renderBoard(gBoard, '.board-container');
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

function renderBoard(board, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var className = `cell cell${i}-${j}`;
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})">`;
            var cell = board[i][j];
            if (cell.isMine && cell.isShown) className += ` mine`;

            strHTML += `</td>`;
        }

        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

// Beginner (4*4 with 2 MINES)
// Medium (8 * 8 with 12 MINES)
// Expert (12 * 12 with 30 MINES)
function changeLevels(elBtn) {
    switch (elBtn.innerText) {
        case 'Easy':
            gLevel.size = 4;
            gLevel.mines = 2;
            resetGame();
            break;
        case 'Medium':
            gLevel.size = 8;
            gLevel.mines = 12;
            resetGame();
            break;
        case 'Hard':
            gLevel.size = 12;
            gLevel.mines = 30;
            resetGame();
            break;
    }
    initGame();
}

function cellClicked(elCell, i, j) {
    if (!gGame.isOn) return;
    if (gBoard[i][j].isShown) return;

    gGame.shownCount++;
    if (gGame.shownCount === 1) {
        addMines(gBoard, gLevel.mines);
        setMinesNegsCount(gBoard);
        startTimer();
    }

    gBoard[i][j].isShown = true; //model

    //DOM
    if (!gBoard[i][j].isMine) {
        //NOT MINE
        gBoard[i][j].isShown = true;
        if (gBoard[i][j].minesAroundCount === 0) {
            expandShown(gBoard, i, j);
        } else {
            elCell.innerText = gBoard[i][j].minesAroundCount;
        }
        elCell.style.backgroundColor = 'lightblue';
        gGame.shownCount++;
    } else {
        //MINE
        elCell.innerText = MINE;
        elCell.style.backgroundColor = 'red';
    }
}

function resetGame(isWin) {
    if (!gGame.isOn) return;
    clearInterval(gInterval);
    gInterval = null;

    if (!isWin) {
        for (var i = 0; i < gBoard.length; i++) {
            for (var j = 0; j < gBoard[0].length; j++) {
                if (gBoard[i][j].isMine) {
                    var currElCell = document.querySelector(`.cell${i}-${j}`);
                    currElCell.innerText = '💣';
                }
            }
        }
    }
    gGame = {
        isOn: false,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
    };
    
}

function expandShown(board, i, j) {
    var minesNegs = [];
    var cellrowIdx = i;
    var cellColIdx = j;
    for (var i = cellrowIdx - 1; i <= cellrowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue;
        for (var j = cellColIdx - 1; j <= cellColIdx + 1; j++) {
            if (j < 0 || j >= board[i].length) continue;
            if (gBoard[i][j].isMarked || gBoard[i][j].isMine) continue;
            if (i === cellrowIdx && j === cellColIdx) continue;
            if (gBoard[i][j].minesAroundCount === 0 && !gBoard[i][j].isShown) {
                minesNegs.push({ i: i, j: j });
            }
            var currElCell = document.querySelector(`.cell${i}-${j}`);
            if (!gBoard[i][j].isShown) gGame.shownCount++;
            gBoard[i][j].isShown = true;
            currElCell.style.backgroundColor = 'lightblue';
            currElCell.innerText = gBoard[i][j].minesAroundCount === 0 ? '' : gBoard[i][j].minesAroundCount;
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

//implements left:
//function cellMarked(elCell)
//function expandShown(board,elCell,i,j) VVVVVV
