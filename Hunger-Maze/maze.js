let levels = [];

levels[0] = {
    map: [
        [0, 1, 0, 0, 0, 1, 1, 1],
        [0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 1, 0],
        [0, 0, 0, 1, 0, 0, 0, 0]
    ],
    player: {
        x: 0,
        y: 0
    },
    player2: {
        x: 0,
        y:1,
        
    },
    

    goal: {
        x: 4,
        y: 3
    },
    theme: 'default'
};

const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");

player1.addEventListener('click', () => {

})
function Game(id, level) {

    this.el = document.getElementById(id);

    this.tileTypes = ['floor', 'wall'];

    this.tileDim = 92;

    // inherit the level's properties: map, player start, goal start.
    this.map = level.map;
    this.theme = level.theme
    this.player = { ...level.player };
    this.player2 = { ...level.player2 };
    this.goal = { ...level.goal };
    this.timeLeft = 10;
    this.gameOver = false;
}

Game.prototype.drawMap = function () {
    let tiles = document.getElementById('tiles');
    // Resets old tiles if any exists
    tiles.innerHTML = '';
    this.el.className = 'game-container ' + this.theme;


    // Creates tiles from map (0 is floor, 1 is wall)
    for (var y = 0; y < this.map.length; ++y) {

        for (var x = 0; x < this.map[y].length; ++x) {

            let tileCode = this.map[y][x];

            let tileType = this.tileTypes[tileCode];

            let tile = this.createEl(x, y, tileType);
            
            tiles.appendChild(tile); // add to tile layer
        }
    }

    //Create the player
    let playerTile = this.createEl(this.player.x, this.player.y, 'player');
    tiles.appendChild(playerTile)

    let player2Tile = this.createEl(this.player2.x, this.player2.y, 'player2');
    tiles.appendChild(player2Tile) 

    // Creates the prize/goal
    let goalTile = this.createEl(this.goal.x, this.goal.y, "goal")
    tiles.appendChild(goalTile)
}
Game.prototype.createEl = function (x, y, type) {
    // create one tile.
    let el = document.createElement('div');

    // two class names: one for tile, one or the tile type.
    el.className = type;

    // set width and height of tile based on the passed-in dimensions.
    el.style.width = el.style.height = this.tileDim + 'px';

    // set left positions based on x coordinate.
    el.style.left = x * this.tileDim + 'px';

    // set top position based on y coordinate.
    el.style.top = y * this.tileDim + 'px';

    return el;
}
Game.prototype.sizeUp = function () {

    // inner container so that text can be below it
    let map = this.el.querySelector('.maze-map');

    // inner container, height. Need this.map
    map.style.height = this.map.length * this.tileDim + 'px';

    map.style.width = this.map[0].length * this.tileDim + 'px';
}
//Define a global varaible to track if it's player 1's turn
window.player1turn=true;
Game.prototype.listenForKeys = function () {
    let self = this;
    document.onkeydown = function (e) {
        const initialPosition = { x: self.player.x, y: self.player.y }
        e = e || window.event;

        // If statement is to meant to check to see if it is player 1's turn
        if(window.player1turn){
            // If up is pressed, and the player isn't out of bounds at the top
            if (e.key == 'ArrowUp' && self.player.y > 0) {
                self.player.y = self.player.y - 1
            }
            // If down is pressed, and the player isn't out of bounds at the bottom
            else if (e.key == 'ArrowDown' && self.player.y < self.map.length - 1) {
                self.player.y = self.player.y + 1
            }
            else if (e.key == 'ArrowLeft' && self.player.x > 0) {
                self.player.x = self.player.x - 1
            }
            else if (e.key == 'ArrowRight' && self.player.x < self.map[0].length - 1) {
                self.player.x = self.player.x + 1
            }

            //Check to see if new position will be a wall
            if (self.map[self.player.y][self.player.x] == 1) {
                // If it is, change the position to the initial position (Before we moved it)
                self.player.x = initialPosition.x;
                self.player.y = initialPosition.y;
            }

            // ReDraw the map with the new position data
            self.drawMap()

            // If the player position is the same position as the goal/prize position
            if (self.player.x == self.goal.x && self.player.y == self.goal.y) {

                // set a delay by 500ms to do an alert, reset the position, and set gameOver to true. redraw map
                setTimeout(function () {
                    self.player.x = levels[0].player.x;
                    self.player.y = levels[0].player.y;
                    self.gameOver = true;
                    alert("Congratulations to our new Tribute!")
                    //set player1's score to time left, by looking at how much time is left on the timer
                    window.player1Time= document.getElementById("timer").innerHTML;
                    // indicate if player1's turn is over
                    window.player1turn=false;
                    alert("Second Tribute will start!")

                    //create counter for each player and initialize it to 0, if the player wins counter = 1,
                    //when 2 players finished the game compare the counter valuesand alert who wins the game

                    //start a new game for player2      
                    self.drawMap()
                }, 500);
            }
        }else {
            // If up is pressed, and the player isn't out of bounds at the top
            if (e.key == 'ArrowUp' && self.player2.y > 0) {
                self.player2.y = self.player2.y - 1
            }
            // If down is pressed, and the player isn't out of bounds at the bottom
            else if (e.key == 'ArrowDown' && self.player2.y < self.map.length - 1) {
                self.player2.y = self.player2.y + 1
            }
            else if (e.key == 'ArrowLeft' && self.player2.x > 0) {
                self.player2.x = self.player2.x - 1
            }
            else if (e.key == 'ArrowRight' && self.player2.x < self.map[0].length - 1) {
                self.player2.x = self.player2.x + 1
            }

            //Check to see if new position will be a wall
            if (self.map[self.player2.y][self.player2.x] == 1) {
                // If it is, change the position to the initial position (Before we moved it)
                self.player2.x = initialPosition.x;
                self.player2.y = initialPosition.y;
            }

            // ReDraw the map with the new position data
            self.drawMap()

            // If the player position is the same position as the goal/prize position
            if (self.player2.x == self.goal.x && self.player2.y == self.goal.y) {

                // set a delay by 500ms to do an alert, reset the position, and set gameOver to true. redraw map
                setTimeout(function () {
                    self.player2.x = levels[0].player2.x;
                    self.player2.y = levels[0].player2.y;
                    self.gameOver = true;
                    //set player2's score to time left, by looking at how much time is left on the timer
                    window.player2Time= document.getElementById("timer").innerHTML;

                    alert("Congratulations to our new Tribute!")
                    
                    //Compare player 1 and 2 score to see who wins
                    if(window.player1Time>window.player2Time){
                        alert("Player 1 wins! \n Time Spared: \nPlayer 1: "+window.player1Time+" secs \nPlayer 2: "+window.player2Time+" secs")
                    }else if(window.player1Time<window.player2Time){
                        alert("Player 2 wins! \n Time Spared: \nPlayer 1: "+window.player1Time+" secs \nPlayer 2: "+window.player2Time+" secs")
                    }else {
                        alert("Game is a tie! \n Time Spared: \nPlayer 1: "+window.player1Time+" secs \nPlayer 2: "+window.player2Time+" secs")
                    }

        
                    
                    //create counter for each player and initialize it to 0, if the player wins counter = 1,
                    //when 2 players finished the game compare the counter valuesand alert who wins the game

                    //start a new game for player2      
                    self.drawMap()
                }, 500);
            }
        }




    }
}

Game.prototype.listenForClicks = function () {
    let self = this;
    // Listen for restart button click
    document.getElementById("Restart").onclick = function () {
        // Reset position to initial map position, redraw map
        self.player.x = levels[0].player.x;
        self.player.y = levels[0].player.y;

        self.startTimer(self);
        self.drawMap();
    }

    // Listen for start button click
    document.getElementById("Start").onclick = function () {
        /// Set game over to false, reset player positioning
        self.gameOver = false;
        self.player.x = levels[0].player.x;
        self.player.y = levels[0].player.y;
        // Start timer
        self.startTimer(self);
    }
}

Game.prototype.startTimer = function (self) {
    // set an interval that runs every 1000miliseconds (1second)
    let timerInterval = setInterval(() => {
        // If the game is over, stop the interval to stop counting down when it's over
        if (self.gameOver) {
            // Stop the interval (otherwise it would keep going)
            clearInterval(timerInterval)
            // Reset time left to 30seconds
            self.timeLeft = 11;
        }

        // Lower the time left by 1 since a second has passed since this was last ran
        this.timeLeft = this.timeLeft - 1;
        // Set the dom element with the timer's value to our new timeLerft
        document.getElementById("timer").innerHTML = self.timeLeft;

        // If the timeLeft is 0, they're done
        if (this.timeLeft === 0) {
            clearInterval(timerInterval)
            self.gameOver = true;
            alert("Time up!")
        }

    }, 1000);
}

function init() {
    //Create a new game with the first level defined
    let myGame = new Game('maze-container-1', levels[0]);

    myGame.drawMap();
    myGame.listenForKeys();
    myGame.listenForClicks();
    myGame.sizeUp();
}
init();

