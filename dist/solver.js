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

function showAnswer(word) {
    const grid = document.querySelector(".grid-container");
    const answer = document.createElement("div");
    answer.classList.add("grid-item");
    answer.textContent = word;
    grid.appendChild(answer);
}

function showError(msg) {
    const solution = document.querySelector("#solution");
    const msgDiv = document.createElement('div');
    msgDiv.textContent = msg;
    solution.parentNode.insertBefore(msgDiv, solution);
}

const board = getBoard();

if (board) {
    const loading = document.querySelector(".ripple");
    loading.classList.remove("unseen");
    try {
        const response = await fetch(`/puzzles/${board}`);
        const responseObj = await response.json();
        responseObj.solution.sort((a,b) => a.length - b.length).forEach(w => showAnswer(w));
        if (!responseObj.solution.success) {
            showError(responseObj.message);
        }
    } catch (err) {
        console.error(err);
    }
    loading.classList.add("unseen");
    document.querySelector(".head-space").classList.remove("unseen");
}