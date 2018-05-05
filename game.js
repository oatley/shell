var game = new Phaser.Game(480, 270, Phaser.AUTO, '', { preload: preload, create: create, update: update });

// Player objects
var player1;
var player2;

// Player 1 group
var player1Group;

// Player 2 group
var player2Group;

// Player1Controls objects
var upPlayer1Button;
var downPlayer1Button;
var leftPlayer1Button;
var rightPlayer1Button;
var attackPlayer1Button;

// Player2Controls objects
var upPlayer2Button;
var downPlayer2Button;
var leftPlayer2Button;
var rightPlayer2Button;
var attackPlayer2Button;

function toggleFullscreen()) {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

// Set player 1 controls
function player1Controls() {
    // Keyboard controls
    upPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.D);
    attackPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.F);

    // Xbox controller controls

}

// Set player 2 controls
function player2Controls() {
    // Keyboard controls
    upPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    attackPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.L);

    // Xbox controller controls

}

// Load images
function loadImages() {
    // Load images background

    // Load images platforms

    // Load images ground

}

// Load spritesheets
function loadSpriteSheets() {
    game.load.spritesheet('battery', 'assets/sprites/characters/battery-spritesheet.png', 64, 64);


}

function loadAnimations() {
    // Create the animation frames for each character

}

function createKnight() {
    // Design each character with custom stuff

}

function createMech() {
    // Design each character with custom stuff

}

function createCrazyBilly() {
    // Design each character with custom stuff

}

function controlPlayer(character, player) {
    // Function accept the character (knight, mech, etc) and "player1" or "player2"
    if (player == 'player1') {
        var upButton = upPlayer1Button;
        var downButton = downPlayer1Button;
        var leftButton = leftPlayer1Button;
        var rightButton = rightPlayer1Button;
    } else if (player == 'player2') {
        var upButton = upPlayer2Button;
        var downButton = downPlayer2Button;
        var leftButton = leftPlayer2Button;
        var rightButton = rightPlayer2Button;
    }



}



function preload() {
    // Preload loadImages
    loadImages();
    loadSpriteSheets();


}

function create() {
    // Start the simple physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Enable fullscreen functionality
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // Setup controls
    Player1Controls();
    Player2Controls();
    cursors = game.input.keyboard.createCursorKeys();

    // Capture mouse input for toggleFullscreen
    game.input.mouse.capture = true;
}

function update() {
    // toggleFullscreen with click
    if (game.input.activePointer.leftButton.isDown) {
        toggleFullscreen();
    }

    // Control movement and animations for player 1
    player1Group.forEach(function(player) {controlPlayer(player, 'player1');}, this);

    // Control movement and animations for player 2
    player2Group.forEach(function(player) {controlPlayer(player, 'player2');}, this);
}
