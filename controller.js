var controller = {
    // Set player 1 controls
    player1Controls: function() {
        // Keyboard controls
        upPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attackPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.F);
        switchPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.E);
        resetGameButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Xbox controller controls

    },
    // Set player 2 controls
    player2Controls: function() {
        // Keyboard controls
        upPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        attackPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.L);

        // Xbox controller controls

    },
    musicControls: function() {
        // Keyboard controls
        musicMuteButton = game.input.keyboard.addKey(Phaser.Keyboard.P);
        musicPlus1Button = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
        musicPlus2Button = game.input.keyboard.addKey(Phaser.Keyboard.PLUS);
        musicMinus1Button = game.input.keyboard.addKey(Phaser.Keyboard.MINUS);
        musicMinus2Button = game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);

        // Add callbacks to control the music volume
        musicMuteButton.onDown.add(audio.muteMusicVolume, this);
        musicPlus1Button.onDown.add(audio.increaseMusicVolume, this);
        musicPlus2Button.onDown.add(audio.increaseMusicVolume, this);
        musicMinus1Button.onDown.add(audio.decreaseMusicVolume, this);
        musicMinus2Button.onDown.add(audio.decreaseMusicVolume, this);
    },
    controlPlayer: function(player, group) {
        // Function accept the character (knight, mech, etc) and "player1" or "player2"
        if (group === player1Group) {
            var upButton = upPlayer1Button;
            var downButton = downPlayer1Button;
            var leftButton = leftPlayer1Button;
            var rightButton = rightPlayer1Button;
            var attackButton = attackPlayer1Button;
            //var switchButton = switchPlayer1Button;
        } else if (group == player2Group) {
            var upButton = upPlayer2Button;
            var downButton = downPlayer2Button;
            var leftButton = leftPlayer2Button;
            var rightButton = rightPlayer2Button;
            var attackButton = attackPlayer2Button;
            //var switchButton = switchPlayer2Button;
        }

        // PLatform collisions are based on player only
        if (!downButton.isDown) {
            var platformCollision = game.physics.arcade.collide(player, platformGroup);
        }
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        if (attackButton.isDown || player.isAttacking) {
            if (!player.isAttacking) {
                player.isAttacking = true;
                player.attackTimer2 = game.time.create(true);
                player.attackTimer2.loop(300, attackPlayer, this, player);
                player.attackTimer2.start();
                //attackPlayer(player);
            }
            if (player.playerDirection == 'left') {
                player.animations.play(player.playerStage + '_attack_left');
            } else if (player.playerDirection == 'right') {
                player.animations.play(player.playerStage + '_attack_right');
            }

        } else if (leftButton.isDown) {
           //  Move to the right
           player.body.velocity.x = -player.playerMoveSpeed;
           player.playerDirection = 'left';
           if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
               if (player.body.velocity.y < player.playerJumpSensitivity) {
                   player.animations.play(player.playerStage + '_jump_left');
               } else {
                   player.animations.play(player.playerStage + '_fall_left');
               }
           } else {
               player.animations.play(player.playerStage + '_walk_left');
           }
        } else if (rightButton.isDown) {
           //  Move to the right
           player.body.velocity.x = player.playerMoveSpeed;
           player.playerDirection = 'right';
           if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
               if (player.body.velocity.y < player.playerJumpSensitivity) {
                   player.animations.play(player.playerStage + '_jump_right');
               } else {
                   player.animations.play(player.playerStage + '_fall_right');
               }

           } else {
               player.animations.play(player.playerStage + '_walk_right');
           }
        } else {
            if (player.playerDirection == 'left') {
               if (player.body.velocity.y < player.playerJumpSensitivity) {
                   player.animations.play(player.playerStage + '_jump_left');
               } else if (!(player.body.touching.down || player.body.blocked.down)) {
                   player.animations.play(player.playerStage + '_fall_left');
               } else {
                   player.animations.play(player.playerStage + '_idle_left');
               }
            } else if (player.playerDirection == 'right') {
               if (player.body.velocity.y < player.playerJumpSensitivity) {
                   player.animations.play(player.playerStage + '_jump_right');
               } else if (!(player.body.touching.down || player.body.blocked.down)) {
                   player.animations.play(player.playerStage + '_fall_right');
               } else {
                   player.animations.play(player.playerStage + '_idle_right');
               }
            }


        }

        //  Allow the player to jump if they are touching the ground.
        //console.log(player.isGrounded);
        if (!upButton.isDown && player.playerJumping && player.body.velocity.y < 0 && player.isGrounded) {
            player.body.velocity.y = player.body.velocity.y * 0.5;
            player.playerJumping = false;
        } else if (upButton.isDown && (player.body.touching.down && !player.body.touching.up && player.isGrounded )) {
            player.body.velocity.y = player.playerJumpSpeed;
            player.playerJumping = true;
            player.isGrounded = false;
        }

    }
};
