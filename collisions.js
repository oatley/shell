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
        // Allows for detection of hitbox overlap
        game.physics.arcade.overlap(player1AttackGroup, player2AttackGroup);

    },
    // Check if hitbox collided with player or other hitbox
    playerCollide: function (bounds, otherTarget) {
        // Collided with the player
        if (otherTarget.group && (otherTarget.group === player1Group || otherTarget.group === player2Group)) {
            character.dealDamage(bounds, otherTarget);
        } else { // Assume it collided with hitbox? maybe fine tune detection later
            controller.clashPlayers(bounds, otherTarget);
        }
    }
};
