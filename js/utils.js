'use strict';

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getClassName(location) {
    var cellClass = 'cell-' + location.i + '-' + location.j;
    return cellClass;
}

function shuffle(items) {
    var randIdx, keep, i;
    for (i = items.length - 1; i > 0; i--) {
        randIdx = getRandomInt(0, items.length - 1);
        keep = items[i];
        items[i] = items[randIdx];
        items[randIdx] = keep;
    }
    return items;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

function getRandomColor() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
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


// function restartGame() {
//     gScore = 0;
//     gGeneratedBalls = 2;
//     gInterval = 0;
//     gIntervalGlue = 0;
//     // var elScoreCount = document.querySelector('h2 span');
//     var elRestartBtn = document.querySelector('.restart');
//     elRestartBtn.style.display = 'none';
//     // elScoreCount.innerText = `Congrats! You Collected ${gScore} Balls`;
//     // document.querySelector('h2 span').innerText = `Congrats! You Collected ${gScore} Balls`;
//     initGame();
// }
