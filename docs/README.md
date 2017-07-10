## JS Project Proposal: GimmeABrick

### Background

GimmeABrick is inspired by a well-known classical game, Brick Breaker. Basic rules:

1) Basic Principle: Ball is moved when the user initiates it, when it hits a brick a number of times, brick breaks.
2) Level increases every round, with level, the number of balls increase as well as the number of times you need to hit the bicks.
3) If a brick hits the bottom of the display, game is lost.
4) Game cannot be "won", but scores can be achieved.

### Functionality & MVP  

MVP's of GimmeABrick:

- [ ] Generate initial ball and bricks.
- [ ] Destroy the bricks when the ball contacts them.
- [ ] At each level, increase the number of times the ball needs to hit the bricks, as well as the number of balls.
- [ ] Generate new layer of bricks each round.
- [ ] Logic for game over - when the bottom-most brick hits bottom of the display.
- [ ] Add appropriate modals and information when: game is loaded, game is over.

Bonus:

- [ ] Sound effects.
- [ ] Brick breaking effects.
- [ ] Additional styling.

### Architecture and Technologies

This project will be implemented with the following technologies:
- `JavaScript` for game logic
- `HTML 5 Canvas` for display

### Implementation Timeline

**Day 1**: Generate working breaks and a ball

- Make appropriately sized display
- Make a ball
- Make breaks
- Show guideline where ball will go

**Day 2**: Generate rounds

- Increase the number of balls each round
- Increase the number of times the brick needs to be hit each round.
- Generate new layer of breaks each round

**Day 3**: Polish

- Add information modals where appropriate (game loaded, game ended)
- Add personal information, finer styling
- Polish the game in terms of design
