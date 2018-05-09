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
