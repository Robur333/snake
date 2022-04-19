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
var randomX = getRandomBlock();
var randomY = getRandomBlock();
var foodX;
var foodY;
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
  ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
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

function moveUp() {
  if (moveDirection === 'down') {
    cancelled = 4;
    moveDown();
  } else {
    if (cancelled === 2) {
      if (randomY === 0) {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomY = boardHeight * boxHeight;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomY -= 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      }
      moveDirection = 'up';
      addSnakeLenght();
      addMoveID();

      if (snakeLenght >= 2) {
        addTail();
        refreshFood();
      }
      setTimeout(moveUp, snakeRefreshRate);
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
      ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      randomY = 0;
      ctx.fillStyle = 'green';
      ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
    } else {
      ctx.fillStyle = 'black';
      ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      randomY += 20;
      ctx.fillStyle = 'green';
      ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
    }
    moveDirection = 'down';
    addSnakeLenght();
    addMoveID();

    if (snakeLenght >= 2) {
      addTail();
      refreshFood();
    }
    setTimeout(moveDown, snakeRefreshRate);
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
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomX = boardHeight * boxHeight;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomX -= 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      }
      moveDirection = 'left';
      addSnakeLenght();
      addMoveID();

      if (snakeLenght >= 2) {
        addTail();
        refreshFood();
      }

      setTimeout(moveLeft, snakeRefreshRate);
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
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomX = 0;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      } else {
        ctx.fillStyle = 'black';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
        randomX += 20;
        ctx.fillStyle = 'green';
        ctx.fillRect(randomX, randomY, boxWidth - 1, boxHeight - 1);
      }
      moveDirection = 'right';
      addSnakeLenght();
      addMoveID();

      if (snakeLenght >= 2) {
        addTail();
        refreshFood();
      }
      setTimeout(moveRight, snakeRefreshRate);
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

function addSnakeLenght() {
  if (snakeLenght === 1) {
    if (randomX === foodX && randomY === foodY) {
      snakeLenght += 2;
      spawnFood();
    }
  } else {
    if (randomX === foodX && randomY === foodY) {
      snakeLenght += 1;
      console.log(snakeLenght);
      spawnFood();
    }
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
