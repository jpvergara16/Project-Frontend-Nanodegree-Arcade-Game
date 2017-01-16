// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height= 60;
    var Speed = function getRandomInt(min,max) {
      return Math.floor(Math.random()*(max-min+1));
    };
    this.speed = Speed(100,400);
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-shadow-bug.png';
};

function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function(dt) {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function(dt) {
  if (this.x >= 500) {
    this.x = 0;
  }
};

// Check enemy collisions with player
Enemy.prototype.checkCollisions = function () {
  var enemy = this;
  if (player.x < enemy.x + enemy.width &&
   player.x + player.width > enemy.x  &&
   player.y < enemy.y + enemy.height &&
   player.y + player.height > enemy.y) {
   player.reset();
   console.log("Ouch! You Got Hit!");
  }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 909){
     this.x += this.speed * dt;
   } else {
      this.x = -100;
   }
   this.checkCollisions();
};

Enemy.prototype.reset = function(dt) {
  if (this.x >= 909) {
    this.x = -100;
  }
};

// Player class
var Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.width = 45;
  this.height = 60;
  // The image/sprite for the player
  this.sprite = 'images/char-princess-girl.png';
};

// update Player position
Player.prototype.update = function(dt) {
   // code to prevent player from crossing boundaries
  if(this.y > 475) {
    this.y = 475;
  }
  if (this.x > 796.5){
    this.x = 796.5;
  }
  if(this.x < 2.5) {
    this.x = 2.5;
  }
  // code to stop player from passing Rocks
  if(this.x > 353.5 && this.x < 555.5 && this.y < 15) {
   this.reset();
   }
};

// Draws player position
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  if(this.hasStar) {
    ctx.drawImage(Resources.get("images/Star.png"), this.x, this.y + 70, 50, 85);
  }
};

// Resets player position
Player.prototype.reset = function() {
  this.x = 404;
  this.y = 473;
};
// Now instantiate your objects

// Place the player object in a variable called player
var player = new Player(404, 473);

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,58);
var enemy2 = new Enemy(0,141);
var enemy3 = new Enemy(0,225);
var enemy4 = new Enemy(0,58);
var enemy5 = new Enemy(0,225);
var enemy6 = new Enemy(0,308);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

// Input method for player keyboard movement
Player.prototype.handleInput = function(key) {
  switch (key) {
    case "right":
      this.x += 101;
      break;
    case "left":
      this.x -= 101;
      break;
    case "up":
      this.y -= 83;
      break;
    case "down":
      this.y += 83;
      break;
    default:
      console.log("no movement");
  }
};

// Moon class
var Moon = function (x, y) {
  this.x = x;
  this.y = y;
  this.width = 500;
  this.height = 300;
  this.sprite = "images/Moon.png";
};

// Renders Moon position
Moon.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  ctx.beginPath();
  ctx.arc(456,15,155,0,2*Math.PI);
  ctx.stroke();
};

Moon.prototype.update = function(dt) {
};

var moon = new Moon(305, -130);

// Star class
var Star = function (x, y) {
  this.x = x;
  this.y = y;
  this.width = 60;
  this.height = 60;
  this.sprite = "images/Star.png";
};

// Renders Star position
Star.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Star.prototype.update = function(dt) {
};

var star = new Star(505, 473);

// Rock class
var Rock = function (x, y) {
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 83;
  this.sprite = "images/Rock.png";
};

// Renders Star position
Rock.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Rock.prototype.update = function(dt) {
};

var rock0 = new Rock(202, -30);
var rock1 = new Rock(303, -30);
var rock2 = new Rock(303, 53);
var rock3 = new Rock(505, 53);
var rock4 = new Rock(505, -30);
var rock5 = new Rock(606, -30);

var allRocks = [rock0, rock1, rock2, rock3, rock4, rock5];


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

/*

IMAGE CREDIT -
MOON: https://clipartfest.com/download/ae5de4f8d03c1b3ae36a8886f1f8b72e7f08be37.html
BLOCK FLOOR - http://www.lostgarden.com/2007/05/dancs-miraculously-flexible-game.html

JS GAME
1) COLLECT STARS TO BRIGHTEN UP MOON WHILE AVOIDING SHADOW WIGHTS
2) COLLECT STARTS (AND HOLD THEM)
3) BRING THEM TO THE MOON
4) STARS ARE RANDOMLY GENERATED AND LAID OUT ACROSS CANVAS
5) MOON GETS BRIGHTER (LESS OPAQUE)
6) REACH 10 STARS TO WIN
6) BUGS FORCE YOU TO LOSE A STAR WHEN HELD
7) WHEN NOT HOLDING A STAR YOU LOSE A LIFE
8) PLAYER RESETS WHEN LIFE IS 0
9) CUSTOM MENU AND SPACE BAR START

*/

