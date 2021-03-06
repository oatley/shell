let characters = {
    switchPlayerStage: function(player, stage = null) {
        if (stage) {
            player.playerStage = stage;
        } else if (player.playerStage == 'Stage1') {
            player.playerStage = 'Stage2';
        } else if (player.playerStage == 'Stage2') {
            player.playerStage = 'Stage3';
        } else if (player.playerStage == 'Stage3') {
            player.playerStage = 'Stage1';
            //youLose(player);
            isGameOver = true;
            console.log('YOU LOSE', player.model);
            clean.cleanPlayer(player);
            return;
        }
        if (player.playerStage == 'Stage1') {
            player.body.bounce.y = 0;
            player.body.gravity.y = 1000;
            player.body.setSize(64, 64, 32, 64);
            player.playerMoveSpeed = 50;
            player.playerJumpSpeed = -250;
        } else if (player.playerStage == 'Stage2') {
            player.body.bounce.y = 0.1;
            player.body.gravity.y = 600;
            player.body.setSize(32, 47, 48, 83);
            player.playerMoveSpeed = 100;
            player.playerJumpSpeed = -375;
        } else if (player.playerStage == 'Stage3') {
            player.body.bounce.y = 0.2;
            player.body.gravity.y = 600;
            player.body.setSize(32, 47, 48, 83);
            player.playerMoveSpeed = 150;
            player.playerJumpSpeed = -400;
        }
        // Update portrait to next stage
        if (player.portrait) {
            player.portrait.destroy();
        }
        if (!isGameOver) {
            player.portrait = game.add.sprite(player.portraitX, player.portraitY, player.model + player.playerStage);
            portraitsGroup.add(player.portrait);
            game.world.bringToTop(portraitsGroup);
        }

    },
    // Callback runs when player touches ground
    groundPlayer: function(bounds, player) {
        if (!player) {
            return;
        }
        player.isGrounded = true;
        if (player.isClashing) player.isClashing = false;
    },
    // Callback for the hitbox that deals damage
    dealDamage: function(bounds, player) {
        // destroy hitbox created to detect a hit on player
        bounds.destroy();
        //audio.playSFXHit();
        // Send player to next stage
        player.group.forEach(function(player) {
            characters.switchPlayerStage(player);
        }, this);

    },
    // Creates hitbox and forces animation to stay in attack
    attackPlayer: function(player) {
        if (!player || player.isClashing) {
            return;
        }

        player.attackTimer2.stop();
        player.attackBox = game.add.sprite(player.body.x + player.body.width/2,  player.body.y + player.body.height/2, 'green');
        player.attackBox.player = player;
        game.physics.arcade.enable(player.attackBox);
        player.attackBox.anchor.setTo(0.5, 0.5);
        if (player.playerDirection == 'left') {
            player.attackBox.x -= 64;
        } else if (player.playerDirection == 'right') {
            player.attackBox.x += 64;
        }
        player.attackTimer = game.time.create(true);
        if (player.playerStage == 'Stage1') {
            player.attackTimer.loop(600, player.attackTimerFunction, this);
        } else if (player.playerStage == 'Stage2') {
            player.attackTimer.loop(500, player.attackTimerFunction, this);
        } else if (player.playerStage == 'Stage3') {
            player.attackTimer.loop(250, player.attackTimerFunction, this);
        }

        player.attackTimer.start();

        player.attackBox.body.onOverlap = new Phaser.Signal();
        player.attackBox.body.onOverlap.add(collisions.playerCollide);
        //player.attackBox.body.onOverlap.add(characters.dealDamage);
        player.attackGroup.add(player.attackBox);
        game.world.bringToTop(player1AttackGroup);
        game.world.bringToTop(player2AttackGroup);


    },
    // Callback timer to stop an attack for player1
    stopAttackPlayer1: function() {
        if (player1Group.length < 1) {
            return;
        }
        player1Group.forEach(function(player) {
            player.isAttacking = false;
            if (player.attackTimer) player.attackTimer.stop()
            if (player.attackBox) {
                player.attackBox.destroy();
            }
        }, this);
    },
    // Callback timer to stop an attack for player2
    stopAttackPlayer2: function() {
        if (player2Group.length < 1) {
            return;
        }
        player2Group.forEach(function(player) {
            player.isAttacking = false;
            if (player.attackTimer) player.attackTimer.stop()
            if (player.attackBox) {
                player.attackBox.destroy();
            }
        }, this);
    },
    // Create knight character and animations
    createPlayer: function(playerGroup, x = 0, y = 0, stage = 'Stage1', velocityx = 0, velocityy = 0, isJumping = false, isCopy = false) {
        let player
        // Positions
        if (playerGroup === player1Group && (x == 0 && y == 0) ) {
            x = Number(game.world.width/2 - 200) ;
            y = Number(game.world.height - 200);
        } else if (playerGroup === player2Group && (x == 0 && y == 0)) {
            x = Number(game.world.width/2 + 100);
            y = Number(game.world.height - 200);
        }

        if (playerGroup === player1Group) {
            console.log('player 1 selecting sci');
            player = game.add.sprite(x, y, 'sci');
            player.model = 'sci';
            characters.addMechAnimations(player);
            player.playerDirection = 'right';
            player.attackGroup = player1AttackGroup;
            player.attackTimerFunction = characters.stopAttackPlayer1;
            player.portraitX = 0;
            player.portraitY = game.world.height - 64;
        } else if (playerGroup === player2Group) {
            console.log('player 1 selecting jan');
            player = game.add.sprite(x, y, 'jan');
            player.model = 'jan';
            characters.addKnightAnimations(player);
            player.playerDirection = 'left';
            player.attackGroup = player2AttackGroup;
            player.attackTimerFunction = characters.stopAttackPlayer2;
            player.portraitX = game.world.width - 64;
            player.portraitY = game.world.height - 64;
        }
        player.isCopy = isCopy;
        player.group = playerGroup;
        player.playerJumpSensitivity = -5;
        player.isAttacking = false;
        player.isClashing = false;
        game.physics.arcade.enable(player);
        if (velocityx) player.body.velocity.x = velocityx;
        if (velocityy) player.body.velocity.y = velocityy;
        if (isJumping) player.isJumping = isJumping;

        // World bounds
        player.checkWorldBounds = true;

        // Destroy character if they leave screen
        player.events.onOutOfBounds.add(screen.destroyCharacter, this);

        // Sets player body and attributes based on stage
        characters.switchPlayerStage(player, stage=stage);

        // Prepare run audio for players
        player.isAudioRunPlaying = false;
        player.isAudioRunStopped = true;
        player.isAudioRunReady = false;
        player.audioRunStopped = function () {player.audioRunPlaying = false; player.isAudioRunStopped = true;};
        // This only runs once, when audio is decoded; Sets up callback to notify player when audio stops, also sets a bool to notify decode complete
        player.setAudioRunReady = function() {player.isAudioRunReady = true;};
        // Create the audio run object which can be played if it's ready
        player.audioRun = audio.getAudioRun(player);
        player.audioRun.onStop.add(player.audioRunStopped, this);




        // Add to group player1 or player2 and bring to front
        playerGroup.add(player);
        game.world.bringToTop(playerGroup);
        game.world.bringToTop(platformGroup);
    },
    addKnightAnimations: function(player) {
        //  Stage 1 animations
        let range = Phaser.ArrayUtils.numberArray;
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
    },
    addMechAnimations: function(player) {
        //  Stage 1 animations
        let range = Phaser.ArrayUtils.numberArray;
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
    },
    // Create mech character and animations
    createMech: function(playerGroup, x = 0, y = 0, stage = 'Stage1') {

        // Positions
        if (playerGroup === player1Group && (x == 0 && y == 0) ) {
            x = Number(game.world.width/2 - 200);
            y = Number(game.world.height - 200);
        } else if (playerGroup === player2Group && (x == 0 && y == 0)) {
            x = Number(game.world.width/2 + 200);
            y = Number(game.world.height - 200);
        }

        // Design each character with custom stuff
        let player = game.add.sprite(x, y, 'sci');
        game.physics.arcade.enable(player);

        // Custom attributes
        player.a = 'meow';
        player.model = 'sci';
        player.group = playerGroup;
        if (playerGroup === player1Group) {
            player.playerDirection = 'right';
            player.attackGroup = player1AttackGroup;
            player.attackTimerFunction = characters.stopAttackPlayer1;
            player.portraitX = 0;
            player.portraitY = game.world.height - 64;
        } else if (playerGroup === player2Group) {
            player.playerDirection = 'left';
            player.attackGroup = player2AttackGroup;
            player.attackTimerFunction = characters.stopAttackPlayer2;
            player.portraitX = game.world.width - 64;
            player.portraitY = game.world.height - 64;
        }
        //player.portrait = game.add.sprite(player.portraitX, player.portraitY, player.model + '1');
        //portraitsGroup.add(player.portrait);
        player.playerJumpSensitivity = -5;
        player.playerJumping = false;
        player.isAttacking = false;

        // World bounds
        player.checkWorldBounds = true;

        // Destroy character if they leave screen
        player.events.onOutOfBounds.add(screen.destroyCharacter, this);

        //  Player physics properties. Give the little guy a slight bounce.
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1000;
        player.body.setSize(64, 64, 32, 64);

        //  Stage 1 animations
        let range = Phaser.ArrayUtils.numberArray;
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

        characters.switchPlayerStage(player, stage=stage);

        // Add to group player1 or player2 and bring to front
        playerGroup.add(player);
        game.world.bringToTop(playerGroup);
    }
};
