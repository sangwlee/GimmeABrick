document.addEventListener("DOMContentLoaded", () => {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");

  let radius = 4.5;
  let x = canvas.width / 2;
  let y = canvas.height - radius;

  let speed = 2.5;
  let dx = 0;
  let dy = -1 * speed;
  let lineX = canvas.width/2;
  let lineY = 0;
  let angle = 90;
  let radian;

  let brickRowCount = 4;
  let brickColumnCount = 5;
  let brickWidth = 79.5;
  let brickHeight = 20;
  let brickPadding = 6;
  let brickOffsetTop = 30;
  let brickOffsetLeft = 30;

  let rightPressed = false;
  let leftPressed = false;
  let spaceBar = false;
  let level = 1;

  let gameoverModalClosed = true;

  let balls = [{ x: canvas.width / 2, y: canvas.height - radius, dx, dy }];
  let bricks = [
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
    [{x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}, {x : 0, y : 0, status: 1}],
  ];

  // Preparatory Functions - calculations and preparations
  function calculateArrow(angle) {
    radian = Math.PI / 180 * angle;
    lineX = -(Math.cos(radian) * 700 - x);
    lineY = -(Math.sin(radian) * 700 - y - radius);

    // if (lineX > 480) { lineX = 480 }
    // else if (lineX < 0) { lineX = 0 }
    //
    // if (lineY < 0) {lineY = 0 }
    // console.log(lineX, lineY)
  }

  function calculateSpeed(angle, ball) {
    let theta = Math.atan((lineY - ball.y - radius * 2)/(lineX - ball.x));
    let theta_a = theta * 180 / Math.PI;
    let dxValue, dyValue;
    if (theta_a > 0) {
      dxValue = -(Math.cos(theta) * speed);
      dyValue = -(Math.sin(theta) * speed);
    } else {
      dxValue = (Math.cos(theta) * speed);
      dyValue = (Math.sin(theta) * speed);
    }

    ball.dx = dxValue;
    ball.dy = dyValue;
  }

  function prepareBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
      if (bricks[c] === undefined) bricks[c] = [];
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r] === undefined) {
          bricks[c][r] = {x : 0, y : 0, status: getRandomLevel(0, level)};
        }

        let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
      }
    }
  }

  prepareBricks();

  // Utility Functions
  function bringToGround() {
    balls.forEach( ball => {
      ball.dx = 0;
      ball.dy = 0;
      x = ball.x;
      ball.y = canvas.height - radius;
    });
    newLevel();
  }

  function collisionDetection(ball) {
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
          }
        }
      }
    }
  }

  function gameOver() {
    for (var c = 0; c < brickColumnCount; c++) {
      for (var r = 0; r < brickRowCount; r++) {
        if (bricks[c][r].y > 550 && bricks[c][r].status > 0) {
          gameoverModalClosed = false;
          document.getElementById("score").innerHTML = `${level}`;
          document.getElementById("gameover-modal").classList.remove('hidden');
        }
      }
    }
  }

  function getRandomLevel(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function newLevel() {
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

  }

  function reset() {
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
  }

  function removeModal() {
    if (!gameoverModalClosed) {
      document.getElementById('gameover-modal').classList.add('hidden');
      reset();
    }
    document.getElementById('welcome-modal').classList.add('hidden');
  }

  function showLevel() {
    ctx.font = "italic bold 8pt Arial";
    ctx.fillStyle = `gray`;
    ctx.fillText(`Level ${level}`, 220, 20);
    ctx.closePath();
  }

  // Draw Functions
  function drawArrow(){
    ctx.beginPath();
    ctx.setLineDash([3]);
    ctx.moveTo(x, y);
    ctx.lineTo(lineX, lineY) ;
    ctx.strokeStyle = '#C0C0C0';
    ctx.stroke();
  }

  function drawBricks() {
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
  }

  function drawBall(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }

  function draw() {
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

      function isNotMoving(ball, index, array) {
        return ball.dx === 0 && ball.dy === 0;
      }

      spaceBar = !balls.every(isNotMoving);

      if (spaceBar === false) {
        newLevel();
      }
    }
  }

  // Keyhandler Functions
  function keyDownHandler(e) {
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
  }

  function keyUpHandler(e) {
    if (e.keyCode === 39) {
      rightPressed = false;
      document.getElementById("right").classList.remove("button");
    } else if (e.keyCode === 37) {
      leftPressed = false;
      document.getElementById("left").classList.remove("button");
    } else if (e.keyCode === 32) {
      document.getElementById("space").classList.remove("button");
    }
  }

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);
  document.addEventListener("click", removeModal, false);
  setInterval(draw, 1);
});
