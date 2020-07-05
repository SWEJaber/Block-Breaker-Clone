import { detectCollision } from "./CollisionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");
    this.game=game;
    this.width = 52;
    this.height = 24;

    this.position = position;

    this.gameBoundary = {
      maxX: game.width - this.size,
      minX: 0,
      maxY: game.height - this.size,
      minY: 0,
    };

    this.paddle = game.paddle;

    this.markedForDeletion=false;
  }

  update(dt) {

    if (detectCollision(this.game.ball, this)){
        this.game.ball.reverseBallYSpeed();
        this.markedForDeletion=true;
    }

  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
