// I've had no luck implementing the logic in javascript that works fine in dotnet.
// This script not in use.

const gameBoard = 'FOXFFEGLHNDADEBW'.toLowerCase();
const visited = Array(4).fill().map(() => Array(4).fill(false));
const grid = Array(4).fill().map(() => Array(4).fill(''));
const letters = gameBoard.split('');
let l = 0;
for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
        grid[i][j] = letters[l];
        l++;
    }
}
class Point {
    constructor(x, y) {
        this.X = x;
        this.Y = y;
    }
}

const dx = [-1, -1, -1, 0, 1, 1, 1, 0];
const dy = [-1, 0, 1, 1, 1, 0, -1, -1];
const currentPath = [];
const dictionary = new Set();
const solution = new Set();

function findAllPaths(row, col) {
    if (row < 0 || row >= 4 || col < 0 || col >= 4 || visited[row][col]) {
        return;
    }

    visited[row][col] = true;
    currentPath.push(new Point(row, col));

    if (currentPath.length >= 4) {
        let currentWord = '';
        for (let square of currentPath) {
            currentWord = currentWord + grid[square.X][square.Y];
            console.log(currentWord);
        }
        if (dictionary.has(currentWord)) {
            solution.add(currentWord);
            console.log(currentWord);
        }
    }

    for (let move = 0; move < 8; move++) {
        const newRow = row + dx[move];
        const newCol = col + dy[move];
        console.log("("+newRow+", "+newCol+")");
        findAllPaths(newRow, newCol);
    }

    visited[row][col] = false;
    currentPath.pop();
}

fetch('words.txt')
    .then(res => res.text())
    .then(t => {
        t.split('\n').forEach(w => dictionary.add(w.trim()));
    })
    .then(x => {
        console.log('dictionary done');
    })
    .catch(err => console.error(err));

function solve() {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            findAllPaths(i, j);
        }
    }
}