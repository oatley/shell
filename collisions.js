let collisions = {
    collide: function () {
        // Collide players with ground
        game.physics.arcade.collide(player1Group, groundGroup);
        game.physics.arcade.collide(player2Group, groundGroup);
        // Collide players with each other
        game.physics.arcade.collide(player1Group, player2Group);
    },
    overlap: function () {
        // Allows out of bounds characters to be detected
        game.physics.arcade.overlap(player1Group, worldWrapGroup);
        game.physics.arcade.overlap(player2Group, worldWrapGroup);
        // Allow hitboxs to be detected on other players
        game.physics.arcade.overlap(player1Group, player2AttackGroup);
        game.physics.arcade.overlap(player2Group, player1AttackGroup);
    }
};
