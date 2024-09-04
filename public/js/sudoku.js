const socket = io();
const sudokuTitle = document.querySelector('#sudoku-title');
sudokuTitle.querySelector('#difficulty').innerHTML = (document.querySelector('title').innerHTML).split(' ')[0];
let pauseButton = $('#pause');
const cover = $('#cover');
let isRunning = false;
const time = sudokuTitle.querySelector('#timer');
const grid = $('#grid');
const elements = document.querySelectorAll('.grid-element');
let isMouseDown = false;
let isShiftDown = false;
let isControlDown = false;
let isAdding = true;
let selected = [];
let highlightedDigit = 0;
const candidates = [
    ` <div class=" d-flex position-absolute candidate candidate-1">1</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-2">2</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-3">3</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-4">4</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-5">5</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-6">6</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-7">7</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-8">8</div>`,
    ` <div class=" d-flex position-absolute candidate candidate-9">9</div>`,
];
const colors = {
    'green': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color green"></div>',
    'yellow': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color yellow"></div>',
    'purple': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color purple"></div>',
    'pink': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color pink"></div>',
    'orange': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color orange"></div>',
    'red': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color red"></div>',
    'blue': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color blue"></div>',
    'light-blue': ' <div class="p-2 d-flex position-absolute justify-content-center align-items-center color light-blue"></div>',
}
const journal = [];
let journalCount = 0;
const controls = document.querySelector('#controls');
const solutionControls = document.querySelector('#solution');
const candidateControls = document.querySelector('#candidate');
const highlightControls = document.querySelector('#highlight');
const colorCandidates = document.querySelector('#color');


let interval;
const updateTimerInterval = () => {
    const splitted = time.innerHTML.split(':');
    let minutes = Number(splitted[0]);
    let seconds = splitted[1];

    seconds++;
    if(seconds == 60) {
        seconds = 0;
        minutes++;
    }
    

    time.innerHTML = (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds;
}
const pauseButtonFunction = () => {
    if(isRunning) {
        clearInterval(interval);
        pauseButton.html('►');
        cover.removeClass('d-none').addClass('d-flex');
    } else {
        interval = setInterval(updateTimerInterval, 1000);
        pauseButton.html('II');
        cover.removeClass('d-flex').addClass('d-none');
    }

    isRunning = !isRunning;
    socket.emit('pause', isRunning);
}

socket.on('connect', () => {
    const splitted = window.location.href.split('/');
    const sudoku = splitted[splitted.length-1];
    pauseButtonFunction();
    $('#loading').removeClass('d-flex').addClass('d-none');
    socket.emit('startGame', {
        'difficulty': (document.querySelector('title').innerHTML).split(' ')[0],
        'sudoku': sudoku,
        'token': token
    });
})

socket.on('win', (data) => {
    pauseButtonFunction();
    pauseButton.off();
    pauseButton = null;
    const minutes = Math.floor(data.time / 60);
    const seconds = data.time % 60;
    const totalTime = (minutes < 10 ? '0':'') + minutes + ':' + (seconds < 10 ? '0':'') + seconds;
    grid.addClass('overflow-hidden');
    cover.html(`
            <div class="container">
                <div class="row fs-1 d-flex justify-content-center">
                    Sudoku solved
                </div>
                <div class="row border border-secondary my-5">

                </div>
                <div class="row">
                    <div class="col-6 d-flex">Difficulty: </div>
                    <div class="col-6 d-flex justify-content-end">${data.difficulty}</div>
                </div>
                <div class="row">
                    <div class="col-6 d-flex">Time elapsed: </div>
                    <div class="col-6 d-flex justify-content-end">${totalTime}</div>
                </div>
                <div class="row">
                    <div class="col-6 d-flex">Score: </div>
                    <div class="col-6 d-flex justify-content-end">${data.score}</div>
                </div>
                <div class="row">
                    <div class="col-6 d-flex">${data.total ? `Total points: `: ''}</div>
                    <div class="col-6 d-flex justify-content-end">${data.total ? data.total: ''}</div>
                </div>
            </div>
        `)
    socket.removeAllListeners();
    socket.disconnect();
})

socket.on('disconnect', () => {
    window.location.reload();
})


const saveSnapshot = () => {
    const currentSnapshot = Array.from(elements).map(el => el.innerHTML + el.className).join('');
    if (journalCount > 0) {
        const lastSnapshot = journal[journalCount - 1].grid.map(el => el.innerHTML + el.className).join('');
        if (currentSnapshot === lastSnapshot) return;
    }
    journal[journalCount++] = {
        'grid': Array.from(elements).map(el => ({innerHTML: el.innerHTML, className: el.className})),
        'selected': selected.slice()
    };
    journal.splice(journalCount);
    
    $(controls.querySelector('#backward')).removeClass('text-secondary').addClass('text-light');
    $(controls.querySelector('#forward')).removeClass('text-light').addClass('text-secondary');
    
};

const restoreSnapshot = (snapshot) => {
    if (!snapshot) return;
    snapshot.grid.forEach((el, i) => {
        elements[i].innerHTML = el.innerHTML;
        elements[i].className = el.className;
    });
    selected = snapshot.selected;
    console.log(journalCount);
    
    if(journalCount == 0) {
        $(controls.querySelector('#backward')).removeClass('text-light').addClass('text-secondary');
    }
    if(journalCount == journal.length-1) {
        $(controls.querySelector('#forward')).removeClass('text-light').addClass('text-secondary');
    }
    if(journalCount != journal.length-1) {
        $(controls.querySelector('#forward')).removeClass('text-secondary').addClass('text-light');
    }
    if(journalCount != 0) {
        $(controls.querySelector('#backward')).removeClass('text-secondary').addClass('text-light');
    }
};


pauseButton.click(pauseButtonFunction);

$(document).on('keydown', (event) => {
    if(event.keyCode == 80) {
        pauseButtonFunction();
    }
    if(!isRunning) return;
    switch(event.keyCode) {
        case 8: // backspace
            saveSnapshot();
            removeSolution();
            break;
        case 16:
            isShiftDown = true;
            break;
        case 17:
            isControlDown = true;
            break;
        case 37: //left key
            selectLeftBox();
            break;
        case 38: //up key
            event.preventDefault();
            selectUpBox();
            break;
        case 39: //right key
            selectRightBox();
            break;
        case 40: //down key
            event.preventDefault();
            selectDownBox();
            break;
        case 49:
        case 50:
        case 51:
        case 52:
        case 53:
        case 54:
        case 55:
        case 56:
        case 57:
            if(isControlDown) {
                highlightDigit(event.keyCode - 48);
                break;
            }
            saveSnapshot();
            if(isShiftDown) {
                insertCandidates(event.keyCode - 48);
            } 
            else {
                insertSolution(event.keyCode - 48);
                
            }
            break;
        case 65:
            addAllSelectedClasses();
            break;
        case 90:
            !isShiftDown && undo();
            isShiftDown && redo();
            break;
        case 222:
            saveSnapshot();
            insertCandidates(2);
            break;
        case 191:
            saveSnapshot();
            insertCandidates(7);
            break;
    }
})
$(document).on('keyup', (event) => {
    switch(event.keyCode) {
        case 16:
            isShiftDown = false;
            break;
        case 17:
            isControlDown = false;
            break;
    }
})

$(document).on('mousedown', (event) => {
    if(event.target.id == 'outside-container') {
        removeAllSelectedClasses();
        removeAllHighLight();
    }
})

grid.on('mousedown', (event) => {
    if(!isRunning) return;
    isMouseDown = true;
    if(!$(event.target).hasClass('grid-element')) {
        return;
    }
    if(selected.includes(event.target)) {
        if(isShiftDown) {
            removeSelectedClass(event.target);
            isAdding = false;
            return;
        }
    }
    if(selected.length == 1 && selected[0] == event.target) {
        removeSelectedClass(event.target);
        return;
    }
    if(!isShiftDown) {
        removeAllSelectedClasses();
    }
    isAdding = true;
    switch(event.target.innerHTML[0]) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if(!isShiftDown) {
                highlightDigit(event.target.innerHTML[0]);
            }
            break;
    }
    addSelectedClass(event.target);
    if(selected.length == 1) {
        highlightNeighbors();
    }
    if(selected.length > 1) removeAllNeighbors();
});

$(document).on('mouseup', () => {
    isMouseDown = false;
})

$(document).on('mousemove', (event) => {
    if(isMouseDown) {
        if($(event.target).hasClass('grid-element')) {
            if(isAdding) {
                addSelectedClass(event.target);
            }
            else {
                removeSelectedClass(event.target);
            }
            if(selected.length == 2) {
                removeAllNeighbors();
            }
        }
    }
})

const getIndex = (element) => {
    let i;
    for(i = 0; i < 81; i++) {
        if(element == elements[i]) return i;
    }
    return -1;
}

const getLeft = (index, pacman) => {
    switch(index) {
        case 0:
        case 3:
        case 6:
        case 27:
        case 30:
        case 33:
        case 54:
        case 57:
        case 60:
            return pacman ? elements[index+20] : null;
        case 9:
        case 12:
        case 15:
        case 36:
        case 39:
        case 42:
        case 63:
        case 66:
        case 69:
        case 18:
        case 21:
        case 24:
        case 45:
        case 48:
        case 51:
        case 72:
        case 75:
        case 78:
            return elements[index-7];
        default:
            return elements[index-1];
        
    }
}
const getRight = (index, pacman) => {
    switch(index) {
        case 20:
        case 23:
        case 26:
        case 47:
        case 50:
        case 53:
        case 74:
        case 77:
        case 80:
            return pacman ? elements[index-20] : null;
        case 2:
        case 5:
        case 8:
        case 29:
        case 32:
        case 35:
        case 56:
        case 59:
        case 62:
        case 11:
        case 14:
        case 17:
        case 38:
        case 41:
        case 44:
        case 65:
        case 68:
        case 71:
            return elements[index+7];
        default:
            return elements[index+1];
        
    }
}
const getAbove = (index, pacman) => {
    switch(index) {
        case 0:
        case 1:
        case 2:
        case 9:
        case 10:
        case 11:
        case 18:
        case 19:
        case 20:
            return pacman ? elements[index+60] : null;
        case 27:
        case 28:
        case 29:
        case 36:
        case 37:
        case 38:
        case 45:
        case 46:
        case 47:
        case 54:
        case 55:
        case 56:
        case 63:
        case 64:
        case 65:
        case 72:
        case 73:
        case 74:
            return elements[index-21];
        default:
            return elements[index-3];
    }
}
const getBelow = (index, pacman) => {
    switch(index) {
        case 60:
        case 61:
        case 62:
        case 69:
        case 70:
        case 71:
        case 78:
        case 79:
        case 80:
            return pacman ? elements[index-60] : null;
        case 6:
        case 7:
        case 8:
        case 15:
        case 16:
        case 17:
        case 24:
        case 25:
        case 26:
        case 33:
        case 34:
        case 35:
        case 42:
        case 43:
        case 44:
        case 51:
        case 52:
        case 53:
            return elements[index+21];
        default:
            return elements[index+3];
    }
}
const getEntireBox = (index) => {
    let box = Math.floor(index / 9);
    let ret = [];
    for(let i = 0; i < 9; i++) {
        ret.push(elements[(box * 9) + i]);
    }
    return ret;
}
const getEntireRow = (index) => {
    let ret = [elements[index]];
    let left;
    let right;
    let tmp_index = index;
    while(left = getLeft(tmp_index)) {
        ret.push(left);
        tmp_index = getIndex(left);
    }
    tmp_index = index;
    while(right = getRight(tmp_index)) {
        ret.push(right);
        tmp_index = getIndex(right);
    }
    return ret;
}
const getEntireColumn = (index) => {
    let ret = [elements[index]];
    let up;
    let down;
    let tmp_index = index;
    while(up = getAbove(tmp_index)) {
        ret.push(up);
        tmp_index = getIndex(up);
    }
    tmp_index = index;
    while(down = getBelow(tmp_index)) {
        ret.push(down);
        tmp_index = getIndex(down);
    }
    return ret;
}

const addAllSelectedClasses = () => {
    for(let i = 0; i < elements.length; i++) {
        addSelectedClass(elements[i]);
    }
}

const removeAllSelectedClasses = () => {
    let tmp = selected.slice();
    for(let i = 0; i < tmp.length; i++) {
        removeSelectedClass(tmp[i]);
    }
}

const removeSelectedClass = (element) => {
    const keys = Object.keys(elements);
    let i;
    for(i = 0; i < keys.length; i++) {
        if(elements[keys[i]] == element) break;
    }

    selected = selected.filter(select => select != element);

    $(element).removeClass('selected');
    $(element).removeClass('selected-left');
    $(element).removeClass('selected-right');
    $(element).removeClass('selected-above');
    $(element).removeClass('selected-below');

    const left = getLeft(i);
    const right = getRight(i);
    const above = getAbove(i);
    const below = getBelow(i);

    if(left) {
        $(left).removeClass('selected-right');
    }
    if(right) {
        $(right).removeClass('selected-left');
    }
    if(above) {
        $(above).removeClass('selected-below');
    }
    if(below) {
        $(below).removeClass('selected-above');
    }
}

const addSelectedClass = (element) => {
    const keys = Object.keys(elements);
    let i;
    for(i = 0; i < 81; i++) {
        if(elements[keys[i]] == element) {
            break;
        }
    }
    if(!selected.includes(element)) {
        selected.push(element);
    }
    if(!$(element).hasClass('selected')) {
        $(element).addClass('selected');
    }
    const left = getLeft(i);
    const right = getRight(i);
    const above = getAbove(i);
    const below = getBelow(i);
    
    if(left) {
        if($(left).hasClass('selected')) {
            $(element).addClass('selected-left');
            $(left).addClass('selected-right');
        }
    }
    if(right) {
        if($(right).hasClass('selected')) {
            $(element).addClass('selected-right');
            $(right).addClass('selected-left');
        }
    }
    if(above) {
        if($(above).hasClass('selected')) {
            $(element).addClass('selected-above');
            $(above).addClass('selected-below');
        }
    }
    if(below) {
        if($(below).hasClass('selected')) {
            $(element).addClass('selected-below');
            $(below).addClass('selected-above');
        }
    }
}

const selectLeftBox = () => {
    const currentBox = selected.length > 0 ? selected[selected.length-1] : elements[40];
    $(currentBox).removeClass('highlight');
    let index = getIndex(currentBox);
    const left = getLeft(index, true);
    left.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
    left.dispatchEvent(new MouseEvent('mouseup'), {
        bubbles: true,
        cancelable: true,
        view: window
    });
}
const selectRightBox = () => {
    const currentBox = selected.length > 0 ? selected[selected.length-1] : elements[40];
    $(currentBox).removeClass('highlight');
    let index = getIndex(currentBox);
    const right = getRight(index, true);
    right.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
    right.dispatchEvent(new MouseEvent('mouseup'), {
        bubbles: true,
        cancelable: true,
        view: window
    });
}
const selectUpBox = () => {
    const currentBox = selected.length > 0 ? selected[selected.length-1] : elements[40];
    $(currentBox).removeClass('highlight');
    let index = getIndex(currentBox);
    const up = getAbove(index, true);
    up.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
    up.dispatchEvent(new MouseEvent('mouseup'), {
        bubbles: true,
        cancelable: true,
        view: window
    });
}
const selectDownBox = () => {
    const currentBox = selected.length > 0 ? selected[selected.length-1] : elements[40];
    $(currentBox).removeClass('highlight');
    let index = getIndex(currentBox);
    const down = getBelow(index, true);
    down.dispatchEvent(new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
    }));
    down.dispatchEvent(new MouseEvent('mouseup'), {
        bubbles: true,
        cancelable: true,
        view: window
    });
}

$(controls).click((event) => {
    if(!isRunning) return
    
    switch(event.target.id) {
        case 'erase':
            saveSnapshot();
            removeSolution();
            break;
        case 'backward':
            undo();
            break;
        case 'forward':
            redo();
            break;
    }

})
$(solutionControls).click((event) => {
    if(!isRunning) return;
    switch(event.target.innerHTML) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            saveSnapshot();
            insertSolution(event.target.innerHTML);
            break;
        default:
            break;
    }
})
$(candidateControls).click((event) => {
    if(!isRunning) return;
    if(!$(event.target).hasClass('hover-opaque')) {
        return;
    }
    const digit = (event.target).querySelector('.candidate').innerHTML
    switch(digit) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            saveSnapshot();
            insertCandidates(digit);
            break;
        default:
            return;
    }
    
})
$(highlightControls).click((event) => {
    if(!isRunning) return;
    switch(event.target.innerHTML) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            highlightDigit(event.target.innerHTML);
            break;
        default:
            break;
    }
})
$(colorCandidates).click((event) => {
    if(!isRunning) return;
    if(!$(event.target).hasClass('position-absolute')) return;
    saveSnapshot();
    if(event.target.innerHTML == 'X') {
        removeColor();
        return;
    }
    if($(event.target).hasClass('green')) {
        addColor('green');
        return;
    }
    if($(event.target).hasClass('yellow')) {
        addColor('yellow');
        return;
    }
    if($(event.target).hasClass('purple')) {
        addColor('purple');
        return;
    }
    if($(event.target).hasClass('pink')) {
        addColor('pink');
        return;
    }
    if($(event.target).hasClass('orange')) {
        addColor('orange');
        return;
    }
    if($(event.target).hasClass('red')) {
        addColor('red');
        return;
    }
    if($(event.target).hasClass('blue')) {
        addColor('blue');
        return;
    }
    if($(event.target).hasClass('light-blue')) {
        addColor('light-blue');
        return;
    }
    
})

const insertSolution = (digit) => {
    if(selected.length == 0) {
        return;
    } 
    if(selected.length > 1) {
        insertCandidates(digit);
        return;
    }
    if($(selected[0]).hasClass('correct-solution')) {
        return;
    }
    if($(selected[0]).hasClass('solution') && selected[0].innerHTML == digit) {
        removeSolution();
        return;
    }

    if(!selected[0].innerHTML.includes('&nbsp;')) {
        const color = selected[0].querySelector('.color');
        selected[0].innerHTML = digit;
        if(color) {
            selected[0].appendChild(color);
        }
    }
    else {
        selected[0].innerHTML = digit;
    }
    $(selected[0]).addClass('solution');
    removeCandidatesAround();
    highlightDigit(digit, true);
    highlightNeighbors();
    checkForErrors();
    checkForWin();
}
const removeSolution = () => {
    if(selected.length == 0) {
        return;
    }
    
    for(let i = 0; i < selected.length; i++) {
        if(!$(selected[i]).hasClass('correct-solution')) {
            $(selected[i]).removeClass('solution');
            $(selected[i]).removeClass('highlight');
            const color = selected[i].querySelector('.color');
            selected[i].innerHTML = '&nbsp;'
            if(color) {
                selected[i].appendChild(color);
            }
        }
    }

    checkAllError();
}

const insertCandidates = (digit) => {
    
    if(selected.length == 0) {
        return;
    }
    if(selected.length == 1 && $(selected[0]).hasClass('solution')) {
        removeSolution();
        insertCandidates(digit);
        return;
    }
    
    let count = 0;
    for(let i = 0; i < selected.length; i++) {
        if($(selected[i]).hasClass('correct-solution')) continue;
        if($(selected[i]).hasClass('solution')) continue;
        if($(selected[i]).find(`.candidate-${digit}`).length > 0) continue;

        if(selected[i].innerHTML == '&nbsp;') {
            selected[i].innerHTML = candidates[digit-1];
        } else {
            selected[i].innerHTML += candidates[digit-1];
        }
        count++;
        
    }
    if(count == 0) {
        for(let i = 0; i < selected.length; i++) {
            const candidateToRemove = ($(selected[i])).find(`.candidate-${digit}`)[0];
            if(candidateToRemove && candidateToRemove.remove());
        }
    }
    if(highlightedDigit == digit) {
        highlightCandidates(digit);
    }
}

const removeCandidatesAround = () => {
    if(selected.length != 1) return;
    
    const index = getIndex(selected[0]);
    const box = getEntireBox(index);
    const row = getEntireRow(index);
    const column = getEntireColumn(index);
    const digit = selected[0].innerHTML[0];


    
    for(let i = 0; i < box.length; i++) {
        const candidate = box[i].querySelector(`.candidate-${digit}`);
        if(candidate) {
            candidate.remove();
        }
    }
    for(let i = 0; i < row.length; i++) {
        const candidate = row[i].querySelector(`.candidate-${digit}`);
        if(candidate) {
            candidate.remove();
        }
    }
    for(let i = 0; i < column.length; i++) {
        const candidate = column[i].querySelector(`.candidate-${digit}`);
        if(candidate) {
            candidate.remove();
        }
    }

}

const highlightNeighbors = () => {
    removeAllNeighbors();
    let i;
    for(i = 0; i < 81; i++) {
        if(elements[i] == selected[0]) {break;}
    }
    let entireBox = getEntireBox(i);
    let entireRow = getEntireRow(i);
    let entireColumn = getEntireColumn(i);
    for(let i = 0; i < 9; i++) {
        if($(entireBox[i]).hasClass('highlight')) continue;
        if($(entireBox[i]).hasClass('neighbor')) continue;
        $(entireBox[i]).addClass('neighbor');
    }
    for(let i = 0; i < 9; i++) {
        if($(entireRow[i]).hasClass('highlight')) continue;
        if($(entireRow[i]).hasClass('neighbor')) continue;
        $(entireRow[i]).addClass('neighbor');
    }
    for(let i = 0; i < 9; i++) {
        if($(entireColumn[i]).hasClass('highlight')) continue;
        if($(entireColumn[i]).hasClass('neighbor')) continue;
        $(entireColumn[i]).addClass('neighbor');
    }
}

const highlightDigit = (digit, flag) => {
    removeAllHighLight();
    if(!flag) removeAllSelectedClasses();
    highlightedDigit = digit;
    for(let i = 0; i < 81; i++) {
        if(elements[i].innerHTML[0] == digit) {
            $(elements[i]).addClass('highlight');
        }
    }
    highlightCandidates(digit);
}
const highlightCandidates = (digit) => {
    const candidates = grid.find(`.candidate-${digit}`);
    
    for(let i = 0; i < candidates.length; i++) {
        $(candidates[i]).addClass('highlight');
    }
}
const removeAllHighLight = () => {
    highlightedDigit = 0;
    const highlighted = grid.find('.highlight');
    for(let i = 0; i < highlighted.length; i++) {
        $(highlighted[i]).removeClass('highlight');
    }
    removeAllNeighbors();
}

const removeAllNeighbors = () => {
    const neighbors = grid.find('.neighbor');
    for(let i = 0; i < neighbors.length; i++) {
        $(neighbors[i]).removeClass('neighbor');
    }
}

const addColor = (color) => {
    if(selected.length == 0) {
        return;
    }
    removeColor();
    for(let i = 0; i < selected.length; i++) {
        if(selected[i].innerHTML == '&nbsp;') {
            selected[i].innerHTML = colors[color];
            continue
        }
        selected[i].innerHTML += colors[color];
    }
    
}

const removeColor = () => {
    if(selected.length == 0) {
        return;
    }
    for(let i = 0; i < selected.length; i++) {
        const colorDiv = selected[i].querySelector('.color');
        if(colorDiv && colorDiv.remove());
    }
}

const removeAllColor = () => {
    const greens = grid.find('.green');
    for(let i = 0; i < greens.length; i++) {
        $(greens[i]).removeClass('green');
    }
    const yellows = grid.find('.yellow');
    for(let i = 0; i < greens.length; i++) {
        $(yellows[i]).removeClass('yellow');
    }
    const purples = grid.find('.purple');
    for(let i = 0; i < purples.length; i++) {
        $(purples[i]).removeClass('purple');
    }
    const pinks = grid.find('.pink');
    for(let i = 0; i < pinks.length; i++) {
        $(pinks[i]).removeClass('pink');
    }
    const oranges = grid.find('.orange');
    for(let i = 0; i < oranges.length; i++) {
        $(oranges[i]).removeClass('orange');
    }
    const reds = grid.find('.red');
    for(let i = 0; i < reds.length; i++) {
        $(reds[i]).removeClass('red');
    }
    const blues = grid.find('.blue');
    for(let i = 0; i < blues.length; i++) {
        $(blues[i]).removeClass('blue');
    }
    const lightBlues = grid.find('.light-blue');
    for(let i = 0; i < lightBlues.length; i++) {
        $(lightBlues[i]).removeClass('light-blue');
    }
}

const checkAllError = () => {
    removeAllErrors();
    
    for(let i = 0; i < 81; i++) {
        checkForErrors(elements[i]);
    }
}

const checkForErrors = (element) => {
    const elem = element ? element : selected[0];
    if($(elem).hasClass('correct-solution')) return;
    if(!$(elem).hasClass('solution')) return;
    const index = getIndex(elem);
    const digit = elem.innerHTML[0];
    const entireBox = getEntireBox(index);
    const row = getEntireRow(index);
    const column = getEntireColumn(index);

    
    for(let i = 0; i < entireBox.length; i++) {
        if(entireBox[i].innerHTML[0] != digit) continue;
        $(entireBox[i]).removeClass('error');
    }
    for(let i = 0; i < row.length; i++) {
        if(row[i].innerHTML[0] != digit) continue;
        $(row[i]).removeClass('error');
    }
    for(let i = 0; i < column.length; i++) {
        if(column[i].innerHTML[0] != digit) continue;
        $(column[i]).removeClass('error');
    }

    let count = 0;
    for(let i = 0; i < entireBox.length; i++) {
        if(entireBox[i] == elem) continue;
        if(entireBox[i].innerHTML[0] == digit) {
            $(entireBox[i]).addClass('error');
            count++;
        }
    }
    for(let i = 0; i < row.length; i++) {
        if(row[i] == elem) continue;
        if(row[i].innerHTML[0] == digit) {
            $(row[i]).addClass('error');
            count++;
        }
    }
    for(let i = 0; i < column.length; i++) {
        if(column[i] == elem) continue;
        if(column[i].innerHTML[0] == digit) {
            $(column[i]).addClass('error');
            count++;
        }
    }
    
    if(count > 0) {
        $(elem).addClass('error');
    }
    
}

const removeAllErrors = () => {
    const errors = grid.find('.error');
    for(let i = 0; i < errors.length; i++) {
        $(errors[i]).removeClass('error');
    }
}

const checkForWin = () => {
    if($(grid).find('.error').length > 0) return;
    
    const correctSolution = grid.find('.correct-solution');
    const solution = grid.find('.solution');
    if(correctSolution.length + solution.length == 81) {
        let sudoku = '';

        const offsets = [0, 27, 54];
        for (const offset of offsets) {
            for(let i = 0; i < 3; i++) {
                for(let k = 0; k < 3; k++) {
                    for(let j = 0; j < 3; j++) {
                        sudoku += elements[offset + i*3 + k*9 + j].innerHTML
                    }
                }
            }
        }

        socket.emit('checkWin', sudoku);
    }
}

const undo = () => {
    if(journalCount == 0) return;

    if(journalCount == journal.length) {
        saveSnapshot();
        journalCount--;
    }
    
    let snapshot = journal[--journalCount];
    restoreSnapshot(snapshot);
}

const redo = () => {
    if (journalCount == journal.length-1) return;
    
    let snapshot = journal[++journalCount];
    restoreSnapshot(snapshot);
};

