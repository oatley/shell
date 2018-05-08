let config = {
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
let game = new Phaser.Game(config);

// State control
let isTitleScreen = true;
let isGameOver = false;

// JUNK CLEANUP
let gameOver;
let youwinscreen;
let titlescreen;
let titlescreenbool = true;
let endGame = false;
let sci;
let jan;

// Player 1 group
let player1Group;

// Player 2 group
let player2Group;

// maps
let groundGroup;
let worldBoundsGroup;
let platformGroup;
let backgroundGroup;

// screens/ui
let displayScreensGroup;

// music
let music;

// Hitbox
let player1AttackGroup;
let player2AttackGroup;

let range = Phaser.ArrayUtils.numberArray;

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

    // Accept controller input for players
    controller.controlAllPlayers(player1Group, player2Group);

    // Control game state (title screen, game over screen, in game)
    if (gameOver && resetGameButton.isDown) {
        console.log('resetting the game');
        cleanUp();
        startGame();
    } else if (isTitleScreen && resetGameButton.isDown) {
        isTitleScreen = false;
        startGame();
    }

}
