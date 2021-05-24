let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
}
let direction = "right";

function buildBG() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, 16 * box, 16 * box);
}

function buildSnake() {
  for (let index = 0; index < snake.length; index++) {
    context.fillStyle = "green";
    context.fillRect(snake[0].x, snake[0].y, box, box);
  }
}

document.addEventListener('keydown', update);

function update (event) {
  if(event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
  if(event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
  if(event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
  if(event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
}

function startGame() {
  if(snake[0].x > 15 * box && direction === 'right') snake[0].x = 0;
  if(snake[0].x < 0 && direction === 'left') snake[0].x = 16 * box;
  if(snake[0].y > 15 * box && direction === 'down') snake[0].y = 0;
  if(snake[0].y < 0 && direction === 'up') snake[0].y = 16 * box;
  
  buildBG();
  buildSnake();

  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  if(direction == 'right') snakeX += box;
  if(direction == 'left') snakeX -= box;
  if(direction == 'up') snakeY -= box;
  if(direction == 'down') snakeY += box;

  snake.pop();

  let newHead = {
    x: snakeX,
    y: snakeY,
  }

  snake.unshift(newHead);

  // if(snakeX > 15 * box && direction === 'right') snakeX = 0;
  // if(snakeX < 0 && direction === 'left') snakeX = 16 * box;
  // if(snakY > 15 * box && direction === 'down') snakeY = 0;
  // if(snakeY < 0 && direction === 'up') snakeY = 16 * box;
} 

let game = setInterval(startGame, 100);