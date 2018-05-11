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
    //audio.startMusic(); // Instead wait for prepaudio to finish
}

function update() {
    // Starts game from title, starts game from reset, and detects game over
    if (isGameOver && !isGameOverScreen) {
        state.gameOver();
    } else if (resetGameButton.isDown) {
        state.startGameCheck();
    }

    // Colliders are loaded for overlap and physics collision
    collisions.collide();
    collisions.overlap();

    // Accept controller input for players, checks every frame for keydowns
    controller.controlAllPlayers(player1Group, player2Group);
}
