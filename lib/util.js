class Util{
  constructor(
    calculateSpeed,
    calculateArrow,
    prepareBricks
  ) {
    this.calculateSpeed = calculateSpeed;
    this.calculateArrow = calculateArrow;
    this.prepareBricks = prepareBricks;
    this.removeModal = this.removeModal.bind(this);
    this.reset = this.reset.bind(this);
    this.bringToGround = this.bringToGround.bind(this);
    this.newLevel = this.newLevel.bind(this);
  }

  bringToGround() {
    balls.forEach( ball => {
      ball.dx = 0;
      ball.dy = 0;
      x = ball.x;
      ball.y = canvas.height - radius;
    });
    this.newLevel();
  }

  collisionDetection(ball) {
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
  }

  gameOver() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].y > 550 && bricks[c][r].status > 0) {
          gameoverModalClosed = false;
          document.getElementById("score").innerHTML = `${level}`;
          document.getElementById("gameover-modal").classList.remove('hidden');
        }}}
  }

  newLevel() {
    level += 1;
    brickRowCount += 1;

    bricks.forEach(c => {
      c.unshift(undefined);
    });

    if (level % 5 === 0) {
      balls.push({x: canvas.width / 2, y: canvas.height - radius, dx, dy});
    }

    balls.forEach(ball => {
      this.calculateSpeed(angle, ball);
    });

    this.calculateArrow(angle);
    this.prepareBricks();
  }

  reset() {
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

    this.calculateArrow(angle);
    balls.forEach(ball => {
    });
    this.prepareBricks();

    balls.forEach(ball => {
      this.calculateSpeed(angle, ball);
      this.drawBall(ball.x, ball.y, radius);});
    this.showLevel();

    document.getElementById('gameover-modal').classList.add('hidden');
  }

  removeModal() {
    if (!gameoverModalClosed) {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.reset();
    }
    document.getElementById('welcome-modal').classList.add('hidden');
  }

  showLevel() {
    ctx.font = "italic bold 8pt Arial";
    ctx.fillStyle = `gray`;
    ctx.fillText(`Level ${level}`, 220, 20);
    ctx.closePath();
  }
}
