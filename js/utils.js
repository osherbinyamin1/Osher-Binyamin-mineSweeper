'use strict';

function renderBoard(board, selector) {
    var strHTML = '<table class ="game-table" border="1"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board.length; j++) {
            var className = `cell cell${i}-${j}`;
            strHTML += `<td class="${className}" onclick="cellClicked(this,${i},${j},event)" oncontextmenu = "cellMarked(this, ${i},${j})")></td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    gElMines.innerText = `${gMines}${FLAG}`;

    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
    
    
    gElBoard.addEventListener('contextmenu', (event) => {
        event.preventDefault();}); //prevent right click
    
}

function startTimer() {
    var elTimer = document.querySelector('.timer');
    var startTime = Date.now();

    gInterval = setInterval(function () {
        var time = new Date();
        var timeDiff = time - startTime;
        var minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        elTimer.innerText = `Time: ${++gGame.secsPassed}`;
    }, 1000);
}

function getRandomInt(min, max) { //minimum and maximum inclusive
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// location such as: {i: 2, j: 7}
// function renderCell(location, value) {
//     // Select the elCell and set the value
//     var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
//     elCell.innerHTML = value;
// }
