let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameMode = null;
let gameActive = true;

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");

function setMode(mode) {
  gameMode = mode;
  resetGame();
  statusElement.textContent = 
    mode === "pvp" ? "Player vs Player mode!" : "Player vs AI mode!";
}

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleMove(index));
    boardElement.appendChild(div);
  });
}

function handleMove(index) {
  if (!gameActive || board[index] !== "") return;

  board[index] = currentPlayer;
  renderBoard();

  if (checkWin()) {
    statusElement.textContent = `${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  if (gameMode === "pvp") {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusElement.textContent = `Turn: ${currentPlayer}`;
  } else if (gameMode === "ai") {
    currentPlayer = "O"; // AI always plays O
    aiMove();
  }
}

function aiMove() {
  // Simple AI: pick random empty cell
  let emptyCells = board.map((c, i) => c === "" ? i : null).filter(i => i !== null);
  let move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[move] = "O";
  renderBoard();

  if (checkWin()) {
    statusElement.textContent = "AI wins!";
    gameActive = false;
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusElement.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusElement.textContent = "Your turn!";
}

function checkWin() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => 
    board[pattern[0]] !== "" &&
    board[pattern[0]] === board[pattern[1]] &&
    board[pattern[1]] === board[pattern[2]]
  );
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  renderBoard();
  statusElement.textContent = gameMode ? `Turn: ${currentPlayer}` : "Choose a mode to start!";
}

renderBoard();