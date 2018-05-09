let config = {
    width: 480,
    height: 270,
    renderer: Phaser.AUTO,
    antialias: false,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update
    }
}
let game = new Phaser.Game(config);


// Groups for all game objects
let player1Group; // player 1
let player2Group; // player 2
let groundGroup; // the ground
let worldBoundsGroup; // invisible borders
let platformGroup; // platforms
let backgroundGroup; // sky, clouds, mountains
let displayScreensGroup; // titlescreen, end game screen
let player1AttackGroup; // hitbox for player 1
let player2AttackGroup; // hitbox for player 2
let portraitsGroup; // Player portraits



// Preload images, spritesheets, and audio
function preload() {
    load.loadImages();
    load.loadSpriteSheets();
    load.loadMusic();
}



function startGame() {
    // Clean up all left over sprites
    clean.cleanUpAll();

    // Create map1
    levels.createMap1();
    // Create characters
    characters.createMech(player1Group);
    characters.createKnight(player2Group);
}

function create() {
    // Start the simple physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Configure resolution and scale
    screen.displayConfiguration();

    // Setup audio
    audio.prepAudio();

    // Setup controls
    controller.prepController();
    controller.player1Controls();
    controller.player2Controls();
    controller.musicControls();

    // Create phaser groups
    player1Group = game.add.group();
    player2Group = game.add.group();
    player1AttackGroup  = game.add.group();
    player2AttackGroup  = game.add.group();
    groundGroup = game.add.group();
    worldWrapGroup = game.add.group();
    platformGroup = game.add.group();
    backgroundGroup = game.add.group();
    displayScreensGroup = game.add.group();
    portraitsGroup = game.add.group();

    // Create
    platformGroup.enableBody = true;
    worldWrapGroup.enableBody = true;
    groundGroup.enableBody = true;

    // Display the title screen
    screen.displayTitleScreen(displayScreensGroup);

    // Start background music and on resume and pause callbacks
    audio.startMusic();
}

function update() {
    if (state.isGameOver) {
        state.gameOver();
    }

    // Colliders
    collisions.collide();
    collisions.overlap();

    // Accept controller input for players
    controller.controlAllPlayers(player1Group, player2Group);

    // Control game state (title screen, game over screen, in game)
    if (state.isGameOver && resetGameButton.isDown) {
        clean.cleanUpAll();
        startGame();
    } else if (isTitleScreen && resetGameButton.isDown) {
        isTitleScreen = false;
        startGame();
    }

}
