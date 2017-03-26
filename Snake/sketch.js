//game setup
var scl = Math.max(16, Math.floor(Math.min(window.innerWidth, window.innerHeight) / 30) - 5);
var gameWidth = 30, gameHeight = 30;
var gamePause = false;
var snake, food;
var dir, dirBuffer, dirBuffer2;

//game setup
function setup() {
  frameRate(8);
  // frameRate(0.5);
  var canvas = createCanvas(gameWidth * scl, gameHeight * scl);
  canvas.parent('sketch-holder');
  background(0);

  newGame();
  drawGame();
}

function windowResized() {
  scl = max(20, floor(min(window.innerWidth, window.innerHeight) / 30) - 2);
  resizeCanvas(gameWidth * scl, gameHeight * scl);
}

//player input
function keyPressed() {
  //change snake direction. Avoid moving backwards
  if (keyCode === UP_ARROW) {
    dir.x = 0;
    dir.y = -1;
  } else if (keyCode === DOWN_ARROW) {
    dir.x = 0;
    dir.y = 1;
  } else if (keyCode === LEFT_ARROW) {
    dir.x = -1;
    dir.y = 0;
  } else if (keyCode === RIGHT_ARROW) {
    dir.x = 1;
    dir.y = 0;
  }

  //if the player input direction is not on the opposite as the current snake direction, set the buffer and 2nd buffer equal to the player input
  //if the player input direction is on the opposite, and the buffer direction is not on the same direction as the current snake direction, set the 2nd buffer equal to the player input
  //this is to avoid the snake can turn backwards and hit the body, as well as store the next move instruction even if the player input two consecutive moves before the next snake move
  if (dist(snake.direction.x, snake.direction.y, dir.x, dir.y) !== 2) {
    dirBuffer.x = dirBuffer2.x = dir.x;
    dirBuffer.y = dirBuffer2.y = dir.y;
  } else if (dist(snake.direction.x, snake.direction.y, dirBuffer.x, dirBuffer.y) !== 0) {
    dirBuffer2.x = dir.x;
    dirBuffer2.y = dir.y;
  }

  //pause game
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

  //manual grow
  if (keyCode === 67) {
    snake.grow();
  }
}

function mousePressed() {
}

//game run
function draw() {
  background(0);

  snake.turn(dirBuffer.x, dirBuffer.y);
  dirBuffer.x = dirBuffer2.x;
  dirBuffer.y = dirBuffer2.y;

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

function newGame() {
  snake = new Snake();
  snake.spawn(createVector(0, 0));

  food = new Food();
  food.spawn(pickLocation());

  dir = createVector(1, 0);
  dirBuffer = createVector(1, 0);
  dirBuffer2 = createVector(1, 0);
}

function gameOver() {
  print('Game Over!');
  snake.spawn(createVector(0, 0));
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
  var a = [];
  var n = 0;
  for (var i = 0; i < gameWidth; i++) {
    a.push([]);
    for (var j = 0; j < gameHeight; j++) {
      a[i].push(true);
      n++;
    }
  }
  for (var i = 0; i < snake.body.length; i++) {
    a[snake.body[i].x][snake.body[i].y] = false;
    n--;
  }
  return {a:a, n:n};
}

function pickLocation() {
  var r = floor(random(availableLocations().n));
  for (var i = 0; i < gameWidth; i++) {
    for (var j = 0; j < gameHeight; j++) {
      if (availableLocations().a[i][j] === true) {
        r--;
        if (r === 0) {
          return createVector(i, j);
        }
      }
    }
  }
}

//debug
function print2DArray(array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] === false) {
        print(i, j, array[i][j]);
      }
    }
  }
}
