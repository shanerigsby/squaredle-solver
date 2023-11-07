function getBoard() {
    const queryString = document.URL.split("?")[1];
    if (!queryString) {
        return;
    }
    const board = queryString.split("board=")[1];
    if (!board) {
        return;
    }
    return board;
}

function show(word) {
    const solution = document.querySelector("#solution");
    const p = document.createElement("p");
    p.textContent = word;
    solution.appendChild(p);
}

const board = getBoard();

if (board) {
    const solution = await fetch(`/puzzles/${board}`);
    if (solution) {
        solution.solution.forEach(w => show(w));
    }
    if (!solution.success) {
        show(solution.message);
    }
}