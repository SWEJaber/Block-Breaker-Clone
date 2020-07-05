import Paddle from "./Paddle.js";
import Brick from "./Brick.js";
import Ball from "./Ball.js";
import InputHandler from "./InputHandler.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
};
export default class Game {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.gameState = GAMESTATE.MENU;
    this.lives = 3;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.gameObjects = [];
  }

  start() {
    if (this.gameState === GAMESTATE.MENU) {
      let bricks = [];

      for (let col = 0; col < 14; col++) {
        for (let row = 0; row < 5; row++) {
          bricks.push(new Brick(this, { x: 35 + col * 52, y: 20 + row * 24 }));
        }
      }
      this.gameObjects = [this.ball, this.paddle, ...bricks];

      this.gameState = GAMESTATE.RUNNING;
    }
  }

  update(dt) {
    if (this.lives === 0) this.gameState = GAMESTATE.GAMEOVER;

    if (
      this.gameState === GAMESTATE.PAUSED ||
      this.gameState === GAMESTATE.MENU ||
      this.gameState === GAMESTATE.GAMEOVER
    ) {
      return;
    }

    this.gameObjects.forEach((object) => object.update(dt));

    this.gameObjects = this.gameObjects.filter(
      (object) => !object.markedForDeletion
    );
  }

  draw(ctx) {
    this.gameObjects.forEach((object) => object.draw(ctx));

    if (this.gameState === GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.width / 2, this.height / 2);
    } else if (this.gameState === GAMESTATE.MENU) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Press SPACEBAR to start!", this.width / 2, this.height / 2);
    } else if (this.gameState === GAMESTATE.GAMEOVER) {
      ctx.rect(0, 0, this.width, this.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      ctx.font = "50px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.width / 2, this.height / 2);
    }
  }

  togglePause() {
    if (this.gameState == GAMESTATE.PAUSED) {
      this.gameState = GAMESTATE.RUNNING;
    } else {
      this.gameState = GAMESTATE.PAUSED;
    }
  }
}
