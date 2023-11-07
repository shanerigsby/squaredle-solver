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
    const loading = document.querySelector(".ripple");
    loading.classList.remove("unseen");
    try {
        const response = await fetch(`/puzzles/${board}`);
        const responseObj = await response.json();
        responseObj.solution.forEach(w => show(w));
        if (!responseObj.solution.success) {
            show(responseObj.message);
        }
    } catch (err) {
        console.error(err);
    }
    loading.classList.add("unseen");
}