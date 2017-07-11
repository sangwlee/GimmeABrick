export const drawArrow = (
  ctx,
  x,
  y,
  lineX,
  lineY
) => {
  ctx.beginPath();
  ctx.setLineDash([3]);
  ctx.moveTo(x, y);
  ctx.lineTo(lineX, lineY) ;
  ctx.strokeStyle = '#C0C0C0';
  ctx.stroke();
};

export const drawBricks = (
  brickColumnCount,
  brickRowCount,
  bricks,
  brickWidth,
  brickPadding,
  brickOffsetLeft,
  brickHeight,
  brickOffsetTop,
  ctx,
  gameOVer
) => {
  for (var c = 0; c < brickColumnCount; c++ ) {
    for (var r = 0; r < brickRowCount; r++) {

      if (bricks[c][r].status > 0) {
        brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        let red, green, blue;
        if (level < 50) {
          red = 285 - bricks[c][r].status * 5;
          green = 180 - bricks[c][r].status * 7;
          blue = 100 - bricks[c][r].status * 2;
        } else {
          red = 70 - (bricks[c][r].status - 50) * (5);
          green = 145 - (bricks[c][r].status - 50) * (7);
          blue = 170 - (bricks[c][r].status - 50) * (2);
        }
        ctx.fillStyle = `rgb(
          ${red},
          ${green},
          ${blue})`;
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fill();
      }
    }
  }
  gameOver();
};

export const drawBall = (
  x,
  y,
  radius,
  ctx
) => {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
};

export const draw = (
  showLevel,
  drawBricks,
  drawArrow,
  drawBall,
  radius,
  rightPressed,
  spaceBar,
  gameoverModalClosed,
  angle,
  calculateArrow,
  balls,
  calculateSpeed,
  leftPressed,
  ctx,
  canvas,
  drawBricks,
  showLevel,
  x,
  y,
  collisionDetection,
  newLevel
) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  showLevel();
  drawBricks();
  drawArrow();
  balls.forEach(ball => {
    drawBall(ball.x, ball.y, radius);
  });

  if (rightPressed && !spaceBar && gameoverModalClosed) {
    if (angle <= 175) angle += 0.25;
    calculateArrow(angle);
    balls.forEach(ball => {
      calculateSpeed(angle, ball);
    });
  }

  if (leftPressed && !spaceBar && gameoverModalClosed) {
    if (angle >= 5) angle -= 0.25;
    calculateArrow(angle);
    balls.forEach(ball => {
      calculateSpeed(angle, ball);
    });
  }

  if (spaceBar && gameoverModalClosed) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    showLevel();

    balls.forEach( ball => {
      drawBall(ball.x, ball.y, radius);
      if ( ball.y + ball.dy < radius ) {
        ball.dy = -ball.dy;
      } else if ( ball.y + ball.dy > canvas.height - radius ) {
        ball.dx = 0;
        ball.dy = 0;
        x = ball.x;
        y = ball.y;
      }

      if ( ball.x + ball.dx > canvas.width - radius ||
        ball.x + ball.dx < radius ) {
        ball.dx = -ball.dx;
      }
      collisionDetection(ball);
      ball.x += ball.dx;
      ball.y += ball.dy;
    });

    const isNotMoving = (ball, index, arra) => {
      return ball.dx === 0 && ball.dy === 0;
    };

    spaceBar = !balls.every(isNotMoving);

    if (spaceBar === false) {
      newLevel();
    }
  }
};
