var config = {
    width: 480,
    height: 270,
    renderer: Phaser.AUTO,
    antialias: false,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
}
var game = new Phaser.Game(config);

/* Don't need game state?
console.log('load.js');
game.state.add('load', load); // load contains everything for preload
console.log('audio.js');
game.state.add('audio', audio); // functions for controlling the audio
console.log('controller.js');
game.state.add('controller', controller); // controller contains setup for keyboard and controller support
console.log('levels.js');
game.state.add('levels', levels);
console.log('character.js');
game.state.add('characters', characters);
*/



// Player objects
var player1;
var player2;

var gameOver;
var youwinscreen;
var titlescreen;
var titlescreenbool = true;
var sci;
var jan;

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
var switchPlayer1Button;

// Player2Controls objects
var upPlayer2Button;
var downPlayer2Button;
var leftPlayer2Button;
var rightPlayer2Button;
var attackPlayer2Button;
var switchPlayer2Button;

// Music Player1Controls
var musicMuteButton;
var musicPlus1Button;
var musicPlus2Button;
var musicMinus1Button;
var musicMinus2Button;


// Default player stats
var playerDirection = 'left';
var playerJumpSensitivity = -5; // Negative number, default is about -2.8 falling always
var playerMoveSpeed = 50; // 50
var playerJumpSpeed = -650; // Negative number // -350
var playerJumping = false;

// maps
var groundGroup;
var worldBoundsGroup;
var platformGroup;
var skyGroup;

// music
var music;

// Hitbox
var player1AttackGroup;
var player2AttackGroup;

var range = Phaser.ArrayUtils.numberArray;
//var numbers = new Phaser.ArrayUtils();







function preload() {
    // Preload loadImages
    load.loadImages();
    load.loadSpriteSheets();
    load.loadMusic();

}



function dealDamage(bounds, player) {
    console.log('dealing dmg to', player.model);
    // destroy hitbox created to detect a hit on player
    bounds.destroy();
    characters.switchPlayerStage(player);
}

function cleanPlayers() {
    if (player1Group.length > 0) {
        player1Group.forEach(function(player) {
            player.attackTimer.stop();
            player.attackTimer2.stop();
            player.attackBox.destroy();
            player.destroy();
        }, this);
    }
    if (player2Group.length > 0) {
        player2Group.forEach(function(player) {
            player.attackTimer.stop();
            player.attackTimer2.stop();
            player.attackBox.destroy();
            player.destroy();
        }, this);
    }

}

function cleanPlatforms(platform) {
    if (platformGroup.length > 0) {
        //while(platformGroup.length > 0) { // Because it refuses to run the function on all items in the group
            console.log('platform', platformGroup.length);
            platformGroup.forEach(function(platform) {
                platform.destroy();
            }, this);
        //}
    }
}

function cleanGround() {
    if (groundGroup.length > 0) {
        //while(groundGroup.length > 0) { // Because it refuses to run the function on all items in the group
            console.log('ground', groundGroup.length);
            groundGroup.forEach(function(ground) {
                ground.destroy();
            }, this);
        //}
    }
}

function cleanUp() {
    cleanPlayers();
    cleanGround();
    cleanPlatforms();
}


function youLose(player) {
    cleanCharacter(player);
    youwinscreen = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
    youwinscreen.anchor.setTo(0.5, 0.5);
    gameOver = true;
}

function startGame() {
    cleanUp();
    if (youwinscreen) {
        youwinscreen.destroy();
    }
    gameOver = false;

    // Create map1
    levels.createMap1(groundGroup, worldWrapGroup, platformGroup);
    cleanUp();
    // Create characters
    //createBattery(player1Group);
    characters.createMech(player1Group);
    characters.createKnight(player2Group);


    game.world.bringToTop(groundGroup);
    game.world.bringToTop(player1Group);
    game.world.bringToTop(player2Group);
    game.world.bringToTop(platformGroup);

    sci = game.add.image(0, game.world.height - 64, 'sci');
    jan = game.add.image(game.world.width - 64, game.world.height - 64, 'jan');
}

function create() {
    // Start the simple physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background colour
    game.stage.backgroundColor = '#6bc4ff';

    // Configure fullscreen mode and scale
    game.scale.minWidth = 480;
    game.scale.minHeight = 270;
    game.scale.maxWidth = 1920;
    game.scale.maxHeight = 1080;
    game.scale.pageAlignHorizontally = true;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.smoothed = false;
    //game.input.activePointer.leftButton.onDown.add(screen.toggleFullscreen, this);

    // bgMusic
    music = game.add.audio('bgmusic');
    //audio.startMusic();


    // Setup controls

    controller.player1Controls();
    controller.player2Controls();
    controller.musicControls();
    cursors = game.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;

    // Create player groups
    player1Group = game.add.group();
    player2Group = game.add.group();

    // Ground
    groundGroup = game.add.group();
    groundGroup.enableBody = true;

    // World wrap
    worldWrapGroup = game.add.group();
    worldWrapGroup.enableBody = true;

    // platforms
    platformGroup = game.add.group();
    platformGroup.enableBody = true;

    // Attack groups
    player1AttackGroup  = game.add.group();
    player2AttackGroup  = game.add.group();



    //startGame();
    titlescreen = game.add.sprite(game.world.width/2, game.world.height/2, 'title');
    titlescreen.anchor.setTo(0.5, 0.5);

    // Start background music and on resume and pause callbacks
    this.game.onPause.add(audio.pauseMusic, this);
    this.game.onResume.add(audio.resumeMusic, this);
    audio.startMusic();
    //startGame();
}

function update() {
    // Colliders
    var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
    var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player1Group, worldWrapGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player2Group, worldWrapGroup);
    var charColliders = game.physics.arcade.collide(player1Group, player2Group);
    var attackColliders = game.physics.arcade.overlap(player1Group, player2AttackGroup);
    var attackColliders = game.physics.arcade.overlap(player2Group, player1AttackGroup);

    // Control movement and animations for player 1
    if (player1Group.length > 0) {
        player1Group.forEach(function(player) {controller.controlPlayer(player, player1Group);}, this);
    }

    // Control movement and animations for player 2
    if (player2Group.length > 0) {
        player2Group.forEach(function(player) {controller.controlPlayer(player, player2Group);}, this);
    }

    if (gameOver && resetGameButton.isDown) {
        console.log('resetting the game');
        cleanUp();
        startGame();
    } else if (titlescreenbool && resetGameButton.isDown) {
        titlescreenbool = false;
        titlescreen.destroy();
        startGame();
    }

}

function render () {
    //game.debug.geom(rect,'#0fffff');

}
