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
let difficulty = 1;

let gameoverModalClosed = true;
let gameStarted = false;

let backgroundMusic = new Audio('./sounds/bg.mp3');
let bgIsPlaying = false;
let volume = 0.2;

let balls = [{ x: canvas.width / 2, y: canvas.height - radius, dx, dy, sound: new Audio('./sounds/bounce_sound.mp3')}];
let bricks = [
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
