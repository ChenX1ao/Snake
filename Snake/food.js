function Food() {
  this.pos = {x: this.x, y: this.y};

  this.spawn = function() {
    this.pos.x = floor(random(gameWidth)) * scl;
    this.pos.y = floor(random(gameHeight)) * scl;
  }

  this.show = function() {
    fill(255, 0, 100);
    rect(this.pos.x, this.pos.y, scl, scl);
  }
}
