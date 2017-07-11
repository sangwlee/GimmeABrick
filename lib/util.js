export const bringToGround = (balls, x, radius, newLevel) => {
  balls.forEach( ball => {
    ball.dx = 0;
    ball.dy = 0;
    x = ball.x;
    ball.y = canvas.height - radius;
  });
  newLevel();
};

export const collisionDetection = (
  brickColumnCount,
  brickRowCount,
  bricks,
  radius,
  brickWidth,
  brickHeight) => {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if (b.status > 0) {
        if (ball.x > b.x - radius &&
            ball.x < b.x + brickWidth + radius &&
            ball.y > b.y - radius &&
            ball.y < b.y + brickHeight + radius) {
            ball.dy = -ball.dy;
            b.status -= 1;
        }}}}
};

export const gameOver = (
  brickColumnCount,
  brickRowCount,
  bricks,
  gameoverModalClosed) => {
  for (var c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].y > 550 && bricks[c][r].status > 0) {
        gameoverModalClosed = false;
        document.getElementById("score").innerHTML = `${level}`;
        document.getElementById("gameover-modal").classList.remove('hidden');
      }}}
};

export const newLevel = (
  level,
  brickRowCount,
  bricks,
  balls,
  canvas,
  radius,
  dx,
  dy,
  calculateSpeed,
  calculateArrow,
  angle,
  prepareBricks,
  draw) => {

  level += 1;
  brickRowCount += 1;

  bricks.forEach(c => {
    c.unshift(undefined);
  });

  if (level % 5 === 0) {
    balls.push({x: canvas.width / 2, y: canvas.height - radius, dx, dy});
  }

  balls.forEach(ball => {
    calculateSpeed(angle, ball);
  });

  calculateArrow(angle);
  prepareBricks();
  draw();
};

export const reset = (
  gameoverModalClose,
  spaceBar,
  level,
  brickRowCount,
  canvas,
  x,
  y,
  radius,
  bricks,
  balls,
  angle,
  calculateArrow,
  prepareBricks,
  drawBricks,
  calculateSpeed,
  drawBall,
  showLevel
) => {
  gameoverModalClosed = true;
  spaceBar = false;
  level = 1;
  brickRowCount = 4;

  x = canvas.width / 2;
  y = canvas.height - radius;

  bricks = [
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
  ];
  balls = [{ x: canvas.width / 2, y: canvas.height - radius, dx, dy, }];

  calculateArrow(angle);
  balls.forEach(ball => {
  });
  prepareBricks();
  drawBricks();

  balls.forEach(ball => {
    calculateSpeed(angle, ball);
    drawBall(ball.x, ball.y, radius);});
  showLevel();

  document.getElementById('gameover-modal').classList.add('hidden');
};

export const removeModal = (
  gameoverModalClosed,
  reset
) => {
  if (!gameoverModalClosed) {
    document.getElementById('gameover-modal').classList.add('hidden');
    reset();
  }
  document.getElementById('welcome-modal').classList.add('hidden');
};

export const showLevel = (ctx) => {
  ctx.font = "italic bold 8pt Arial";
  ctx.fillStyle = `gray`;
  ctx.fillText(`Level ${level}`, 220, 20);
  ctx.closePath();
};
