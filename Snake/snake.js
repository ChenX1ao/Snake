function Snake() {

  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.body = [];
  this.body.push(createVector(0, 0));
  this.body.push(createVector(1, 1));
  print(this.body.length);
  print(this.body[0], this.body[1]);

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.move = function() {
    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
  }

  this.eat = function(food) {
    var d = dist(this.x, this.y, food.pos.x, food.pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    fill(255);
    rect(this.x, this.y, scl, scl);
  }
}
