'use strict';

const MINE = '💣';

var gBoard;
var gLevel = { SIZE: 4, MINES: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };

function initGame() {
    gBoard = buildBoard(4, 4);
    console.table(gBoard);
    renderBoard(gBoard, '.board-container');
}

function buildBoard(rows, cols) {
    // Create the Matrix
    var board = [];

    for (var i = 0; i < rows; i++) {
        board[i] = [];
        for (var j = 0; j < cols; j++) {
            var cell = {
                minesAroundCount: '',
                isShown: true,
                isMine: false,
                isMarked: true,
            };

            // Add created cell to The game board
            board[i][j] = cell;

            if ((i === 1 && j === 2) || (i === 2 && j === 3)) cell.isMine = true;
        }
    }

    return board;
}

// Render the board to an HTML table
function renderBoard(mat, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = `cell cell${i}-${j}`;
            strHTML += `<td class="${className}">`;
            if (cell.isMine) strHTML += MINE;

            strHTML += `</td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elBoard = document.querySelector(selector);
    elBoard.innerHTML = strHTML;
}
