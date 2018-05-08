var config = {
    width: 480,
    height: 270,
    renderer: Phaser.AUTO,
    antialias: false,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update,
        render: render
    }
}
var game = new Phaser.Game(config);

console.log('load.js');
game.state.add('load', load); // load contains everything for preload
console.log('audio.js');
game.state.add('audio', audio); // functions for controlling the audio
console.log('controller.js');
game.state.add('controller', controller); // controller contains setup for keyboard and controller support
console.log('levels.js');
game.state.add('levels', levels);
console.log('character.js');
game.state.add('characters', characters);




// Player objects
var player1;
var player2;

var gameOver;
var youwinscreen;
var titlescreen;
var titlescreenbool = true;
var sci;
var jan;

// Player 1 group
var player1Group;

// Player 2 group
var player2Group;

// Player1Controls objects
var upPlayer1Button;
var downPlayer1Button;
var leftPlayer1Button;
var rightPlayer1Button;
var attackPlayer1Button;
var switchPlayer1Button;

// Player2Controls objects
var upPlayer2Button;
var downPlayer2Button;
var leftPlayer2Button;
var rightPlayer2Button;
var attackPlayer2Button;
var switchPlayer2Button;

// Music Player1Controls
var musicMuteButton;
var musicPlus1Button;
var musicPlus2Button;
var musicMinus1Button;
var musicMinus2Button;


// Default player stats
var playerDirection = 'left';
var playerJumpSensitivity = -5; // Negative number, default is about -2.8 falling always
var playerMoveSpeed = 50; // 50
var playerJumpSpeed = -650; // Negative number // -350
var playerJumping = false;

// maps
var groundGroup;
var worldBoundsGroup;
var platformGroup;

// music
var music;

// Hitbox
var player1AttackGroup;
var player2AttackGroup;

var range = Phaser.ArrayUtils.numberArray;
//var numbers = new Phaser.ArrayUtils();

function toggleFullscreen() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}










//function switchAllStages() {
//    player1Group.forEach(function(player) {switchPlayerStage(player);}, this);
//    player2Group.forEach(function(player) {switchPlayerStage(player);}, this);
//}

function switchPlayerStage(player, stage = null) {
    if (stage) {
        player.playerStage = stage;
    } else if (player.playerStage == 'Stage1') {
        player.playerStage = 'Stage2';
    } else if (player.playerStage == 'Stage2') {
        player.playerStage = 'Stage3';
    } else if (player.playerStage == 'Stage3') {
        player.playerStage = 'Stage1';
        youLose(player);
        console.log('YOU LOSE', player.model);
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

}


function controlPlayer(player, group) {



    //console.log(player.body.touching)
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
/*
    if (switchButton.onPress) {
        if (player.playerStage == 'Stage1') {
            switchPlayerStage(player, 'Stage2')
        } else if (player.playerStage == 'Stage2') {
            switchPlayerStage(player, 'Stage3')
        } else if (player.playerStage == 'Stage3') {
            switchPlayerStage(player, 'Stage1')
        }
    }
*/


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

function worldWrap(bounds, player) {
    //player.brokenCollide = true;
    //console.log(player.brokenCollide);
    if (player.group.length == 1) {
        // game.world.width - 64 is the bounds for rigth side
        // 0 is the bounds for left side
        var y = player.body.y;
        if (player.body.x < 0) {
            if (player.playerStage == 'Stage1') {
                var x = game.world.width -32;
            } else if (player.playerStage == 'Stage2') {
                var x = game.world.width -48;
            } else if (player.playerStage == 'Stage3') {
                var x = game.world.width -48;
            }

        } else if (player.body.x > (game.world.width - 128)) {
            if (player.playerStage == 'Stage1') {
                var x = -96;
            } else if (player.playerStage == 'Stage2') {
                var x = -80;
            } else if (player.playerStage == 'Stage3') {
                var x = -80;
            }
        }

        if (player.model == 'mech') {
            characters.createMech(player.group, x, y - 64 - 20, stage=player.playerStage);
        } else {
            characters.createKnight(player.group, x, y - 64 - 20, stage=player.playerStage);
        }

        game.world.bringToTop(player.group);
        game.world.bringToTop(platformGroup);
    }
}

function groundPlayer(bounds, player) {
    player.isGrounded = true;
}

function worldWrapDieLoser (player) {
    player.destroy();
}





function preload() {
    // Preload loadImages
    load.loadImages();
    load.loadSpriteSheets();
    load.loadMusic();

}

function attackPlayer(player) {
    console.log('attacking');

    player.attackTimer2.stop();

    player.attackBox = game.add.sprite(player.body.x + player.body.width/2,  player.body.y + player.body.height/2, 'green');
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
    player.attackBox.body.onOverlap.add(dealDamage);
    player.attackGroup.add(player.attackBox);
    game.world.bringToTop(player1AttackGroup);
    game.world.bringToTop(player2AttackGroup);


}

function stopAttackPlayer1() {
    console.log('timer ended player 1');
    // Control movement and animations for player 1
    player1Group.forEach(function(player) {
        player.isAttacking = false;
        player.attackTimer.stop()
        if (player.attackBox) {
            player.attackBox.destroy();
        }
    }, this);

}

function stopAttackPlayer2() {
    console.log('timer ended player 2');
    player2Group.forEach(function(player) {
        player.isAttacking = false;
        player.attackTimer.stop()
        if (player.attackBox) {
            player.attackBox.destroy();
        }
    }, this);

}

function dealDamage(bounds, player) {
    console.log('dealing dmg to', player.model);
    bounds.destroy();
    switchPlayerStage(player);
}

function youLose(player) {
    player.destroy();
    youwinscreen = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
    youwinscreen.anchor.setTo(0.5, 0.5);
    gameOver = true;
}

function startGame() {
    if (player1Group.length > 0) {
        player1Group.forEach(function(player) {
            player.destroy()
        }, this);
    }

    // Control movement and animations for player 2
    if (player2Group.length > 0) {
        player2Group.forEach(function(player) {
            player.destroy()
        }, this);
    }
    if (youwinscreen) {
        youwinscreen.destroy();
    }
    gameOver = false;
    // Create characters
    //createBattery(player1Group);
    characters.createMech(player1Group);
    characters.createKnight(player2Group);


    game.world.bringToTop(groundGroup);
    game.world.bringToTop(player1Group);
    game.world.bringToTop(player2Group);
    game.world.bringToTop(platformGroup);

    sci = game.add.image(0, game.world.height - 64, 'sci');
    jan = game.add.image(game.world.width - 64, game.world.height - 64, 'jan');
}

function create() {
    // Start the simple physics
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // Background colour
    game.stage.backgroundColor = '#6bc4ff';

    // Configure fullscreen mode and scale
    game.scale.minWidth = 480;
    game.scale.minHeight = 270;
    game.scale.maxWidth = 1920;
    game.scale.maxHeight = 1080;
    game.scale.pageAlignHorizontally = true;
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.smoothed = false;
    game.input.activePointer.leftButton.onDown.add(toggleFullscreen, this);

    // bgMusic
    music = game.add.audio('bgmusic');
    //audio.startMusic();


    // Setup controls

    controller.player1Controls();
    controller.player2Controls();
    controller.musicControls();
    cursors = game.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;

    // Create player groups
    player1Group = game.add.group();
    player2Group = game.add.group();

    // Ground
    groundGroup = game.add.group();
    groundGroup.enableBody = true;

    // World wrap
    worldWrapGroup = game.add.group();
    worldWrapGroup.enableBody = true;

    // platforms
    platformGroup = game.add.group();
    platformGroup.enableBody = true;

    // Attack groups
    player1AttackGroup  = game.add.group();
    player2AttackGroup  = game.add.group();

    // Create map1
    levels.createMap1(groundGroup, worldWrapGroup, platformGroup);

    //startGame();
    titlescreen = game.add.sprite(game.world.width/2, game.world.height/2, 'title');
    titlescreen.anchor.setTo(0.5, 0.5);

    // Start background music and on resume and pause callbacks
    this.game.onPause.add(audio.pauseMusic, this);
    this.game.onResume.add(audio.resumeMusic, this);
    audio.startMusic();
}

function update() {
    // Colliders
    var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
    var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player1Group, worldWrapGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player2Group, worldWrapGroup);
    var charColliders = game.physics.arcade.collide(player1Group, player2Group);
    var attackColliders = game.physics.arcade.overlap(player1Group, player2AttackGroup);
    var attackColliders = game.physics.arcade.overlap(player2Group, player1AttackGroup);

    // Control movement and animations for player 1
    if (player1Group.length > 0) {
        player1Group.forEach(function(player) {controlPlayer(player, player1Group);}, this);
    }

    // Control movement and animations for player 2
    if (player2Group.length > 0) {
        player2Group.forEach(function(player) {controlPlayer(player, player2Group);}, this);
    }

    if (gameOver && resetGameButton.isDown) {
        console.log('resetting the game');
        startGame();
    } else if (titlescreenbool && resetGameButton.isDown) {
        titlescreenbool = false;
        titlescreen.destroy();
        startGame();
    }

}

function render () {
    //game.debug.geom(rect,'#0fffff');

}
