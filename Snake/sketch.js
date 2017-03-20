var scl = 15;
var gameWidth = 30, gameHeight = 30;
var snake, food;

function setup() {
  frameRate(10);
  // frameRate(0.5);
  createCanvas(gameWidth * scl, gameHeight * scl);
  background(0);

  newGame();
  drawGame();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    snake.turn(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    snake.turn(0, 1);
  } else if (keyCode === LEFT_ARROW) {
    snake.turn(-1, 0);
  } else if (keyCode === RIGHT_ARROW) {
    snake.turn(1, 0);
  }

  if (keyCode === 80) {
    print('Game is paused.')
    noLoop();
    print(_loop);
  } else if (keyCode === 67) {
    print('Game continues.')
    loop();
    print(_loop);
  }
}

function draw() {
  background(0);

  snake.move();
  if (snake.findFood(food)) {
    snake.grow();
    food.spawn(pickLocation());
  }
  drawGame();
  if (snake.hitBody() || snake.hitWall(gameWidth, gameHeight)) {
    gameOver();
    newGame();
  }
}

function drawGame() {
  //draw snake head
  fill(255);
  stroke(255);
  rect(snake.body[0].x * scl, snake.body[0].y * scl, scl, scl);
  //draw snake body
  fill(245);
  stroke(245);
  for (var i = 1; i < snake.body.length; i++) {
    rect(snake.body[i].x * scl, snake.body[i].y * scl, scl, scl);
  }
  //draw Food
  fill(255, 0, 100);
  stroke(255, 0, 100);
  rect(food.pos.x * scl, food.pos.y * scl, scl, scl);
}

function pickLocation() {
  return createVector(floor(random(gameWidth)), floor(random(gameHeight)));
}

function newGame() {
  snake = new Snake();
  snake.spawn(createVector(0, 0));
  food = new Food();
  food.spawn(pickLocation());
}

function gameOver() {
  print('Game Over!');
  snake.spawn(createVector(0, 0));
}
