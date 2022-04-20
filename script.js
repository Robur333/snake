const canvas = document.getElementById('snake-board');
const ctx = canvas.getContext('2d');

ctx.canvas.width = 320;
ctx.canvas.height = 320;

document.addEventListener('keydown', function (e) {
  switch (e.keyCode) {
    case 37:
      cancelled = 1;
      moveLeft();

      break;
    case 38:
      cancelled = 2;
      moveUp();
      break;
    case 39:
      cancelled = 3;
      moveRight();
      break;
    case 40:
      cancelled = 4;
      moveDown();
      break;
  }
});

const getRandomBlock = () => Math.floor(Math.random() * boardWidth) * boxWidth;

let x = 0;
let y = 0;
const boardHeight = 15;
const boardWidth = 15;
const boxHeight = 20;
const boxWidth = 20;
const snakeWidth = 19;
const snakeHeight = 19;
let randomX = getRandomBlock();
let randomY = getRandomBlock();
let foodX;
let foodY;
let moveID = 0;
const movesID = [];
let cancelled = 2;
let snakeLenght = 1;
const snakeRefreshRate = 100;
let moveDirection;

generateBoard();
function generateBoard() {
  for (let i = 0; i <= boardHeight; i++) {
    for (let j = 0; j <= boardWidth; j++) {
      ctx.fillRect(x, y, boxWidth, boxHeight);
      x += 20;
    }
    y += 20;
    x = 0;
  }
  ctx.fillStyle = 'green';
  ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
  moveUp();
  spawnFood();
}

function addMoveID() {
  movesID.push({
    id: moveID,
    x: randomX,
    y: randomY,
    isTaken: false,
  });
  moveID += 1;
}

function moveConsequesces(direction, callBack) {
  moveDirection = direction;
  addSnakeLenghtIf();
  addMoveID();

  if (snakeLenght >= 2) {
    addTail();
    refreshFood();
  }
  setTimeout(callBack, snakeRefreshRate);
}

function moveUp() {
  if (moveDirection === 'down') {
    cancelled = 4;
    moveDown();
  } else {
    if (cancelled === 2) {
      if (randomY === 0) {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomY = boardHeight * boxHeight;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomY -= 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      }
      moveConsequesces('up', moveUp);
    } else {
      return;
    }
  }
}
function moveDown() {
  if (moveDirection === 'up') {
    cancelled = 2;
    moveUp();
  }
  if (cancelled === 4) {
    if (randomY === boardHeight * boxHeight) {
      ctx.fillStyle = 'black';
      ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      randomY = 0;
      ctx.fillStyle = 'green';
      ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
    } else {
      ctx.fillStyle = 'black';
      ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      randomY += 20;
      ctx.fillStyle = 'green';
      ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
    }
    moveConsequesces('down', moveDown);
  } else {
    return;
  }
}

function moveLeft() {
  if (moveDirection === 'right') {
    cancelled = 3;
    moveRight();
  } else {
    if (cancelled === 1) {
      if (randomX === 0) {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomX = boardHeight * boxHeight;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomX -= 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      }
      moveConsequesces('left', moveLeft);
    } else {
      return;
    }
  }
}
function moveRight() {
  if (moveDirection === 'left') {
    cancelled = 1;
    moveLeft();
  } else {
    if (cancelled === 3) {
      if (randomX === boardHeight * boxHeight) {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomX = 0;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
        randomX += 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, snakeWidth, snakeHeight);
      }
      moveConsequesces('right', moveRight);
    } else {
      return;
    }
  }
}

function spawnFood() {
  foodX = getRandomBlock();
  foodY = getRandomBlock();

  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, boxWidth - 1, boxHeight - 1);
  refreshFood();
}

function refreshFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(foodX, foodY, boxWidth - 1, boxHeight - 1);
}

function addSnakeLenght(addLenght) {
  if (randomX === foodX && randomY === foodY) {
    snakeLenght += addLenght;
    spawnFood();
  }
}

function addSnakeLenghtIf() {
  if (snakeLenght === 1) {
    addSnakeLenght(2);
  } else {
    addSnakeLenght(1);
  }
}

function addTail() {
  for (let i = 1; i <= snakeLenght; i++) {
    tailX = movesID[movesID.length - i].x;
    tailY = movesID[movesID.length - i].y;
    ctx.fillStyle = 'green';
    ctx.fillRect(tailX, tailY, boxWidth - 1, boxHeight - 1);
    ctx.fillStyle = 'black';
    ctx.fillRect(
      movesID[movesID.length - snakeLenght].x,
      movesID[movesID.length - snakeLenght].y,
      boxWidth,
      boxHeight
    );

    ctx.fillStyle = 'green';
  }
}

function endGame() {
  for (let i = 1; i <= snakeLenght; i++) {
    if (movesID[movesID.length - 1].isTaken === movesID[movesID.length - i]) {
      generateBoard();
    }
  }
}
