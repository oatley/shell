// Player1Controls objects
let upPlayer1Button;
let downPlayer1Button;
let leftPlayer1Button;
let rightPlayer1Button;
let attackPlayer1Button;
let switchPlayer1Button;

// Player2Controls objects
let upPlayer2Button;
let downPlayer2Button;
let leftPlayer2Button;
let rightPlayer2Button;
let attackPlayer2Button;
let switchPlayer2Button;

// Music Player1Controls
let musicMuteButton;
let musicPlus1Button;
let musicPlus2Button;
let musicMinus1Button;
let musicMinus2Button;

let controller = {
    prepController: function () {
        cursors = game.input.keyboard.createCursorKeys();
        game.input.mouse.capture = true;
    },
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
    controlAllPlayers: function (player1Group, player2Group) {
        // Control movement and animations for player 1
        if (player1Group.length > 0) {
            player1Group.forEach(function(player) {controller.controlPlayer(player, player1Group);}, this);
        }

        // Control movement and animations for player 2
        if (player2Group.length > 0) {
            player2Group.forEach(function(player) {controller.controlPlayer(player, player2Group);}, this);
        }
    },
    // When both players attack at the same time
    clashPlayers: function (hitbox1, hitbox2) {
        // These are not really player1 and player2, could be swapped?
        let p1 = hitbox1.player;
        let p2 = hitbox2.player;
        p1.isClashing = true;
        p2.isClashing = true;
        p1.body.velocity.y = -100;
        p2.body.velocity.y = -100;
        if (p1.playerDirection == 'left') { // if facing left then move player to the right +num
            p1.body.velocity.x = 300;
        } else if (p1.playerDirection == 'right') { // if facing right then move player to the left -num
            p1.body.velocity.x = -300;
        }

        if (p2.playerDirection == 'left') { // if facing left then move player to the right +num
            p2.body.velocity.x = 300;
        } else if (p2.playerDirection == 'right') { // if facing right then move player to the left -num
            p2.body.velocity.x = -300;
        }


    },
    controlPlayer: function(player, group) {
        let upButton;
        let downButton;
        let leftButton;
        let rightButton;
        let attackButton;
        // Function accept the character (knight, mech, etc) and "player1" or "player2"
        if (group === player1Group) {
            upButton = upPlayer1Button;
            downButton = downPlayer1Button;
            leftButton = leftPlayer1Button;
            rightButton = rightPlayer1Button;
            attackButton = attackPlayer1Button;
        } else if (group == player2Group) {
            upButton = upPlayer2Button;
            downButton = downPlayer2Button;
            leftButton = leftPlayer2Button;
            rightButton = rightPlayer2Button;
            attackButton = attackPlayer2Button;

        }

        // PLatform collisions are based on player only
        if (!downButton.isDown) {
            let platformCollision = game.physics.arcade.collide(player, platformGroup);
        }
        //  Reset the players velocity (movement)
        if(!player.isClashing) {
            player.body.velocity.x = 0;
        }
        if (attackButton.isDown || player.isAttacking) {
            // Attacking
            if (!player.isAttacking) {
                player.isAttacking = true;
                player.attackTimer2 = game.time.create(true);
                player.attackTimer2.loop(300, characters.attackPlayer, this, player);
                player.attackTimer2.start();
                //attackPlayer(player);
            }
            if (player.isClashing && player.playerDirection == 'left') {
                player.animations.play(player.playerStage + '_fall_left');
            } else if (player.isClashing && player.playerDirection == 'right') {
                player.animations.play(player.playerStage + '_fall_right');
            } else if (player.playerDirection == 'left') {
                player.animations.play(player.playerStage + '_attack_left');
            } else if (player.playerDirection == 'right') {
                player.animations.play(player.playerStage + '_attack_right');
            }

        } else if (leftButton.isDown) {
           //  Move to the left
           player.body.velocity.x = -player.playerMoveSpeed;
           player.playerDirection = 'left';
           if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
               if (player.body.velocity.y < player.playerJumpSensitivity || player.isJumping) {
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
               if (player.body.velocity.y < player.playerJumpSensitivity || player.isJumping) {
                   player.animations.play(player.playerStage + '_jump_right');
               } else {
                   player.animations.play(player.playerStage + '_fall_right');
               }

           } else {
               player.animations.play(player.playerStage + '_walk_right');
           }
        } else {
            // Standing still idle
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

        //  Allow the player to jump if they are touching the ground + dynamic height
        if (!upButton.isDown && player.playerJumping && player.body.velocity.y < 0) {
            player.body.velocity.y = player.body.velocity.y * 0.5;
            player.playerJumping = false;
        } else if (upButton.isDown && (player.body.touching.down && !player.body.touching.up && player.isGrounded )) {
            player.body.velocity.y = player.playerJumpSpeed;
            player.playerJumping = true;
            player.isGrounded = false;
        }

    }
};
