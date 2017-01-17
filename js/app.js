//Superclass for Game Objects
var GameObject = function (x,y) {
  this.x = x;
  this.y = y;
  this.sprite = '';
};

//Render method for game objects
GameObject.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height= 60;
    this.speed = 130 + Math.floor(Math.random() * 100);
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-shadow-bug.png';
};

// Draw the enemy on the screen, required method for game
Enemy.prototype = Object.create(GameObject.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 909){
     this.x += this.speed * 1.3 * dt;
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

// Player class
var Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.width = 45;
  this.height = 60;
  // The image/sprite for the player
  this.sprite = 'images/char-princess-girl.png';
  this.score = 0;
  this.lives = 5;
};

Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// update Player position
Player.prototype.update = function(dt) {
  document.getElementById('lives').innerHTML = player.lives;
  document.getElementById('score').innerHTML = player.score;
  // Update score of the player and reset player position
  if(this.x === 404 && this.y === 53) {
    this.score++;
    document.getElementById('score').innerHTML = this.score;
  }
};

// Resets player position
Player.prototype.reset = function() {
  if (this.lives > 0) {
    this.lives--;
    document.getElementById('lives').innerHTML = this.lives;
  }
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
var enemy7 = new Enemy(0,391);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

// Input method for player keyboard movement
Player.prototype.handleInput = function(key) {
 // Code to prevent player from crossing boundaries through switch statement
  switch (key) {
    case "right":
      if (this.x < 800) {
        this.x += 101;
      }
      break;
    case "left":
      if (this.x > 0) {
        this.x -= 101;
      }
      break;
    case "up":
      if (this.y> 0) {
        this.y -= 83;
      }
      break;
    case "down":
      if (this.y < 473) {
        this.y += 83;
      }
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

Moon.prototype = Object.create(GameObject.prototype);
Moon.prototype.constructor = Moon;

Moon.prototype.update = function(dt) {
};

var moon = new Moon(305, -130);

// Star class
var Star = function (x, y) {
  var StarPos = function getRandomInt(min,max) {
    return Math.floor(Math.random()*(max-min)+min *2);
  }
  this.width = 60;
  this.height = 60;
  this.x = 101 * StarPos(0,7);
  this.y = 53 + (83 * StarPos(0,5));
  this.sprite = "images/Star.png";
};

Star.prototype = Object.create(GameObject.prototype);
Star.prototype.constructor = Star;


Star.prototype.reset = function() {
  this.x = StarPos(0,909);
  this.y = StarPos(53,473);
};

Star.prototype.update = function(dt) {
  // rules to prevent star from overlapping with other Game Objects and crossing boundaries
  this.x < 909;
  this.y < 475;

  this.starCollisions();
};

Star.prototype.starCollisions = function () {
  var star = this;
  if (player.x < star.x + star.width &&
   player.x + star.width > star.x  &&
   player.y < star.y + star.height &&
   player.y + star.height > star.y) {
    player.sprite.replace('images/char-princess-girl.png',"images/char-princess-girl-star.png");
  }
};

var star0 = new Star();
var star1 = new Star();
var star2 = new Star();
var star3 = new Star();
var star4 = new Star();

allStars = [star0, star1, star2, star3, star4];

// Rock class
var Rock = function (x, y) {
  this.x = x;
  this.y = y;
  this.width = 101;
  this.height = 83;
  this.sprite = "images/Rock.png";
};

// Renders Star position
Rock.prototype = Object.create(GameObject.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function(dt) {
};

var rock0 = new Rock(202, -33);
var rock1 = new Rock(303, -33);
var rock2 = new Rock(303, 53);
var rock3 = new Rock(505, 53);
var rock4 = new Rock(505, -33);
var rock5 = new Rock(606, -33);

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

*/
