// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    this.x = x;
    this.y = y;
    var Speed = function getRandomInt(min,max) {
      return Math.floor(Math.random()*(max-min+1));
    };
    this.speed = Speed(100,400);
    // The image/sprite for the enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( this.x < 500){
     this.x += this.speed * dt;
   } else {
      this.x = 0;
   }
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
  drawBox(this.x, this.y + 77, 100, 67, "yellow");
};

Enemy.prototype.reset = function(dt) {
  if (this.x >= 500) {
    this.x = 0;
  }
};

// Player class
var Player = function(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
  // The image/sprite for the player, this uses
  // a helper we've provided to easily load images
  this.sprite = 'images/char-boy.png';
};

// update Player position
Player.prototype.update = function(dt) {
  if(this.y < -1) {
     this.reset();
     console.log("Score!");
   }
   // code to prevent player from crossing boundaries
  if(this.y > 383 ) {
    this.y = 383;
  }
  if (this.x > 402.5){
    this.x = 402.5;
  }
  if (this.x < 2.5){
    this.x = 2.5;
  }
};

// allows input keys for player movement
Player.prototype.handleInput = function() {

}

// Draws player position
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  drawBox(this.x + 16, this.y + 63, 70, 75, "blue");
};

// Resets player position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 300;
}
// Now instantiate your objects

// Place the player object in a variable called player
var player = new Player(200,300);

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0,50);
var enemy2 = new Enemy(0,130);
var enemy3 = new Enemy(0,210);
var enemy4 = new Enemy(0,50);
var enemy5 = new Enemy(0,210);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];

// check if enemy collided with player
function checkCollisions() {
  for (var i = 0; i < allEnemies.length; i++) {
      if (player.x < allEnemies[i].x + allEnemies[i].width && player.x + player.width > allEnemies[i].x  && player.y < allEnemies[i].y + allEnemies[i].height && player.y + player.height > allEnemies[i].y) {
      player.reset();
    }
  }
  this.checkCollisions();
}

// Score is indicated on the canvas

// Increase in difficulty as player scores more

// Input method for player keyboard movement
Player.prototype.handleInput = function(key) {
    console.log(key);
    switch (key) {
        case "right":
            this.x += 50;
            break;
        case "left":
            this.x -= 50;
            break;
        case "up":
            this.y -= 50;
            break;
        case "down":
            this.y += 50;
            break;
        default:
            console.log("no movement");
    }
};


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
