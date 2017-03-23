//game setup
var scl = Math.max(16, Math.floor(Math.min(window.innerWidth, window.innerHeight) / 30) - 5);
var gameWidth = 30, gameHeight = 30;
var gamePause = false;
var snake, food;

function setup() {
  frameRate(6);
  // frameRate(0.5);
  var canvas = createCanvas(gameWidth * scl, gameHeight * scl);
  canvas.parent('sketch-holder');
  background(0);

  newGame();
  drawGame();
}

function keyPressed() {
  //change snake direction. Avoid moving backwards
  if (snake.direction.x === 1 && snake.direction.y === 0) {
    if (keyCode === UP_ARROW) {
      snake.turn(createVector(0, -1));
    } else if (keyCode === DOWN_ARROW) {
      snake.turn(createVector(0, 1));
    } else if (keyCode === RIGHT_ARROW) {
      snake.turn(createVector(1, 0));
    }
  } else if (snake.direction.x === -1 && snake.direction.y === 0) {
    if (keyCode === UP_ARROW) {
      snake.turn(createVector(0, -1));
    } else if (keyCode === DOWN_ARROW) {
      snake.turn(createVector(0, 1));
    } else if (keyCode === LEFT_ARROW) {
      snake.turn(createVector(-1, 0));
    }
  } else if (snake.direction.x === 0 && snake.direction.y === 1) {
    if (keyCode === DOWN_ARROW) {
      snake.turn(createVector(0, 1));
    } else if (keyCode === LEFT_ARROW) {
      snake.turn(createVector(-1, 0));
    } else if (keyCode === RIGHT_ARROW) {
      snake.turn(createVector(1, 0));
    }
  } else if (snake.direction.x === 0 && snake.direction.y === -1) {
    if (keyCode === UP_ARROW) {
      snake.turn(createVector(0, -1));
    } else if (keyCode === LEFT_ARROW) {
      snake.turn(createVector(-1, 0));
    } else if (keyCode === RIGHT_ARROW) {
      snake.turn(createVector(1, 0));
    }
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

function windowResized() {
  scl = max(20, floor(min(window.innerWidth, window.innerHeight) / 30) - 2);
  resizeCanvas(gameWidth * scl, gameHeight * scl);
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

function print2DArray(array) {
  for (var i = 0; i < array.length; i++) {
    for (var j = 0; j < array[i].length; j++) {
      if (array[i][j] === false) {
        print(i, j, array[i][j]);
      }
    }
  }
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
