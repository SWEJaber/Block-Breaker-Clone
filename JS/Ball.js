import { detectCollision } from "./CollisionDetection";

export default class Ball {
  constructor(game) {
    this.image = document.getElementById("img_ball");
    this.game = game;
    this.size = 16;

    this.gameBoundary = {
      maxX: game.width - this.size,
      minX: 0,
      maxY: game.height - this.size,
      minY: 0,
    };

    this.reset();
    this.paddle = game.paddle;
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  reset() {
    this.speed = {
      x: 5,
      y: -2,
    };

    this.position = {
      x: 10,
      y: 400,
    };
  }
  detectWallCollision() {
    if (
      this.position.x < this.gameBoundary.minX ||
      this.position.x > this.gameBoundary.maxX
    ) {
      this.speed.x = -this.speed.x;
    }

    if (this.position.y > this.gameBoundary.maxY) {
      this.game.lives--;
      this.reset();
    }

    if (
      this.position.y < this.gameBoundary.minY ||
      this.position.y > this.gameBoundary.maxY
    ) {
      this.speed.y = -this.speed.y;
    }
  }

  update(dt) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    // this.keepWithinCanvas();
    this.detectWallCollision();

    if (detectCollision(this, this.paddle)) {
      this.reverseBallYSpeed();
      this.position.y = this.paddle.position.y - this.size;
    }
  }

  reverseBallYSpeed() {
    this.speed.y = -this.speed.y;
  }
}
