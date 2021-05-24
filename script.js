let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let points = 0;
let restartButton = document.querySelector('.restart-button');
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
}

let direction = "right";
let food = {
  x: Math.floor(Math.random() * 16) * box,
  y: Math.floor(Math.random() * 16) * box,
}

document.addEventListener('keydown', update);
restartButton.addEventListener('click', reloadPage);


function button() {
  restartButton.classList.toggle('active');
}

function reloadPage() {
  location.reload();
}

function buildBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function buildSnake() {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = "blue";
    context.fillRect(snake[index].x, snake[index].y, box, box);
  }
}

function drawFood() {
  context.fillStyle = 'red';
  context.fillRect(food.x, food.y, box, box);
}

function update (event) {
  if(event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if(event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if(event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if(event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
}

function defineTransferPosition() {
  if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;
}

function ruleEatFood(snakX, snakY) {
  if(snakX !== food.x || snakY !== food.y) {
    snake.pop();
  } else {
    food.x = Math.floor(Math.random() * 16) * box;
    food.y = Math.floor(Math.random() * 16) * box;
    points += 10;
  }
}

function ruleToEndGame() {
  for(let index = 1; index < snake.length; index++) {
    if(snake[0].x === snake[index].x && snake[0].y === snake[index].y) {
      clearInterval(game);
      alert(`Fim de Jogo. você fez ${points} pontos`);
      button();
    }
  }
}

function startGame() {
  defineTransferPosition();
  ruleToEndGame();
  buildBG();
  buildSnake();
  drawFood();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == 'right') snakeX += box;
  if(direction == 'left') snakeX -= box;
  if(direction == 'up') snakeY -= box;
  if(direction == 'down') snakeY += box;

  ruleEatFood(snakeX, snakeY);  
  
  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  snake.unshift(newHead);
} 

let game = setInterval(startGame, 100);
