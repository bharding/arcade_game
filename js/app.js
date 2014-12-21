// Enemies our player must avoidvar enemyPosY = [60, 143, 226];


var enemyPosY = [65, 145, 267];
var enemySpeed = [100, 450, 600, 200, 250, 300, 400];


var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started



    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -100;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        if (this.x > 600) {
        this.x = -100;
        this.y = enemyPosY[Math.floor(Math.random() * 3)];
    //--activates enemy instances by incrementing their x positions by a randomly determined speed--
    } else {
        this.x += (Math.random() * this.speed + 1) * dt;
    }
 
}


//creates instance of enemies
var number 
var allEnemies = [];


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

function createEnemies(number) {


    for (var i = 0; i < number; i++) {
        var enemy = new Enemy();
        allEnemies.push(enemy);

    }
}
createEnemies(6);


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var player = function() {
  this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 430;
}





player.prototype.update =function(dt){
    this.x * (dt);
    this.y * (dt);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

player.prototype.reset = function() {
  this.x = 200;
  this.y = 430;
}

player.prototype.handleInput = function(playMove) {
  if (playMove == 'left' && this.x > 0) {
    this.x -= 101;
    }
  else if (playMove == 'right' && this.x < 400) {
    this.x += 101;
  }
  else if (playMove == 'up' &&  this.y > 30) {
    this.y -= 101;
  }
  else if (playMove == 'down' && this.y < 430) {
    this.y += 101;
  }
}

var player = new player();

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
// cross-browser request AnimationFrame
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();
