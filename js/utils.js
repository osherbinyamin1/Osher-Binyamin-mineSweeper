function printMat(mat, selector) {
    var strHTML = '<table class ="table" border="1"><tbody>';
    for (var i = 0; i < mat.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < mat[0].length; j++) {
            var cell = mat[i][j];
            var className = `cell cell${i} - ${j}`;
            if (cell.isMarked) className += ` mark-cell`;
            strHTML += `<td class="${className}" onclick="markCell(this,${i},${j})">${cell.name}</td>`;
        }
        strHTML += '</tr>';
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}


function setMinesNegsCount(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        // not outside mat
        if (i < 0 || i > mat.length) continue;
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            // not on selected pos
            if (i === rowIdx && j === colIdx) continue;
            // not outside mat
            if (j < 0 || j > mat[0].length) continue;
            
            if (mat[i][j].isMine) count++;
        }
    }
    return count
}


function createMat(ROWS, COLS) {
    var mat = [];
    for (var i = 0; i < ROWS; i++) {
        mat[i] = [];
        for (var j = 0; j < COLS; j++) {
            mat[i][j] = {
                minesAroundCount: 4,
                isShown: true,
            };
        }
    }
    return mat;
}

// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
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

