var config = {
    width: 480,
    height: 270,
    renderer: Phaser.AUTO,
    antialias: false,
    multiTexture: true,
    state: {
        preload: preload,
        create: create,
        update: update
    }
}
var game = new Phaser.Game(config);

// Player objects
var player1;
var player2;

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

var range = Phaser.ArrayUtils.numberArray;
//var numbers = new Phaser.ArrayUtils();

function toggleFullscreen() {
    if (game.scale.isFullScreen) {
        game.scale.stopFullScreen();
    } else {
        game.scale.startFullScreen(false);
    }
}

// Set player 1 controls
function player1Controls() {
    // Keyboard controls
    upPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.W);
    downPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.S);
    leftPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.A);
    rightPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.D);
    attackPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.F);
    switchPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.E);
    musicMuteButton = game.input.keyboard.addKey(Phaser.Keyboard.P);
    musicPlus1Button = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
    musicPlus2Button = game.input.keyboard.addKey(Phaser.Keyboard.PLUS);
    musicMinus1Button = game.input.keyboard.addKey(Phaser.Keyboard.MINUS);
    musicMinus2Button = game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);

    musicMuteButton.onDown.add(muteMusicVolume, this);
    musicPlus1Button.onDown.add(increaseMusicVolume, this);
    musicPlus2Button.onDown.add(increaseMusicVolume, this);
    musicMinus1Button.onDown.add(decreaseMusicVolume, this);
    musicMinus2Button.onDown.add(decreaseMusicVolume, this);

    switchPlayer1Button.onDown.add(switchAllLevel, this);

    // Xbox controller controls

}

// Set player 2 controls
function player2Controls() {
    // Keyboard controls
    upPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    attackPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.L);
    //switchPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.K);

    // Xbox controller controls

}

// Load images
function loadImages() {
    // Load images background
    game.load.image('sky1', 'assets/sprites/maps/sky1.png');
    game.load.image('sky2', 'assets/sprites/maps/sky2.png');
    game.load.image('sky3', 'assets/sprites/maps/sky3.png');
    game.load.image('sky4', 'assets/sprites/maps/sky4.png');
    game.load.image('mountain', 'assets/sprites/maps/mountain.png');
    game.load.image('cloud', 'assets/sprites/maps/cloud.png');
    // Load images platforms
    game.load.image('platform', 'assets/sprites/maps/stage.png');
    // Load images ground
    game.load.image('ground', 'assets/sprites/maps/ground.png');
}

// Load spritesheets
function loadSpriteSheets() {
    game.load.spritesheet('battery', 'assets/sprites/characters/battery-spritesheet.png', 64, 64);
    game.load.spritesheet('mech', 'assets/sprites/characters/sci_spritesheet.png', 128, 128);


}

function loadMusic () {
    game.load.audio('bgmusic', ['assets/audio/bgmusic.mp3']);
}


function muteMusicVolume() {
    console.log('music mute');
    if (music.mute == true) {
        music.mute = false;
    } else {
        music.mute = true;
    }
}

function increaseMusicVolume() {
    if (music.mute == true) {
        music.mute = false
    }
    music.volume += 1;
    console.log('music plus', music.volume);

}


function decreaseMusicVolume() {
    if (music.volume > 0 && music.mute == true) {
        music.mute = false;
    }
    if (music.volume > 0){
        music.volume -= 1;
    } else {
        music.mute = true;
    }
    console.log('music minus', music.volume);

}

// Create a second and 3rd map off screen so the doubles never get out of sync
function createMap1(groundGroup, worldWrapGroup, platformGroup) {
    for (var i = 0; i < 8; i++) {
        var sky = game.add.sprite(0 + (64*i), 0, 'sky1');
    }
    for (var i = 0; i < 8; i++) {
        var sky = game.add.sprite(0 + (64*i), 64, 'sky2');
    }
    for (var i = 0; i < 8; i++) {
        var sky = game.add.sprite(0 + (64*i), 128, 'sky3');
    }
    for (var i = 0; i < 8; i++) {
        var sky = game.add.sprite(0 + (64*i), 192, 'sky4');
    }
    var mountain = game.add.sprite(0, -48, 'mountain');
    var mountain2 = game.add.sprite(game.world.width + 64, -48, 'mountain');
    mountain2.scale.x *=-1;
    var cloud = game.add.sprite(game.world.width - 100, -32, 'cloud');
    var cloud2 = game.add.sprite(220, -10 , 'cloud');
    var cloud22 = game.add.sprite(-32, -10 , 'cloud');
    cloud2.scale.x *= -1;


    var platform = platformGroup.create(game.world.width/2 - 64, -40, 'platform');
    platform.body.immovable = true;
    platform.body.setSize(100, 4, 14, 110);
    platform.body.onCollide = new Phaser.Signal();
    platform.body.onCollide.add(groundPlayer);
    platform.body.checkCollision.down = false;
    platform.body.checkCollision.left = false;
    platform.body.checkCollision.right = false;
    var platform2 = platformGroup.create(48, 24, 'platform');
    platform2.body.immovable = true;
    platform2.body.setSize(100, 4, 14, 110);
    platform2.body.onCollide = new Phaser.Signal();
    platform2.body.onCollide.add(groundPlayer);
    platform2.body.checkCollision.down = false;
    platform2.body.checkCollision.left = false;
    platform2.body.checkCollision.right = false;
    var platform3 = platformGroup.create(game.world.width - 128 - 48, 24, 'platform');
    platform3.body.immovable = true;
    platform3.body.setSize(100, 4, 14, 110);
    platform3.body.onCollide = new Phaser.Signal();
    platform3.body.onCollide.add(groundPlayer);
    platform3.body.checkCollision.down = false;
    platform3.body.checkCollision.left = false;
    platform3.body.checkCollision.right = false;

    for (var i = 0; i < 10; i++) {
        var ground = groundGroup.create(-64 + (64*i), game.world.height - 64, 'ground');
        ground.body.immovable = true;
        ground.body.setSize(64, 32, 0, 32);
        ground.body.onCollide = new Phaser.Signal();
        ground.body.onCollide.add(groundPlayer);
        var roof = groundGroup.create(-64 + (64*i), 0 - 64, 'ground');
        roof.body.setSize(64, 32, 0, 0);
        roof.body.immovable = true;
    }
    //var worldWrapTile = worldWrapGroup.create(-64, game.world.height - 64, 'ground');
    var worldWrapTile = worldWrapGroup.create(-64, 0, 'ground');
    worldWrapTile.body.immovable = true;
    worldWrapTile.body.onOverlap = new Phaser.Signal();
    worldWrapTile.body.onOverlap.add(worldWrap);
    worldWrapTile.body.setSize(4, 1000, 60)
    //var worldWrapTile2 = worldWrapGroup.create(game.world.width, game.world.height -64, 'ground');
    var worldWrapTile2 = worldWrapGroup.create(game.world.width, 0, 'ground');
    worldWrapTile2.body.immovable = true;
    worldWrapTile2.body.onOverlap = new Phaser.Signal();
    worldWrapTile2.body.onOverlap.add(worldWrap)
    worldWrapTile2.body.setSize(4, 1000)

}

function createKnight() {
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
    player.model = 'knight';
    player.group = playerGroup;
    player.playerDirection = playerDirection;
    player.playerJumpSensitivity = playerJumpSensitivity;
    player.playerMoveSpeed = playerMoveSpeed;
    player.playerJumpSpeed = playerJumpSpeed;
    player.playerJumping = playerJumping;

    player.brokenCollide = false;

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
    player.playerLevel = 'level1';
    player.animations.add(player.playerLevel + '_idle_left', range(0,5), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(19,24), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(38,49), 20, true);
    player.animations.add(player.playerLevel + '_walk_right', range(57,68), 20, true);
    player.animations.add(player.playerLevel + '_attack_left', range(76,87), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(95,106), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [114], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [133], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [152], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [171], 10, false);


    // Stage 2 animation
    player.playerLevel = 'level2';
    player.animations.add(player.playerLevel + '_idle_left', range(190,197), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(209,216), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(228,237), 10, true);
    player.animations.add(player.playerLevel + '_walk_right', range(247,256), 10, true);
    player.animations.add(player.playerLevel + '_attack_left', range(266,273), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(285,292), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [304], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [323], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [342], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [361], 10, false);

    // Stage 3 animation
    player.playerLevel = 'level3';
    player.animations.add(player.playerLevel + '_idle_left', range(380,386), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(399,405), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(418,423), 10, true);
    player.animations.add(player.playerLevel + '_walk_right', range(437,442), 10, true);
    player.animations.add(player.playerLevel + '_attack_left', range(456,461), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(475,480), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [494], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [513], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [532], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [551], 10, false);

    switchPlayerLevel(player, level=level);

    // Add to group player1 or player2
    playerGroup.add(player);
}

function createMech(playerGroup, x = 0, y = 0, level = 'level1') {
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
    player.playerDirection = playerDirection;
    player.playerJumpSensitivity = playerJumpSensitivity;
    player.playerMoveSpeed = playerMoveSpeed;
    player.playerJumpSpeed = playerJumpSpeed;
    player.playerJumping = playerJumping;

    player.brokenCollide = false;

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
    player.playerLevel = 'level1';
    player.animations.add(player.playerLevel + '_idle_left', range(0,7), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(19,26), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(38,56), 20, true);
    player.animations.add(player.playerLevel + '_walk_right', range(57,75), 20, true);
    player.animations.add(player.playerLevel + '_attack_left', range(76,87), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(95,106), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [114], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [133], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [152], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [171], 10, false);


    // Stage 2 animation
    player.playerLevel = 'level2';
    player.animations.add(player.playerLevel + '_idle_left', range(190,197), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(209,216), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(228,237), 10, true);
    player.animations.add(player.playerLevel + '_walk_right', range(247,256), 10, true);
    player.animations.add(player.playerLevel + '_attack_left', range(266,273), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(285,292), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [304], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [323], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [342], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [361], 10, false);

    // Stage 3 animation
    player.playerLevel = 'level3';
    player.animations.add(player.playerLevel + '_idle_left', range(380,387), 10, true);
    player.animations.add(player.playerLevel + '_idle_right', range(399,406), 10, true);
    player.animations.add(player.playerLevel + '_walk_left', range(418,423), 10, true);
    player.animations.add(player.playerLevel + '_walk_right', range(437,442), 10, true);
    player.animations.add(player.playerLevel + '_attack_left', range(456,461), 10, false);
    player.animations.add(player.playerLevel + '_attack_right', range(475,480), 10, false);
    player.animations.add(player.playerLevel + '_jump_left', [494], 10, false);
    player.animations.add(player.playerLevel + '_jump_right', [513], 10, false);
    player.animations.add(player.playerLevel + '_fall_left', [532], 10, false);
    player.animations.add(player.playerLevel + '_fall_right', [551], 10, false);

    switchPlayerLevel(player, level=level);

    // Add to group player1 or player2
    playerGroup.add(player);
}

function switchAllLevel() {
    player1Group.forEach(function(player) {switchPlayerLevel(player);}, this);
    //player1Group.forEach(function(player) {switchPlayerLevel(player);}, this);
}

function switchPlayerLevel(player, level = null) {
    if (level) {
        player.playerLevel = level;
    } else if (player.playerLevel == 'level1') {
        player.playerLevel = 'level2';
    } else if (player.playerLevel == 'level2') {
        player.playerLevel = 'level3';
    } else if (player.playerLevel == 'level3') {
        player.playerLevel = 'level1';
    }
    if (player.playerLevel == 'level1') {
        player.body.bounce.y = 0;
        player.body.gravity.y = 1000;
        player.body.setSize(64, 64, 32, 64);
        player.playerMoveSpeed = 50;
        player.playerJumpSpeed = -250;
    } else if (player.playerLevel == 'level2') {
        player.body.bounce.y = 0.1;
        player.body.gravity.y = 600;
        player.body.setSize(32, 64, 48, 64);
        player.playerMoveSpeed = 100;
        player.playerJumpSpeed = -375;
    } else if (player.playerLevel == 'level3') {
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 600;
        player.body.setSize(32, 64, 48, 64);
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
        if (player.playerLevel == 'level1') {
            switchPlayerLevel(player, 'level2')
        } else if (player.playerLevel == 'level2') {
            switchPlayerLevel(player, 'level3')
        } else if (player.playerLevel == 'level3') {
            switchPlayerLevel(player, 'level1')
        }
    }
*/
// PLatform collisions are based on player only
    if (!downButton.isDown) {
        var platformCollision = game.physics.arcade.collide(player, platformGroup);
    }
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (attackButton.isDown) {
        if (player.playerDirection == 'left') {
            player.animations.play(player.playerLevel + '_attack_left');
        } else if (player.playerDirection == 'right') {
            player.animations.play(player.playerLevel + '_attack_right');
        }

    } else if (leftButton.isDown) {
       //  Move to the right
       player.body.velocity.x = -player.playerMoveSpeed;
       player.playerDirection = 'left';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play(player.playerLevel + '_jump_left');
           } else {
               player.animations.play(player.playerLevel + '_fall_left');
           }
       } else {
           player.animations.play(player.playerLevel + '_walk_left');
       }
    } else if (rightButton.isDown) {
       //  Move to the right
       player.body.velocity.x = player.playerMoveSpeed;
       player.playerDirection = 'right';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play(player.playerLevel + '_jump_right');
           } else {
               player.animations.play(player.playerLevel + '_fall_right');
           }

       } else {
           player.animations.play(player.playerLevel + '_walk_right');
       }
    } else {
        if (player.playerDirection == 'left') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play(player.playerLevel + '_jump_left');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play(player.playerLevel + '_fall_left');
           } else {
               player.animations.play(player.playerLevel + '_idle_left');
           }
        } else if (player.playerDirection == 'right') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play(player.playerLevel + '_jump_right');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play(player.playerLevel + '_fall_right');
           } else {
               player.animations.play(player.playerLevel + '_idle_right');
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
            if (player.playerLevel == 'level1') {
                var x = game.world.width -32;
            } else if (player.playerLevel == 'level2') {
                var x = game.world.width -48;
            } else if (player.playerLevel == 'level3') {
                var x = game.world.width -48;
            }

        } else if (player.body.x > (game.world.width - 128)) {
            if (player.playerLevel == 'level1') {
                var x = -96;
            } else if (player.playerLevel == 'level2') {
                var x = -80;
            } else if (player.playerLevel == 'level3') {
                var x = -80;
            }
        }

        if (player.model == 'mech') {
            createMech(player.group, x, y - 64, level=player.playerLevel);
        } else {
            createKnight(player.group, x, y - 64, level=player.playerLevel);
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


function resumeMusic() {
    music.mute = false;
    music.play();
}


function preload() {
    // Preload loadImages
    loadImages();
    loadSpriteSheets();
    loadMusic();

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
    music.volume = 5;
    music.mute = false;
    music.play();

    // Setup controls
    player1Controls();
    player2Controls();
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

    // Create map1
    createMap1(groundGroup, worldWrapGroup, platformGroup);

    // Create characters
    //createBattery(player1Group);
    createMech(player1Group);

    game.world.bringToTop(groundGroup);
    game.world.bringToTop(player1Group);
    game.world.bringToTop(player2Group);
    game.world.bringToTop(platformGroup);

    console.log(player1Group);
    console.log(player2Group);
    console.log(groundGroup);
    //console.log(test(1,10));
    this.game.onResume.add(resumeMusic, this);
    resumeMusic();
}

function update() {
    // Colliders
    var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
    //var groundCollision3 = game.physics.arcade.overlap(player1Group, groundGroup);
    var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player1Group, worldWrapGroup);
    //var platformCollision = game.physics.arcade.collide(player1Group, platformGroup);

    // Control movement and animations for player 1
    player1Group.forEach(function(player) {controlPlayer(player, player1Group);}, this);


    // Control movement and animations for player 2
    //player2Group.forEach(function(player) {controlPlayer(player, 'player2');}, this);
}
