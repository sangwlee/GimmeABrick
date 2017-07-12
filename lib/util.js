class Util{
  constructor(
    calculateSpeed,
    calculateArrow,
    prepareBricks,
    drawBall
  ) {
    this.calculateSpeed = calculateSpeed;
    this.calculateArrow = calculateArrow;
    this.prepareBricks = prepareBricks;
    this.drawBall = drawBall;
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
    // this.newLevel();
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
              b.sound.volume = volume;
              b.sound.play();
              ball.dy = -ball.dy;
              b.status -= 1;
          }}}}
  }

  gameOver() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].y > 550 && bricks[c][r].status > 0) {
          backgroundMusic.pause();
          gameoverModalClosed = false;
          document.getElementById("score").innerHTML = `${level}`;
          document.getElementById("gameover-modal").classList.remove('hidden');
        }}}
  }

  newLevel() {
    if (gameoverModalClosed && gameStarted) {
      level += 1;
      brickRowCount += 1;

      bricks.forEach(c => {
        c.unshift(undefined);
      });

      if (level % 5 === 0) {
        balls.push({x: canvas.width / 2, y: canvas.height - radius, dx: 0, dy: 0, sound:  new Audio('./sounds/bounce_sound.mp3')});
      }

      this.calculateArrow(angle);
      this.prepareBricks();

      if (level % 10) {
        difficulty += 0.05;
      }
    }
  }

  reset() {
    gameoverModalClosed = true;
    gameStarted = false;
    spaceBar = false;
    level = 1;
    difficulty = 1;
    brickRowCount = 4;

    x = canvas.width / 2;
    y = canvas.height - radius;

    bricks = [
      [{x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')}],
      [{x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')}],
      [{x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
       {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')}],
      [{x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')},
      {x : 0, y : 0, status: 1, sound: new Audio('./sounds/bounce_sound.mp3')}]
    ];
    balls = [{ x: canvas.width / 2, y: canvas.height - radius, dx, dy, sound:  new Audio('./sounds/bounce_sound.mp3') }];

    this.calculateArrow(angle);
    balls.forEach(ball => {
    });
    this.prepareBricks();

    balls.forEach(ball => {
      this.calculateSpeed(angle, ball);
      // this.drawBall(ball.x, ball.y, radius);
    });
    this.showLevel();
    if (bgIsPlaying) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.play();
    }

    document.getElementById('gameover-modal').classList.add('hidden');
  }

  removeModal() {
    if (!gameoverModalClosed) {
      document.getElementById('gameover-modal').classList.add('hidden');
      this.reset();
    }
    document.getElementById('welcome-modal').classList.add('hidden');
    gameStarted = true;
  }

  showLevel() {
    ctx.font = "italic bold 8pt Arial";
    ctx.fillStyle = `gray`;
    ctx.fillText(`Level ${level}`, 220, 20);
    ctx.closePath();
  }

  playMusic() {
    bgIsPlaying = !bgIsPlaying;
    if (bgIsPlaying) {
      backgroundMusic.volume = 0.2;
      backgroundMusic.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
}
