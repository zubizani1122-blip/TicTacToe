const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function checkWin() {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return pattern;
        }
    }
    return null;
}

function handleCellClick(event) {
    const cell = event.target;
    const index = Number(cell.dataset.index);

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    const winPattern = checkWin();
    if (winPattern) {
        statusText.textContent = "Player " + currentPlayer + " wins!";
        winPattern.forEach(function (i) {
            cells[i].classList.add("win");
        });
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = "Player " + currentPlayer + "'s turn";
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";
    cells.forEach(function (cell) {
        cell.textContent = "";
        cell.classList.remove("x", "o", "win");
    });
}

cells.forEach(function (cell) {
    cell.addEventListener("click", handleCellClick);
});

resetBtn.addEventListener("click", resetGame);