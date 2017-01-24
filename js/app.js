// Global sprite variables to remove code repetition
var playerMain = "images/char-princess-girl.png";
var playerStar = "images/char-princess-girl-star.png";

// Function for a random even integer
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min * 2);
}

//Superclass for Game Objects
var GameObject = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = '';
};

//Render method for game objects
GameObject.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Star class
var Star = function(x, y) {
    // sets random x, y value for star
    this.x = 101 * getRandomInt(0, 9);
    this.y = 53 + (83 * getRandomInt(0, 6));
    this.width = 60;
    this.height = 60;
    this.sprite = "images/Star.png";
    // Code to set offCanvas value for stars once called
    var offCan = false;
    this.offCanvas = function(x, y) {
        this.x = -300;
        this.y = -300;
        offCan = true;
    };
};

Star.prototype = Object.create(GameObject.prototype);
Star.prototype.constructor = Star;

Star.prototype.reset = function() {
    this.x = 101 * getRandomInt(0, 9);
    this.y = 53 + (83 * getRandomInt(0, 6));
    offCan = false;
};

// Collision function to acquire Star
Star.prototype.starCollisions = function() {
    var star = this;
    if (player.x < star.x + star.width &&
        player.x + player.width > star.x &&
        player.y < star.y + star.height &&
        player.y + player.height > star.y) {
        // changes player sprite to player holding a star
        player.sprite = playerStar;
        player.holdStar = true;
        this.offCanvas();
        console.log("A star has been collected! Bring it to the altar!");
    }
};

Star.prototype.update = function(dt) {
    // rule to prevent star from overlapping with Rocks & Moon
    if ((this.x > 202 && this.x < 606) && this.y < 60) {
        this.reset();
    }
    // call collision if player holds nothing
    if (player.holdStar === false) {
        this.starCollisions();
    }
    // RESETS STAR POSITIONS ONCE ALL STARS ARE OFF CANVAS
    if ((star0.x === star0.y) && (star1.x === star1.y) && (star2.x === star2.y) && (star3.x === star3.y) && (star4.x === star4.y) && (offCan = true)) {
        star0.reset();
        star1.reset();
        star2.reset();
        star3.reset();
        star4.reset();
    }
};

//Placement of Random Stars
var star0 = new Star();
var star1 = new Star();
var star2 = new Star();
var star3 = new Star();
var star4 = new Star();
allStars = [star0, star1, star2, star3, star4];


// Rock class
var Rock = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 101;
    this.height = 83;
    this.sprite = "images/Rock.png";
};

// Rock object constructor
Rock.prototype = Object.create(GameObject.prototype);
Rock.prototype.constructor = Rock;

Rock.prototype.update = function(dt) {};

var rock0 = new Rock(202, -33);
var rock1 = new Rock(303, -33);
var rock2 = new Rock(303, 53);
var rock3 = new Rock(505, 53);
var rock4 = new Rock(505, -33);
var rock5 = new Rock(606, -33);
var rock6 = new Rock(404, -33);

var allRocks = [rock0, rock1, rock2, rock3, rock4, rock5, rock6];

// Enemies our player must avoid
var Enemy = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 75;
    this.height = 60;
    this.speed = 101 + Math.floor(Math.random() * 150);
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
    this.x += this.speed * 1.5 * dt;
    if (this.x >= 909) {
        this.x = -100;
    }
    this.checkCollisions();
    this.increaseRate();
};

Enemy.prototype.reset = function(dt) {
    if (this.x >= 909) {
        this.x = -100;
    }
};

// Check enemy collisions with player
Enemy.prototype.checkCollisions = function() {
    var enemy = this;
    if (player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y) {
        player.reset();
        player.holdStar = false;
        console.log("Ouch! You Got Hit!");
    }
};

Enemy.prototype.increaseRate = function() {
    var rateOfIncrease = 30;
    if (player.score >= 5 && this.speed < 200) {
        this.speed += rateOfIncrease;
    }
    if (player.score >= 12 && this.speed < 230) {
        this.speed += rateOfIncrease;
    }
    if (player.score >= 16 && this.speed < 260) {
        this.speed += rateOfIncrease;
    }
};

// Player subclass
var Player = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 60;
    //Array to help record last known player position
    this.playerPosition = [];
    this.sprite = playerMain;
    this.score = 0;
    this.lives = 5;
    this.holdStar = false;
};

// Player object constructor
Player.prototype = Object.create(GameObject.prototype);
Player.prototype.constructor = Player;

// update Player position
Player.prototype.update = function(dt) {
    document.getElementById('lives').innerHTML = player.lives;
    document.getElementById('score').innerHTML = player.score;
    // Update score of the player and reset player position
    if ((this.x === 404 && this.y < 73) && (this.holdStar = true)) {
        this.score++;
        this.reset();
        this.holdStar = false;
        this.sprite = playerMain;
        console.log("A star has been restored!");
    }
    // Prevents player from crossing Rocks
    for (i = 0; i < allRocks.length; i++) {
        if (this.x < allRocks[i].x + allRocks[i].width &&
            this.x + this.width > allRocks[i].x &&
            this.y < allRocks[i].y + allRocks[i].height &&
            this.y + this.height > allRocks[i].y) {
            this.x = this.playerPosition[this.playerPosition.length - 1][0];
            this.y = this.playerPosition[this.playerPosition.length - 1][1];
        }
    }
};

// Resets player position
Player.prototype.reset = function() {
    if (this.lives > 0 && this.holdStar === false) {
        this.lives--;
    } else if (this.lives > 0 && this.holdStar === true) {
        this.sprite = playerMain;
    }
    this.x = 404;
    this.y = 473;
};

// Place the player object in a variable called player
var player = new Player(404, 473);

// Place all enemy objects in an array called allEnemies
var enemy1 = new Enemy(0, 58);
var enemy2 = new Enemy(0, 141);
var enemy3 = new Enemy(0, 225);
var enemy4 = new Enemy(0, 58);
var enemy5 = new Enemy(0, 225);
var enemy6 = new Enemy(0, 308);
var enemy7 = new Enemy(0, 391);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7];

// Input method for player keyboard movement
Player.prototype.handleInput = function(key) {
    // Code to prevent player from crossing boundaries through switch statement
    switch (key) {
        case "right":
            if (this.x < 800) {
                //Records last known [x,y] value for playerPosition
                this.playerPosition.push([this.x, this.y]);
                this.x += 101;
            }
            break;
        case "left":
            if (this.x > 0) {
                this.playerPosition.push([this.x, this.y]);
                this.x -= 101;
            }
            break;
        case "up":
            if (this.y > 0) {
                this.playerPosition.push([this.x, this.y]);
                this.y -= 83;
            }
            break;
        case "down":
            if (this.y < 473) {
                this.playerPosition.push([this.x, this.y]);
                this.y += 83;
            }
            break;
        default:
            console.log("no movement");
    }
};

// Moon class
var Moon = function(x, y) {
    this.x = x;
    this.y = y;
    this.width = 500;
    this.height = 300;
    this.sprite = "images/Moon.png";
};

Moon.prototype = Object.create(GameObject.prototype);
Moon.prototype.constructor = Moon;

//Updates color of the moon based on player score
Moon.prototype.update = function(dt) {
    switch (player.score) {
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            this.sprite = "images/Moon1.png";
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
            this.sprite = "images/Moon2.png";
            break;
        case 20:
            this.sprite = "images/Moon3.png";
            break;
    }
};

var moon = new Moon(305, -130);


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