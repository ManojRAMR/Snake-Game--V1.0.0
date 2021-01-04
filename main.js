const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreBox = document.getElementById("score");
let cellArray = [];
let cellArrayLength = 0;
let snakeCells = [42, 43, 44];
let isCrashed = false;
let playerScore = 0;

const createACell = () => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  grid.appendChild(cell);
};

const createGrid = () => {
  for (let i = 0; i < 100; i++) {
    createACell();
  }

  cellArray = Array.from(document.getElementsByClassName("cell"));

  cellArrayLength = cellArray.length;
};
createGrid();

const renderSnake = () => {
  snakeCells.forEach((snakeCell) => {
    cellArray[snakeCell].classList.add("snake");
  });
};
renderSnake();

const addNewHead = (newHead) => {
  if (!snakeCells.includes(newHead)) {
    snakeCells.push(newHead);
    const tail = snakeCells.shift();
    cellArray[tail].classList.remove("snake");
  }
  renderSnake();
};

const snakeCrash = (newHead) => {
  const hitLeftWall = newHead % 10 === 0;
  const hitRightWall = newHead % 10 === 9;
  const hitTopWall = newHead < 0;
  const hitBottomWall = newHead > 99;
  if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) {
    isCrash = true;
    scoreBox.textContent = playerScore + " Snake crashed!";
  }
};

const moveSnake = (e) => {
  const key = e.key;
  const snakeHead = snakeCells[snakeCells.length - 1];
  let newHead = 0;
  let directionValue = 1;
  switch (key) {
    case "ArrowLeft":
      // Left pressed
      directionValue = -1;
      break;
    case "ArrowRight":
      // Right pressed
      directionValue = 1;
      break;
    case "ArrowUp":
      // Up pressed
      directionValue = -10;
      break;
    case "ArrowDown":
      // Down pressed
      directionValue = 10;
      break;
  }

  newHead = snakeHead + directionValue;
  addNewHead(newHead);
  snakeCrash(newHead);
  if (isCrashed) return;
};

document.addEventListener("keyup", (e) => {
  moveSnake(e);
});

// Move snake in currenly headed direction automaticaly 1 cell per 1 secound

// Change snake cells as snake moves

// Detect wheater snake trying to move beyound the border, if so snake is crashed, game over.

// On press of arrow keys change snake's headed direction.
