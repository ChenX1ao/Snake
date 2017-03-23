function Snake() {
  this.body = [];
  this.getHead = function() {
    return this.body[0];
  }
  this.getTail = function() {
    return this.body[this.body.length - 1];
  }

  this.spawn = function(pos) {
    this.body = [];
    this.body.push(pos);
    this.direction = createVector(1, 0);
  }

  this.turn = function(dir) {
    this.direction = dir;
  }

  this.move = function() {
    this.body.unshift(createVector(this.getHead().x + this.direction.x, this.getHead().y + this.direction.y));
    this.previousTail = this.body.pop(this.body[this.body.length - 1]);
  }

  this.grow = function() {
    this.body.push(this.previousTail);
  }

  this.findFood = function(food) {
    var d = dist(this.getHead().x, this.getHead().y, food.pos.x, food.pos.y);
    if (d < 1) {
      return true;
    } else {
      return false;
    }
  }

  this.hitBody = function() {
    var d;
    for (var i = 1; i < this.body.length; i++) {
      d = dist(this.getHead().x, this.getHead().y, this.body[i].x, this.body[i].y);
      if (d < 1) {
        return true;
      }
    }
    return false;
  }

  this.hitWall = function(gameWidth, gameHeight) {
    if (this.getHead().x < 0 || this.getHead().x > gameWidth - 1 || this.getHead().y < 0 || this.getHead().y > gameHeight - 1) {
      return true;
    } else {
      return false;
    }
  }
}
