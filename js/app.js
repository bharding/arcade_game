
/*global Audio: false */
// sounds tracks
var gameover = new Audio("sounds/game-over.wav");
var lbite = new Audio("sounds/monster-bite.wav");
var playerreset = new Audio("sounds/player-reset.wav");
var playerbite = new Audio("sounds/player-bite.wav");
var gamewin = new Audio("sounds/win.wav");

var enemyPosY = [65, 145, 267];
var enemySpeed = [60, 325, 600, 200, 250, 100, 400];
var playerS = 'images/sprites.png';
var prince = 'images/char-boy.png';    //char-boy.png'

var Enemy = function () {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
   // "use strict";
    this.sprite = 'images/lizard.png';
    this.x = -300;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      if (this.x > 600) {
        this.x = -300;
        this.y = enemyPosY[Math.floor(Math.random() * 3)];
    //--activates enemy instances by incrementing their x positions by a randomly determined speed--
      } else {
        this.x += (Math.random() * this.speed + 1) * dt;
      }

  }
Enemy.prototype.reset = function(){
    this.x = -300;
    this.y = enemyPosY[Math.floor(Math.random() * 3)];
    this.speed = enemySpeed[Math.floor(Math.random() * 7)];;
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

var foodPosY = [85, 170, 268];
var foodSpeed = [50, 450, 500, 100, 250, 300, 400];

//food will be eaten by both providedlayer and enemy
var Food = function() {
    // The image/sprite for our food, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/bee.png';
    this.x =600;
    this.y = foodPosY[Math.floor(Math.random() * 3)];
    this.speed = foodSpeed[Math.floor(Math.random() * 7)];;
  }

// Update the food position, required method for game
// Parameter: dt, a time delta between ticks
Food.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
      if (this.x >600) {
        this.x =600;
        this.y = foodPosY[Math.floor(Math.random() * 3)];
    //--activates food instances by incrementing their x positions by a randomly determined speed--
      } else {
        if (this.x < -15){
            this.x = 600;
            this.x -=(Math.random() * this.speed + 1) * dt
          }else
          {
          this.x -=(Math.random() * this.speed + 1) * dt;
          }
        }
      }
Food.prototype.reset = function(){
    this.x = -600;
    this.y = foodPosY[Math.floor(Math.random() * 3)];
    this.speed = foodSpeed[Math.floor(Math.random() * 7)];;
    }

//creates instance of food(bees)
var numbers
var allFoods = [];


// Draw the food on the screen, required method for game
Food.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

function createFoods(numbers) {
    for (var i = 0; i < numbers; i++) {
        var food = new Food();
        allFoods.push(food);

      }
    }
createFoods(6);

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function() {
  this.sprite = playerS;
  this.prince = prince;
  this.x = 200;
  this.y = 455;
  this.playerW = 75;
  this.playerH = 78;
  this.playerX= 1;
  this.playerY =0;
  }

player.prototype.update =function(dt){
    this.x * (dt);
    this.y * (dt);
  }
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

player.prototype.render = function() {
  var meter = document.getElementById('myMeter');
  var sprite;

  if (meter.value > 99){
      sprite= this.prince;
      this.playerW = 101;
      this.playerH = 171;
  }
  else  {
      sprite = this.sprite;
      this.playerW = 75;
      this.playerH = 78;
  }

    
    ctx.drawImage(Resources.get(sprite),this.playerX, this.playerY, this.playerW, this.playerH, this.x, this.y, this.playerW, this.playerH)
  }

player.prototype.reset = function() {
  this.x = 200;
  this.y = 455;

  }
player.prototype.handleInput = function(playMove) {
  if (playMove == 'left' && this.x > 0) {
      this.playerX = 299;
      this.playerY =0;
      this.x -= 30;
      }
  else if (playMove == 'right' && this.x < 530) {
     this.playerX = 102;
     this.playerY =0;
     this.x += 30;
    }
    else if (playMove == 'up' &&  this.y -40> 30) {
      this.playerX = 1;
      this.playerY =0;
      this.y -= 30;
      }
  else if (playMove == 'down' && this.y < 430) {
    this.playerX = 201;
    this.playerY =0;
    this.y += 30;
    }
  }

var player = new player();
// disables the window scroll bar so game stays stationary in window
window.addEventListener("keydown", function (e) {
    if ([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
        }
    }, false);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

      };
    player.handleInput(allowedKeys[e.keyCode]);
  });

var v=0;  // points when enemy eats player minus 8 from meter bar based on collision detection
var eat=0; // point when enemy eats each food minus 2 from meter bar based on collision detection
var d=0; // point when player  eats each food add 9  to meter bar based on collision detection
var meterm;
var timer;

 /* The lifeline of the player, manipulates the Meter bar; the goal is to fill the meter bar to 100%,  meter bar is adjusted by collision detection (isColliding) */
function meters(){
    var meter = document.getElementById('myMeter');
    var element = document.getElementById(status);
    var timer = setInterval(function(){
         isColliding();
            meterm = d - (eat +v)
            meter.value = meter.value*1+ meterm;
              v =0;
              eat =0;
              d =0;
              meterm;
        if(meter.value <= meter.min) {
          var msgoutput = "OUT OF ENERGY";
          document.getElementById("mymsg").value = msgoutput;
            gameOver();
            clearTimeout(timers);
            clearInterval(timer);}
        if (meter.value>99){
            clearInterval(timer);
            clearTimeout(timers);
            this.x = 200;
            this.y = 400;
            gameWin()    
            }
        }, 1000)
    };
meters();
var timers;
// timer count down games ends after 60 seconds
function countDown(secs, elem, myMeter) {
  var element = document.getElementById(elem);
  var meter = document.getElementById('myMeter');
  element.innerHTML= "You have " + secs + " seconds";

  if (secs < 1) {
    var msgoutput = "TOO SLOW";
    document.getElementById("mymsg").value = msgoutput;      return gameOver();
    clearInterval(timer);    
    clearTimeout(timers);       
    }
    secs--;
    timers = setTimeout('countDown('+secs+' ,"'+elem+'")', 1000);  
  }
countDown(45,"status", myMeter);

function stopTimer()    
    {  
    //you call clearInterval() and pass the variable
    //containing the timer as argument used in iscolliding
    clearTimeout(timers);
    }

/*  determines if there is collision between enemy and player -meter bar decrease by 8, enemy and food(bees)  decreases meter bar by 2 and player and food(flies)  increases the meter by 9*/
function isColliding(enemy, player, food, timers) {
var element = document.getElementById(status);
 var meter = document.getElementById('myMeter');
    for(var i in enemy){    //checks collision between enemy and player, resets player on board
      if ((player.x  - enemy[i].x  < 80 )&& (player.y  - enemy[i].y < 80) && (player.x - enemy[i].x > -40 )&& (player.y - enemy[i].y > -40) ){
        v =5;   // reduces the meter(lifeline by 5)
        playerreset.play()  //plays the sound when collisionn
        player.reset()
      }
    else
      for(var t  = 0; t < food.length; t++){  //checks collision between emeny and food(bees)
        if ((enemy[i].x  - food[t].x  < 30 )&& (enemy[i].y  - food[t].y < 10) && (enemy[i].x - food[t].x > -20 )&& (enemy[i].y - food[t].y > -20) ){
          lbite.play() //play sound of enemy eating bug
          eat = 1;    //reduces meter by 1 for each bug eaten
          food.splice(food[t],1);  // removes bug from screen
        if (food.length < 1 & meter.value>99){//if the meter is greater the 99 and less than one bee on screen winner
          gameWin();
          clearInterval(timer);//stops meter
          secs=0;
          stopTimer(timers)   // stop countdown
        }
          else
            if (food.length < 1){  //if there is only one bee on the screen game over
              var msgoutput = "GET READY TO STARVE";
              document.getElementById("mymsg").value = msgoutput;
                gameOver();
                clearInterval(timer);
                secs=0;
                stopTimer(timers)          
                }
     }
    else // if player eats food meter is increased by nine
      if ((player.x  - food[t].x  < 40 )&& (player.y  - food[t].y < 40) && (player.x - food[t].x > -40 )&& (player.y - food[t].y > -20) ){
        d =9;
          playerbite.play()
          food.splice(food[t],1);
          if (food.length <3){
            createFoods(6);
            }
      }
    }
  }
}

// Game over
function gameOver() {
    document.getElementById('game-over').style.display = 'block';
    document.getElementById('game-over-overlay').style.display = 'block';
        isGameOver = true; 
        gameover.play();           
    allEnemies=[];
    allFoods=[];

}
// Game Win
function gameWin() {
    document.getElementById('game-win').style.display = 'block';
    document.getElementById('game-win-overlay').style.display = 'block';
      var msgoutput = "YOU DID IT";
      document.getElementById("mymsg1").value = msgoutput;
    isGameWin = true;  
    gamewin.play();          
    allEnemies=[];
    allFoods=[];

}



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
