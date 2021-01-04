// get html document elements
"use strict";
const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreBox = document.getElementById("score");

const cellCount = 225;
const girdWidth = Math.sqrt(cellCount);
const cellWidthHeightPX = 40;
const gridWidthHeightPX = Math.sqrt(cellCount) * cellWidthHeightPX;
let cellArray = [];
let cellArrayLength = 0;

// snake's cells array
let snakeCells = [50, 51, 52];

let mealCells = [];

// snake's head direction
const snakeHeadDirection = {
  top: -girdWidth,
  right: 1,
  bottom: girdWidth,
  left: -1,
  current: 1,
  getCurrentHeadDirection: function () {
    return this.current;
  },
  setCurrentHeadDirection: function (headDirection) {
    this.current = headDirection;
  },
};

let hasSnakeCrashed = false;

let playerScore = 0;

// create a grid cell fragment
const createBoardCell = () => {
  const cell = document.createElement("div");
  cell.classList.add("cell");
  cell.style.height = `${cellWidthHeightPX}px`;
  cell.style.width = `${cellWidthHeightPX}px`;
  grid.appendChild(cell);
};

// create the game borad grid
const createGrid = () => {
  grid.style.height = `${gridWidthHeightPX}px`;
  grid.style.width = `${gridWidthHeightPX}px`;
  for (let i = 0; i < cellCount; i++) {
    createBoardCell();
  }

  cellArray = Array.from(document.getElementsByClassName("cell"));

  cellArrayLength = cellArray.length;
};
createGrid();

// render snake in to grid
const renderSnake = () => {
  snakeCells.forEach((snakeCell) => {
    cellArray[snakeCell].classList.add("snake");
  });
};

// Change snake's heading direction
const changeSnakeHeadDirection = (e) => {
  const key = e.key;
  const currentDirection = snakeHeadDirection.getCurrentHeadDirection();
  let newDirection = currentDirection;

  switch (key) {
    case "ArrowLeft":
      // Left pressed
      newDirection = snakeHeadDirection.left;
      break;
    case "ArrowRight":
      // Right pressed
      newDirection = snakeHeadDirection.right;
      break;
    case "ArrowUp":
      // Up pressed
      newDirection = snakeHeadDirection.top;
      break;
    case "ArrowDown":
      // Down pressed
      newDirection = snakeHeadDirection.bottom;
      break;
  }

  if (newDirection === -currentDirection) {
    newDirection = currentDirection;
  }

  snakeHeadDirection.setCurrentHeadDirection(newDirection);
};

// Move snake
const moveSnake = () => {
  let snakeHead = snakeCells[snakeCells.length - 1];
  snakeCrashDetect(snakeHead);
  if (hasSnakeCrashed) return;

  let newHead = snakeHead + snakeHeadDirection.getCurrentHeadDirection();

  if (!snakeCells.includes(newHead)) {
    snakeCells.push(newHead);
    const tail = snakeCells.shift();
    cellArray[tail].classList.remove("snake");
  }
  renderSnake();
};

// Check for crashes
const snakeCrashDetect = (Head) => {
  const headDirection = snakeHeadDirection.getCurrentHeadDirection();
  const hitTopWall =
    Head - girdWidth < 0 && headDirection === snakeHeadDirection.top;

  const hitRightWall =
    Head % girdWidth === girdWidth - 1 &&
    headDirection === snakeHeadDirection.right;

  const hitBottomWall =
    Head > cellCount - girdWidth && headDirection === snakeHeadDirection.bottom;

  const hitLeftWall =
    Head % girdWidth === 0 && headDirection === snakeHeadDirection.left;

  if (hitTopWall || hitRightWall || hitBottomWall || hitLeftWall) {
    hasSnakeCrashed = true;
    clearInterval(moveSnakeIntervalID);
    clearInterval(snakeMealIntervalID);
  }
};

// Add meals to grid
const addSnakeMeal = () => {
  do {
    const newMealCell = cellArray[Math.floor(Math.random() * cellCount)];
  } while (snakeCells.includes(mealCell));

  mealCell.classList.add("meal");
};
// Listen to key up events
document.addEventListener("keyup", (e) => {
  changeSnakeHeadDirection(e);
});

renderSnake();

// move the snake on interval
const moveSnakeIntervalID = setInterval(moveSnake, 500);
const snakeMealIntervalID = setInterval(addSnakeMeal, 4000);
