export const keyDownHandler = (
  e,
  rightPressed,
  leftPressed,
  spaceBar,
  gameoverModalClosed,
  bringToGround
) => {
  if (e.keyCode === 39) {
    rightPressed = true;
    document.getElementById("welcome-modal").classList.add("hidden");
    document.getElementById("right").classList.add("button");
  } else if (e.keyCode === 37) {
    leftPressed = true;
    document.getElementById("welcome-modal").classList.add("hidden");
    document.getElementById("left").classList.add("button");
  } else if (e.keyCode === 32) {
    spaceBar = true;
    document.getElementById("welcome-modal").classList.add("hidden");
    document.getElementById("space").classList.add("button");
  } else if (e.keyCode === 82 && gameoverModalClosed) {
    bringToGround();
    spaceBar = false;
  }
};

export const keyUpHandler = (
  e,
  rightPressed,
  leftPressed
) => {
  if (e.keyCode === 39) {
    rightPressed = false;
    document.getElementById("right").classList.remove("button");
  } else if (e.keyCode === 37) {
    leftPressed = false;
    document.getElementById("left").classList.remove("button");
  } else if (e.keyCode === 32) {
    document.getElementById("space").classList.remove("button");
  }
};
