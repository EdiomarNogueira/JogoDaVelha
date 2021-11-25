// Initial Data
let square = {
    a1: '',
    a2: '',
    a3: '',
    b1: '',
    b2: '',
    b3: '',
    c1: '',
    c2: '',
    c3: '',
};
let player = '';
let warning = '';
let playing = false;

reset();
//Events
/*
document.querySelector('.reset').addEventListener('click', reset);
document.querySelector('div[data-item=a1]').addEventListener('click', itemClick);
document.querySelector('div[data-item=a2]').addEventListener('click', itemClick);
document.querySelector('div[data-item=a3]').addEventListener('click', itemClick);

document.querySelector('div[data-item=b1]').addEventListener('click', itemClick);
document.querySelector('div[data-item=b2]').addEventListener('click', itemClick);
document.querySelector('div[data-item=b3]').addEventListener('click', itemClick);

document.querySelector('div[data-item=c1]').addEventListener('click', itemClick);
document.querySelector('div[data-item=c2]').addEventListener('click', itemClick);
document.querySelector('div[data-item=c3]').addEventListener('click', itemClick);
*/
document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('click', itemClick);
});

//Functions
function itemClick(event) {
    let item = event.target.getAttribute('data-item');
    //console.log(item);
    if (playing && square[item] === '') {
        square[item] = player;
        renderSquare();
        togglePlayer();
    }
};

function reset() {
    warning = '';
    let random = Math.floor(Math.random() * 2);
    player = (random === 0) ? 'x' : 'o';
    //if (random === 0) {
    //    player = 'x';
    //} else {
    //    player = 'o';
    //}

    for (let i in square) {
        square[i] = '';
    }

    playing = true;

    renderSquare();
    renderInfo();
}

function renderSquare() {
    for (let i in square) {
        //console.log("ITEM ", i);
        let item = document.querySelector(`div[data-item=${i}]`);
        item.innerHTML = square[i];
        //if (square[i] !== '') {
        //    item.innerHTML = square[i];
        //} else {
        //    item.innerHTML = '';
        //}
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = player;
    document.querySelector('.resultado').innerHTML = warning;
}

function togglePlayer() {
    if (player == 'x') {
        player = 'o';
    } else {
        player = 'x';
    }
    renderInfo();
}

function checkGame() {
    if (checkWinnerFor('x')) {
        warning = 'X - Venceu!';
        player = false;
    } else if (checkWinnerFor('o')) {
        warning = 'O - Venceu!';
        playing = false;
    } else if (isFull()) {
        warning = 'Empate!'
        player = false;
    }

}

function checkWinnerFor(player) {
    let pos = ['a1,a2,a3', 'b1,b2,b3', 'c1,c2,c3', 'a1,b1,c1', 'a2,b2,c2', 'a3,b3,c3', 'a1,b2,c3', 'a3,b2,c1'];

    for (let w in pos) {
        //console.log(pos[w]);
        let pArray = pos[w].split(','); //a1,a2,a3
        let hasWon = pArray.every(option => square[option] === player);

        // pArray.every((option) => {
        //    if (square[option] === player) {
        //         return true;
        //     } else {
        //          return false;
        //      }
        //  });

        if (hasWon) {
            return true;
        }
    }
    return false;

}

function isFull() {
    for (let i in square) {
        if (square[i] === '') {
            return false;
        }
    }
    return true;
}