## GimmeABrick

GimmeABrick is inspired by a well-known classical game, Brick Breaker. To it, following spin-off has been applied:

1. There is no paddle, once the balls hit bottom, they are caught.
2. Caught balls can be aimed and released towards the player's choice of direction.
3. A new ball is gained every five rounds.

### Notable Implementations

  1. [Bricks and Balls](#bricks-and-balls)
  2. [New levels](#new-levels)
  3. [Calculating speed and direction](#calculating-speed-and-direction)

### Bricks and balls

Bricks and balls are essential to GimmeABrick. These two components of the game are constantly drawn on the board in interval.
While the balls are in motion, their collision with bricks are constantly tested by checking if the balls' coordinates are within the bricks' coordinates.
When the coordinates of the bricks and balls overlap, they have "collided". As result of collision, bricks will change its status, being "removed" from the game. Balls will change their direction accordingly to how they hit bricks.

```javascript
    function drawBricks() {
      for (var c = 0; c < brickColumnCount; c++ ) {
        for (var r = 0; r < brickRowCount; r++) {

          if (bricks[c][r].status > 0) {
            brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.fillStyle = `rgb(
              ${285 - bricks[c][r].status * 5},
              ${180 - bricks[c][r].status * 7},
              ${100 - bricks[c][r].status * 2})`;
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fill();
          }
        }
      }
      gameOver();
    }
```

```javascript
    function drawBall(x, y, radius) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI*2);
      ctx.fillStyle = "#0095DD";
      ctx.fill();
      ctx.closePath();
    }
```

```javascript
    balls.forEach(ball => {
      drawBall(ball.x, ball.y, radius);
    })
```

```javascript
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
```

### New levels

Within the game, new level is reached whenever all balls are caught at the bottom. Upon initiating new level function, it will increase the current level by one, increase rows of bricks, and increase the number of balls every five levels.

```javascript
    function newLevel() {
      level += 1;
      brickRowCount += 1;

      bricks.forEach(c => {
        c.unshift(undefined)
      })

      if (level % 5 === 0) {
        balls.push({x: canvas.width / 2, y: canvas.height - radius, dx, dy})
      }

      balls.forEach(ball => {
        calculateSpeed(angle, ball)
      })
      calculateArrow(angle);
      prepareBricks();
      draw();
    }
```

### Calculating speed and direction

Perhaps one of the most challenging aspects of the game was to allow player to choose an angle and make sure all balls' directions are changed accordingly. One thing to note is that while their direction may change, their speed must stay constant. To solve this problem, trigonometry from high school has been revisited.

```javascript
    function calculateArrow(angle) {
      radian = Math.PI / 180 * angle;
      lineX = -(Math.cos(radian) * 700 - x);
      lineY = -(Math.sin(radian) * 700 - y - radius);
    }
```

```javascript
    function calculateSpeed(angle, ball) {
      let theta = Math.atan((lineY - ball.y - radius)/(lineX - ball.x))
      let theta_a = theta * 180 / Math.PI
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
```

### Future Implementations & thoughts
GimmeABrick is a game built with stress-relief in mind. This game should be played when someone is stressed and just wants to see some pretty colors, balls bounce off in unison, bricks come down one after another, etc.

For future additions, the game can use an option to set difficulty level. Though the game was intended for stress-free play (when you need a break), there definitely are players out there who seek challenge.

In addition to adjusting difficulty level of the game, it will be nice to include sound effects where appropriate.
