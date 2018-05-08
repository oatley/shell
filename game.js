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

// State control
var isTitleScreen = false;
var isGameOver = false;



// JUNK CLEANUP
var gameOver;
var youwinscreen;
var titlescreen;
var titlescreenbool = true;
var endGame = false;
var sci;
var jan;

// Player 1 group
var player1Group;

// Player 2 group
var player2Group;

// maps
var groundGroup;
var worldBoundsGroup;
var platformGroup;
var backgroundGroup;

// screens/ui
var displayScreensGroup;

// music
var music;

// Hitbox
var player1AttackGroup;
var player2AttackGroup;

var range = Phaser.ArrayUtils.numberArray;

// Preload images, spritesheets, and audio
function preload() {
    load.loadImages();
    load.loadSpriteSheets();
    load.loadMusic();
}

// cleanUp clears all sprites from the screen and deletes the data associated with them
function cleanUp() {
    clean.cleanPlayers(player1Group, player2Group);
    clean.cleanGround(groundGroup);
    clean.cleanPlatforms(platformGroup);
    clean.cleanBackground(backgroundGroup);
    clean.cleanScreens(displayScreensGroup);
    if(sci)sci.destroy();
    if(jan)jan.destroy();
}

function youLose(player) {
    clean.cleanPlayers(player1Group, player2Group);
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
    levels.createMap1(groundGroup, worldWrapGroup, platformGroup, backgroundGroup);
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

    // Configure resolution and scale
    screen.displayConfiguration();

    // bgMusic
    audio.prepAudio();

    // Setup controls
    controller.prepController();
    controller.player1Controls();
    controller.player2Controls();
    controller.musicControls();


    // Create player groups
    player1Group = game.add.group();
    player2Group = game.add.group();

    // Attack groups
    player1AttackGroup  = game.add.group();
    player2AttackGroup  = game.add.group();

    // Ground group
    groundGroup = game.add.group();
    groundGroup.enableBody = true;

    // World wrap group
    worldWrapGroup = game.add.group();
    worldWrapGroup.enableBody = true;

    // platforms group
    platformGroup = game.add.group();
    platformGroup.enableBody = true;

    // background group
    backgroundGroup = game.add.group();

    // displayScreensGroup
    displayScreensGroup = game.add.group();




    screen.displayTitleScreen(displayScreensGroup);


    // Start background music and on resume and pause callbacks
    this.game.onPause.add(audio.pauseMusic, this);
    this.game.onResume.add(audio.resumeMusic, this);
    audio.startMusic();
    //startGame();
}

function update() {
    if (endGame) {
        endGame = false;
        youLose();
    }

    // Colliders


    collisions.collide();
    collisions.overlap();


    controller.controlAllPlayers(player1Group, player2Group);

    if (gameOver && resetGameButton.isDown) {
        console.log('resetting the game');
        cleanUp();
        startGame();
    } else if (isTitleScreen && resetGameButton.isDown) {
        isTitleScreen = false;
        //titlescreen.destroy();
        startGame();
    }

}

function render () {
    //game.debug.geom(rect,'#0fffff');

}
