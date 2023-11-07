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
    fetch(`/puzzles/${board}`)
        .then(res => res.text())
        .then(txt => {
            console.log(txt);
            var j = JSON.parse(txt);
            console.log(j);
            j.solution.forEach(w => show(w));
            if (!j.solution.success) {
                show(j.message);
            }
        })
        .catch(err => console.error(err));
}