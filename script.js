let canvas = document.querySelector("#snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
  x: 8 * box,
  y: 8 * box,
}
let direction = "left";

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

function startGame() {
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
} 

let game = setInterval(startGame, 100);