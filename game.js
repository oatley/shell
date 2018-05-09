let config = {
    width: 480,
    height: 270,
    renderer: Phaser.AUTO,
    antialias: false,
    multiTexture: true,
    state: {
        preload: load.preload,
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

    // Create groups
    groups.createGroups();

    // Display the title screen
    screen.displayTitleScreen(displayScreensGroup);

    // Start background music and on resume and pause callbacks
    audio.startMusic();
}

function update() {
    if (isGameOver && !isGameOverScreen) {
        state.gameOver();
    } else if (resetGameButton.isDown) {
        state.startGameCheck();
    }

    // Colliders
    collisions.collide();
    collisions.overlap();

    // Accept controller input for players
    controller.controlAllPlayers(player1Group, player2Group);
}
