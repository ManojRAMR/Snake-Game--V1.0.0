const grid = document.querySelector(".grid");
const startBtn = document.getElementById("start");
const scoreBox = document.getElementById("score");
let cellArray = [];
let cellArrayLength = 0;
let snakeCells = [42, 43, 44];

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

const moveSnake = (e) => {
  const key = e.key;
  const snakeHead = snakeCells[snakeCells.length - 1];
  let newHead = 0;
  switch (key) {
    case "ArrowLeft":
      // Left pressed
      newHead = snakeHead - 1;
      addNewHead(newHead);
      break;
    case "ArrowRight":
      // Right pressed
      newHead = snakeHead + 1;
      addNewHead(newHead);
      break;
    case "ArrowUp":
      // Up pressed
      newHead = snakeHead - 10;
      addNewHead(newHead);
      break;
    case "ArrowDown":
      // Down pressed
      newHead = snakeHead + 10;
      addNewHead(newHead);
      break;
  }
};
document.addEventListener("keyup", (e) => {
  moveSnake(e);
});
