class Draw{
  constructor(
    showLevel,
    calculateArrow,
    calculateSpeed,
    collisionDetection,
    gameOver,
    newLevel,
    prepareBricks
  ) {
    this.showLevel = showLevel;
    this.calculateArrow = calculateArrow;
    this.calculateSpeed = calculateSpeed;
    this.collisionDetection = collisionDetection;
    this.gameOver = gameOver;
    this.newLevel = newLevel;
    this.prepareBricks = prepareBricks;
    this.drawBricks = this.drawBricks.bind(this);
    this.drawArrow = this.drawArrow.bind(this);
    this.drawBall = this.drawBall.bind(this);
    this.draw = this.draw.bind(this);
  }

  drawArrow() {
    ctx.beginPath();
    ctx.setLineDash([3]);
    ctx.moveTo(x, y);
    ctx.lineTo(lineX, lineY) ;
    ctx.strokeStyle = 'gray';
    ctx.stroke();
  }

  drawBricks() {
    this.prepareBricks();
    for (var c = 0; c < brickColumnCount; c++ ) {
      for (var r = 0; r < brickRowCount; r++) {

        if (bricks[c][r].status > 0) {
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.fillStyle = `rgb(
            ${285 - bricks[c][r].status * 3},
            ${180 - bricks[c][r].status * 4},
            ${100 - bricks[c][r].status * 1})`;
          ctx.rect(brickX, brickY, brickWidth, brickHeight);
          ctx.fill();
        }
      }
    }
    this.gameOver();
  }

  drawBall(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.showLevel();
    this.drawBricks();
    this.drawArrow();
    balls.forEach(ball => {
      this.drawBall(ball.x, ball.y, radius);
    });

    if (rightPressed && !spaceBar && gameoverModalClosed) {
      if (angle <= 175) angle += 0.25;
      this.calculateArrow(angle);
      balls.forEach(ball => {
        this.calculateSpeed(angle, ball);
      });
    }

    if (leftPressed && !spaceBar && gameoverModalClosed) {
      if (angle >= 5) angle -= 0.25;
      this.calculateArrow(angle);
      balls.forEach(ball => {
        this.calculateSpeed(angle, ball);
      });
    }

    if (spaceBar && gameoverModalClosed && gameStarted) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);


      this.showLevel();

      balls.forEach( ball => {
        this.collisionDetection(ball);

        this.drawBall(ball.x, ball.y, radius);
        if ( ball.y + ball.dy < radius ) {
          ball.sound.volume = volume;
          ball.sound.play();
          ball.dy = -ball.dy;
        } else if ( ball.y + ball.dy > canvas.height - radius ) {
          ball.dx = 0;
          ball.dy = 0;
          x = ball.x;
          y = ball.y;
        }

        if ( ball.x + ball.dx > canvas.width - radius ||
          ball.x + ball.dx < radius ) {
          ball.sound.volume = volume;
          ball.sound.play();
          ball.dx = -ball.dx;
        }
        ball.x += ball.dx;
        ball.y += ball.dy;
      });
      this.drawBricks();

      const isNotMoving = (ball, index, arra) => {
        return ball.dx === 0 && ball.dy === 0;
      };

      spaceBar = !balls.every(isNotMoving);

      if (spaceBar === false) {
        balls.forEach(ball => {
          this.calculateArrow(angle);
          this.calculateSpeed(angle, ball);
        });

      }
    }
  }
}
