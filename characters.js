var characters = {
    // Create knight character and animations
    createKnight: function(playerGroup, x = 0, y = 0, stage = 'Stage1') {
        // Design each character with custom stuff
        // Positions
        if (playerGroup === player1Group && (x == 0 && y == 0) ) {
            var x = Number(game.world.width/2 - 200) ;
            var y = Number(game.world.height - 200)
        } else if (playerGroup === player2Group && (x == 0 && y == 0)) {
            var x = Number(game.world.width/2 + 100) ;
            var y = Number(game.world.height - 200)
        }

        // Design each character with custom stuff
        var player = game.add.sprite(x, y, 'knight');
        game.physics.arcade.enable(player);

        // Custom attributes
        player.a = 'meow';
        player.model = 'knight';
        player.group = playerGroup;
        if (playerGroup === player1Group) {
            player.playerDirection = 'right';
            player.attackGroup = player1AttackGroup;
            player.attackTimerFunction = stopAttackPlayer1;
        } else if (playerGroup === player2Group) {
            player.playerDirection = 'left';
            player.attackGroup = player2AttackGroup;
            player.attackTimerFunction = stopAttackPlayer2;
        }
        //player.playerDirection = playerDirection;
        player.playerJumpSensitivity = playerJumpSensitivity;
        player.playerMoveSpeed = playerMoveSpeed;
        player.playerJumpSpeed = playerJumpSpeed;
        player.playerJumping = playerJumping;
        player.brokenCollide = false;
        player.isAttacking = false;


        // World bounds
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(worldWrapDieLoser, this);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        //player.body.collideWorldBounds.up = true;
        player.body.setSize(64, 64, 32, 64);
        //player.body.checkCollision.up = false;
        //player.body.checkCollision.down = true;


        //  Stage 1 animations
        player.playerStage = 'Stage1';
        player.animations.add(player.playerStage + '_idle_left', range(0,5), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(19,24), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(38,49), 20, true);
        player.animations.add(player.playerStage + '_walk_right', range(57,68), 20, true);
        player.animations.add(player.playerStage + '_attack_left', range(76,87), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(95,106), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [114], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [133], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [152], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [171], 10, false);


        // Stage 2 animation
        player.playerStage = 'Stage2';
        player.animations.add(player.playerStage + '_idle_left', range(190,197), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(209,216), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(228,237), 10, true);
        player.animations.add(player.playerStage + '_walk_right', range(247,256), 10, true);
        player.animations.add(player.playerStage + '_attack_left', range(266,273), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(285,292), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [304], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [323], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [342], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [361], 10, false);

        // Stage 3 animation
        player.playerStage = 'Stage3';
        player.animations.add(player.playerStage + '_idle_left', range(380,386), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(399,405), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(418,423), 10, true);
        player.animations.add(player.playerStage + '_walk_right', range(437,442), 10, true);
        player.animations.add(player.playerStage + '_attack_left', range(456,461), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(475,480), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [494], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [513], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [532], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [551], 10, false);

        switchPlayerStage(player, stage=stage);

        // Add to group player1 or player2
        playerGroup.add(player);
        var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
        var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    },
    // Create mech character and animations
    createMech: function(playerGroup, x = 0, y = 0, stage = 'Stage1') {
        // Design each character with custom stuff
        // Positions
        if (playerGroup === player1Group && (x == 0 && y == 0) ) {
            var x = Number(game.world.width/2 - 200) ;
            var y = Number(game.world.height - 200)
        } else if (playerGroup === player2Group && (x == 0 && y == 0)) {
            var x = Number(game.world.width/2 + 200) ;
            var y = Number(game.world.height - 200)
        }

        // Design each character with custom stuff
        var player = game.add.sprite(x, y, 'mech');
        game.physics.arcade.enable(player);

        // Custom attributes
        player.a = 'meow';
        player.model = 'mech';
        player.group = playerGroup;
        if (playerGroup === player1Group) {
            player.playerDirection = 'right';
            player.attackGroup = player1AttackGroup;
            player.attackTimerFunction = stopAttackPlayer1;
        } else if (playerGroup === player2Group) {
            player.playerDirection = 'left';
            player.attackGroup = player2AttackGroup;
            player.attackTimerFunction = stopAttackPlayer2;
        }
        player.playerJumpSensitivity = playerJumpSensitivity;
        player.playerMoveSpeed = playerMoveSpeed;
        player.playerJumpSpeed = playerJumpSpeed;
        player.playerJumping = playerJumping;
        player.brokenCollide = false;
        player.isAttacking = false;

        // World bounds
        player.checkWorldBounds = true;
        player.events.onOutOfBounds.add(worldWrapDieLoser, this);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        //player.body.collideWorldBounds.up = true;
        player.body.setSize(64, 64, 32, 64);
        //player.body.checkCollision.up = false;
        //player.body.checkCollision.down = true;


        //  Stage 1 animations
        player.playerStage = 'Stage1';
        player.animations.add(player.playerStage + '_idle_left', range(0,7), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(19,26), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(38,56), 20, true);
        player.animations.add(player.playerStage + '_walk_right', range(57,75), 20, true);
        player.animations.add(player.playerStage + '_attack_left', range(76,87), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(95,106), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [114], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [133], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [152], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [171], 10, false);


        // Stage 2 animation
        player.playerStage = 'Stage2';
        player.animations.add(player.playerStage + '_idle_left', range(190,197), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(209,216), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(228,237), 10, true);
        player.animations.add(player.playerStage + '_walk_right', range(247,256), 10, true);
        player.animations.add(player.playerStage + '_attack_left', range(266,273), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(285,292), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [304], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [323], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [342], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [361], 10, false);

        // Stage 3 animation
        player.playerStage = 'Stage3';
        player.animations.add(player.playerStage + '_idle_left', range(380,387), 10, true);
        player.animations.add(player.playerStage + '_idle_right', range(399,406), 10, true);
        player.animations.add(player.playerStage + '_walk_left', range(418,423), 10, true);
        player.animations.add(player.playerStage + '_walk_right', range(437,442), 10, true);
        player.animations.add(player.playerStage + '_attack_left', range(456,461), 10, false);
        player.animations.add(player.playerStage + '_attack_right', range(475,480), 10, false);
        player.animations.add(player.playerStage + '_jump_left', [494], 10, false);
        player.animations.add(player.playerStage + '_jump_right', [513], 10, false);
        player.animations.add(player.playerStage + '_fall_left', [532], 10, false);
        player.animations.add(player.playerStage + '_fall_right', [551], 10, false);

        switchPlayerStage(player, stage=stage);

        // Add to group player1 or player2
        playerGroup.add(player);
        var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
        var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    }
};
