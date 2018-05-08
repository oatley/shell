var collisions = {
    collide: function () {
        game.physics.arcade.collide(player1Group, groundGroup);
        game.physics.arcade.collide(player2Group, groundGroup);
        game.physics.arcade.collide(player1Group, player2Group);
    },
    overlap: function () {
        game.physics.arcade.overlap(player1Group, worldWrapGroup);
        game.physics.arcade.overlap(player2Group, worldWrapGroup);
        game.physics.arcade.overlap(player1Group, player2AttackGroup);
        game.physics.arcade.overlap(player2Group, player1AttackGroup);
    }
};
