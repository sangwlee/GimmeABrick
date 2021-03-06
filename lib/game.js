document.addEventListener("DOMContentLoaded", () => {

  let preparation = new Preparation();
  let util = new Util(
    preparation.calculateSpeed,
    preparation.calculateArrow,
    preparation.prepareBricks
  );

  let draw = new Draw(
    util.showLevel,
    preparation.calculateArrow,
    preparation.calculateSpeed,
    util.collisionDetection,
    util.gameOver,
    util.newLevel,
    preparation.prepareBricks
  );
  let keyHandler = new KeyHandler(util.bringToGround);

  preparation.prepareBricks();
  draw.draw();

  document.getElementById("logo").addEventListener("click", util.playMusic, false);
  document.addEventListener("keydown", keyHandler.keyDownHandler, false);
  document.addEventListener("keyup", keyHandler.keyUpHandler, false);
  document.addEventListener("click", util.removeModal, false);
  setInterval(draw.draw, 1);
  setInterval(util.newLevel, 5000/(level * 2 * difficulty));
});
