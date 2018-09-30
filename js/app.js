// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    //location
    this.x = x;
    this.y = y;
    this.xbox=0;

    //speed
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x >= 405){
        this.x = 0;
    }
    this.x += this.speed*dt; 
    getxAxisBoxNumber.call(this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//check for collison
Enemy.prototype.collison = function() {
    getxAxisBoxNumber.call(this);
};

function getxAxisBoxNumber(){
    let gridBox = [-101, 40, 140, 240, 340, 404];
    if(this.x >= gridBox[0] && this.x < gridBox[1]){
        this.xbox = 1;
    }
    if(this.x >= gridBox[1] && this.x < gridBox[2]){
        this.xbox = 2;
    } 
    if(this.x >= gridBox[2] && this.x < gridBox[3]){
        this.xbox = 3;
    } 
    if(this.x >= gridBox[3] && this.x < gridBox[4]){
        this.xbox = 4;
    } 
    if(this.x >= gridBox[4] && this.x <= gridBox[5]){
        this.xbox = 5;
    }     
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x=202;
    this.y=400;
    this.xbox=0;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    getxAxisBoxNumber.call(this);
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function() {
    this.x=202;
    this.y=400;
}

Player.prototype.handleInput = function(keyCode){
    switch(keyCode){
    case 'left':
        this.x -= 101;
        break;
    case 'up': 
        this.y -= 83;
        break;
    case 'right':
        this.x += 101;
        break;
    case 'down':
        this.y += 83;
        break;
    }
    //Edgecase handling
    //handle if player is at of border
    if(this.x >= 405){
        this.x = 0;
    }
    else if(this.x <= -1){
        this.x = 404;
    }
    //handle if player touches water, up or down call reset function
    //call reset
    if(this.y <= -1 || this.y >= 416){
        player.reset();
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
const player = new Player();

const fistLadyBug = new Enemy(-101,65,110);
const secondLadyBug = new Enemy(1,148,150);
const thirdLadyBug = new Enemy(1,220,40);

let allEnemies=[];
allEnemies.push(fistLadyBug, secondLadyBug, thirdLadyBug);

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
 