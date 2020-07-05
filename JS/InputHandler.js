export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 68:
          paddle.moveLeft();

          break;

        case 65:
          paddle.moveRight();
          break;

        case 27:
          game.togglePause();
          break;
        case 32:
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 68:
          if (paddle.speed < 0) {
            paddle.stop();
          }

          break;

        case 65:
          if (paddle.speed > 0) {
            paddle.stop();
          }
          break;
      }
    });
  }
}
