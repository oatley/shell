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
let groups = {
    createGroups: function() {

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
    }
};
