var scl = 30;
var gameWidth = 30, gameHeight = 30;
var gamePause = false;
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
    if (gamePause === false) {
      print('Game is paused.')
      noLoop();
      gamePause = true;
    } else {
      print('Game continues.')
      loop();
      gamePause = false;
    }
  }
}

function mousePressed() {
  snake.grow();
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
  //draw snake body
  fill(255);
  stroke(255);
  for (var i = 1; i < snake.body.length; i++) {
    if (snake.body[i].x === snake.body[i - 1].x) {
      rect((snake.body[i].x + 1/4) * scl, (min(snake.body[i].y, snake.body[i - 1].y) + 1/4) * scl, 2/4 * scl, 6/4 * scl);
    } else if (snake.body[i].y === snake.body[i - 1].y) {
      rect((min(snake.body[i].x, snake.body[i - 1].x) + 1/4) * scl, (snake.body[i].y + 1/4) * scl, 6/4 * scl, 2/4 * scl);
    }
  }
  //draw snake head
  fill(255);
  stroke(255);
  rect((snake.body[0].x + 1/6) * scl, (snake.body[0].y + 1/6) * scl, 4/6 * scl, 4/6 * scl);

  //draw Food
  fill(255, 0, 100);
  stroke(255, 0, 100);
  rect((food.pos.x + 1/6) * scl, (food.pos.y + 1/6) * scl, 4/6 * scl, 4/6 * scl);
}

function availableLocations() {
  // array to store available locations
}

function pickLocation() {
  // random from available locations
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
