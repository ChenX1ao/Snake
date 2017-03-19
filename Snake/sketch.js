var scl = 15;
var gameWidth = 30;
var gameHeight = 30;

var snake;
var food;

function setup() {
  frameRate(10);
  createCanvas(gameWidth * scl, gameHeight * scl);

  snake = new Snake();
  food = new Food();

  food.spawn();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.dir(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.dir(1, 0);
  }
}

function draw() {
  background(0);
  snake.move();
  snake.show();

  if (snake.eat(food)) {
    food.spawn();
  }
  food.show();
}
