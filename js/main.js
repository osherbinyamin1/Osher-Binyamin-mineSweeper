'use strict';

const MINE = '💣';

var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var gInterval;

function initGame() {
    gBoard = buildBoard(4, 4);
    console.table(gBoard);

    renderBoard(gBoard, '.board-container');
}

function buildBoard(rows, cols) {
    // Create the Matrix
    var board = [];
    for (var i = 0; i < rows; i++) {
        board.push([]);
        for (var j = 0; j < cols; j++) {
            board[i][j] = {
                minesAroundCount: '',
                isShown: false,
                isMine: false,
                isMarked: true,
            };
        }
    }
    return board;
}

function renderBoard(board, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            // var cell = board[i][j];
            var className = `cell cell${i}-${j}`;
            strHTML += `<td class="${className}" onclick="cellClicked(this, ${i}, ${j})"></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function cellClicked(elCell, i, j) {
    if (gBoard[i][j].isShown) return;
    gGame.shownCount++
    if(gGame.shownCount === 1) {
        startTimer()
        addMines(gBoard , gLevel.MINES ,i , j)
        setMinesNegsCount(gBoard);
    }
    
    gBoard[i][j].isShown = true; //model

    //DOM
    if (gBoard[i][j].isMine) elCell.innerText = '💣';
    else elCell.innerText = gBoard[i][j].minesAroundCount;
}

function startTimer() {
    var elTimer = document.querySelector('.timer');
    var startTime  = Date.now();
    
    gInterval = setInterval(function() {
        var time = new Date()
        var timeDiff = time - startTime
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000)

        minutes = (minutes < 10) ? '0' + minutes : minutes
        seconds = (seconds < 10) ? '0' + seconds : seconds
        
        elTimer.innerText = `Time: ${minutes}:${seconds}` }
        ,1)
}

//implements left:
//function cellMarked(elCell)
//function expandShown(board,elCell,i,j)