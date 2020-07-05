import Game from "./JS/Game.js";

const GAME_WIDTH = 800,
  GAME_HEIGHT = 600;

let canvas = document.getElementById("gameScreen");

let ctx = canvas.getContext("2d");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
  let dt = timestamp - lastTime;
  lastTime = timestamp;

  //Clear Canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.update(dt);
  game.draw(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
