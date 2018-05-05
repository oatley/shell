var game = new Phaser.Game(480, 270, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

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

// Default player stats
var playerDirection = 'left';
var playerJumpSensitivity = -5; // Negative number, default is about -2.8 falling always
var playerMoveSpeed = 250;
var playerJumpSpeed = -650; // Negative number
var playerJumping = false;



function toggleFullscreen() {
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

function createBattery(playerGroup) {
    // Positions
    if (playerGroup === player1Group) {
        var x = game.world.width/2 - 100 ;
        var y = game.world.height - 100
    } else if (playerGroup === player2Group) {
        var x = game.world.width/2 + 100 ;
        var y = game.world.height - 100
    }

    // Design each character with custom stuff
    var player = game.add.sprite(x, y, 'battery');
    game.physics.arcade.enable(player);

    // Custom attributes
    player.playerDirection = playerDirection;
    player.playerJumpSensitivity = playerJumpSensitivity;
    player.playerMoveSpeed = playerMoveSpeed;
    player.playerJumpSpeed = playerJumpSpeed;
    player.playerJumping = playerJumping;

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = true;
    player.body.setSize(32, 60, 16, 0);
    player.body.checkCollision.up = false;


    //  Our two animations, walking left and right.
    player.animations.add('idle_left', [0, 1, 2, 3, 4, 5, 6], 10, true);
    player.animations.add('idle_right', [7, 8, 9, 10, 11, 12, 13], 10, true);
    player.animations.add('fall_left', [14], 10, false);
    player.animations.add('fall_right', [15], 10, false);
    player.animations.add('walk_left', [16, 17, 18, 19, 20, 21], 10, true);
    player.animations.add('walk_right', [22, 23, 24, 25, 26, 27, ], 10, true);
    player.animations.add('jump_left', [28], 10, false);
    player.animations.add('jump_right', [29], 10, false);
    player.animations.add('weld_left', [32, 33, 34, 35, 36, 37, 38, 39, 40], 10, true);
    player.animations.add('weld_right', [48, 49, 50, 51, 52, 53, 54, 55, 56], 10, true);

    // Add to group player1 or player2
    playerGroup.add(player);
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

function controlPlayer(player, group) {
    // Function accept the character (knight, mech, etc) and "player1" or "player2"
    if (group === player1Group) {
        var upButton = upPlayer1Button;
        var downButton = downPlayer1Button;
        var leftButton = leftPlayer1Button;
        var rightButton = rightPlayer1Button;
    } else if (group == player2Group) {
        var upButton = upPlayer2Button;
        var downButton = downPlayer2Button;
        var leftButton = leftPlayer2Button;
        var rightButton = rightPlayer2Button;
    }

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (leftButton.isDown) {
       //  Move to the right
       player.body.velocity.x = -player.playerMoveSpeed;
       player.playerDirection = 'left';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_left');
           } else {
               player.animations.play('fall_left');
           }
       } else {
           player.animations.play('walk_left');
       }
    } else if (rightButton.isDown) {
       //  Move to the right
       player.body.velocity.x = player.playerMoveSpeed;
       player.playerDirection = 'right';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_right');
           } else {
               player.animations.play('fall_right');
           }

       } else {
           player.animations.play('walk_right');
       }
    } else {
        if (player.playerDirection == 'left') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_left');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play('fall_left');
           } else {
               player.animations.play('idle_left');
           }
        } else if (player.playerDirection == 'right') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_right');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play('fall_right');
           } else {
               player.animations.play('idle_right');
           }
        }
    }

       //  Allow the player to jump if they are touching the ground.
   if (!upButton.isDown && player.playerJumping && player.body.velocity.y < 0) {
       player.body.velocity.y = player.body.velocity.y * 0.5;
       player.playerJumping = false;
   } else if (upButton.isDown && (player.body.touching.down || player.body.blocked.down)) {
       player.body.velocity.y = player.playerJumpSpeed;
       player.playerJumping = true;
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

    // Background colour
    game.stage.backgroundColor = '#943021';

    game.scale.minWidth = 480;
    game.scale.minHeight = 270;
    //game.scale.maxWidth = 1920;
    //game.scale.maxHeight = 1080;
    //game.scale.pageAlignHorizontally = true;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.smoothed = false;

    // Enable fullscreen functionality
    //game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    //console.log(Phaser.ScaleManager);
    game.input.activePointer.leftButton.onDown.add(toggleFullscreen, this);
    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;


    // Setup controls
    player1Controls();
    player2Controls();
    cursors = game.input.keyboard.createCursorKeys();

    // Capture mouse input for toggleFullscreen
    game.input.mouse.capture = true;

    // Create player groups
    player1Group = game.add.group();
    player2Group = game.add.group();

    // Create characters
    createBattery(player1Group);


}

function update() {
    // Control movement and animations for player 1
    player1Group.forEach(function(player) {controlPlayer(player, player1Group);}, this);

    // Control movement and animations for player 2
    //player2Group.forEach(function(player) {controlPlayer(player, 'player2');}, this);
}

function render() {

}
