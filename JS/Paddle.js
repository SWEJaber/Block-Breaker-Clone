export default class Paddle {
  constructor(game) {
    this.width = 150;
    this.height = 30;

    this.position = {
      x: game.width / 2 - this.width / 2,
      y: game.height - this.height - 10,
    };

    this.boundary = {
      maxX: game.width - this.width,
      minX: 0,
    };

    this.maxSpeed = 5;
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#0ff";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  keepWithinCanvas() {
    if (this.position.x < this.boundary.minX)
      this.position.x = this.boundary.minX;
    if (this.position.x > this.boundary.maxX)
      this.position.x = this.boundary.maxX;
  }

  update(dt) {
    this.position.x -= this.speed;

    this.keepWithinCanvas();
  }
}
