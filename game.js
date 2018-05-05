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

// Player2Controls objects
var upPlayer2Button;
var downPlayer2Button;
var leftPlayer2Button;
var rightPlayer2Button;
var attackPlayer2Button;

// Default player stats
var playerDirection = 'left';
var playerJumpSensitivity = -5; // Negative number, default is about -2.8 falling always
var playerMoveSpeed = 50;
var playerJumpSpeed = -350; // Negative number
var playerJumping = false;

// maps
var groundGroup;
var worldBoundsGroup;

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

function loadAnimations() {
    // Create the animation frames for each character

}

function createMap1(groundGroup, worldWrapGroup) {
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
    var mountain = game.add.sprite(0, -64, 'mountain');
    var cloud = game.add.sprite(game.world.width - 128, -32, 'cloud');
    for (var i = 0; i < 10; i++) {
        var ground = groundGroup.create(-64 + (64*i), game.world.height - 64, 'ground');
        ground.body.immovable = true;
        ground.body.setSize(64, 32, 0, 32);
        var roof = groundGroup.create(-64 + (64*i), 0 - 64, 'ground');
        roof.body.immovable = true;
    }
    var worldWrapTile = worldWrapGroup.create(-64, game.world.height - 64, 'ground');
    worldWrapTile.body.immovable = true;
    worldWrapTile.body.onOverlap = new Phaser.Signal();
    worldWrapTile.body.onOverlap.add(worldWrap);
    worldWrapTile.body.setSize(64, 480)
    var worldWrapTile2 = worldWrapGroup.create(game.world.width, game.world.height -64, 'ground');
    worldWrapTile2.body.immovable = true;
    worldWrapTile2.body.onOverlap = new Phaser.Signal();
    worldWrapTile2.body.onOverlap.add(worldWrap)
    worldWrapTile2.body.setSize(64, 480)

}

function createBattery(playerGroup, x = 0, y = 0) {
    // Positions
    if (playerGroup === player1Group && (x == 0 && y == 0) ) {
        var x = Number(game.world.width/2 - 200) ;
        var y = Number(game.world.height - 200)
    } else if (playerGroup === player2Group && (x == 0 && y == 0)) {
        var x = Number(game.world.width/2 + 200) ;
        var y = Number(game.world.height - 200)
    }

    // Design each character with custom stuff
    var player = game.add.sprite(x, y, 'battery');
    game.physics.arcade.enable(player);

    // Custom attributes
    player.a = 'meow';
    player.group = playerGroup;
    player.playerDirection = playerDirection;
    player.playerJumpSensitivity = playerJumpSensitivity;
    player.playerMoveSpeed = playerMoveSpeed;
    player.playerJumpSpeed = playerJumpSpeed;
    player.playerJumping = playerJumping;

    // World bounds
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(worldWrapDieLoser, this);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = false;
    player.body.setSize(32, 60, 16, 0);
    //player.body.checkCollision.up = true;
    //player.body.checkCollision.down = true;


    //  Our two animations, walking left and right.
    player.animations.add('idle_left', range(0,6), 10, true);
    player.animations.add('idle_right', range(7,13), 10, true);
    player.animations.add('fall_left', [14], 10, false);
    player.animations.add('fall_right', [15], 10, false);
    player.animations.add('walk_left', range(16,21), 10, true);
    player.animations.add('walk_right', range(22,27), 10, true);
    player.animations.add('jump_left', [28], 10, false);
    player.animations.add('jump_right', [29], 10, false);
    player.animations.add('weld_left', [32, 33, 34, 35, 36, 37, 38, 39, 40], 10, true);
    player.animations.add('weld_right', [48, 49, 50, 51, 52, 53, 54, 55, 56], 10, true);

    // Add to group player1 or player2
    playerGroup.add(player);
}

function createKnight() {
    // Design each character with custom stuff

}

function createMech(playerGroup, x = 0, y = 0) {
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

    // World bounds
    player.checkWorldBounds = true;
    player.events.onOutOfBounds.add(worldWrapDieLoser, this);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 1000;
    player.body.collideWorldBounds = false;
    player.body.setSize(64, 64, 32, 64);
    //player.body.checkCollision.up = true;
    //player.body.checkCollision.down = true;


    //  Our two animations, walking left and right.
    player.animations.add('idle_left', range(0,7), 10, true);
    player.animations.add('idle_right', range(19,26), 10, true);
    player.animations.add('walk_left', range(38,56), 20, true);
    player.animations.add('walk_right', range(57,75), 20, true);
    player.animations.add('attack_left', range(76,87), 10, false);
    player.animations.add('attack_right', range(95,106), 10, false);
    player.animations.add('jump_left', [114], 10, false);
    player.animations.add('jump_right', [133], 10, false);
    player.animations.add('fall_left', [152], 10, false);
    player.animations.add('fall_right', [171], 10, false);
    //player.animations.add('weld_left', [32, 33, 34, 35, 36, 37, 38, 39, 40], 10, true);
    //player.animations.add('weld_right', [48, 49, 50, 51, 52, 53, 54, 55, 56], 10, true);

    // Add to group player1 or player2
    playerGroup.add(player);
}

function createCrazyBilly() {
    // Design each character with custom stuff

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
    } else if (group == player2Group) {
        var upButton = upPlayer2Button;
        var downButton = downPlayer2Button;
        var leftButton = leftPlayer2Button;
        var rightButton = rightPlayer2Button;
        var attackButton = attackPlayer2Button;
    }

    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if (attackButton.isDown) {
        if (player.playerDirection == 'left') {
            player.animations.play('attack_left');
        } else if (player.playerDirection == 'right') {
            player.animations.play('attack_right');
        }

    } else if (leftButton.isDown) {
       //  Move to the right
       player.body.velocity.x = -player.playerMoveSpeed;
       player.playerDirection = 'left';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_left');
           } else {
               player.animations.play('fall_left');
           }
       } else {
           player.animations.play('walk_left');
       }
    } else if (rightButton.isDown) {
       //  Move to the right
       player.body.velocity.x = player.playerMoveSpeed;
       player.playerDirection = 'right';
       if (player.body.velocity.y < player.playerJumpSensitivity || !(player.body.touching.down || player.body.blocked.down)) {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_right');
           } else {
               player.animations.play('fall_right');
           }

       } else {
           player.animations.play('walk_right');
       }
    } else {
        if (player.playerDirection == 'left') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_left');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play('fall_left');
           } else {
               player.animations.play('idle_left');
           }
        } else if (player.playerDirection == 'right') {
           if (player.body.velocity.y < player.playerJumpSensitivity) {
               player.animations.play('jump_right');
           } else if (!(player.body.touching.down || player.body.blocked.down)) {
               player.animations.play('fall_right');
           } else {
               player.animations.play('idle_right');
           }
        }
    }

       //  Allow the player to jump if they are touching the ground.
   if (!upButton.isDown && player.playerJumping && player.body.velocity.y < 0) {
       player.body.velocity.y = player.body.velocity.y * 0.5;
       player.playerJumping = false;
   } else if (upButton.isDown && (player.body.touching.down && !player.body.touching.up)) {
       player.body.velocity.y = player.playerJumpSpeed;
       player.playerJumping = true;
   }

}

function worldWrap(bounds, player) {
    if (player.group.length == 1) {
        // game.world.width - 64 is the bounds for rigth side
        // 0 is the bounds for left side
        var y = player.body.y;
        if (player.body.x < 0) {
            var x = game.world.width -32;
        } else if (player.body.x > (game.world.width - 128)) {
            var x = -96;
        }

        if (player.model == 'mech') {
            createMech(player.group, x, y - 64);
        } else {
            createBattery(player.group, x, player.body.y);
        }

        game.world.bringToTop(player.group);
    }
}

function worldWrapDieLoser (player) {
    player.destroy();
}



function preload() {
    // Preload loadImages
    loadImages();
    loadSpriteSheets();


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

    // Create map1
    createMap1(groundGroup, worldWrapGroup);

    // Create characters
    //createBattery(player1Group);
    createMech(player1Group);

    game.world.bringToTop(groundGroup);
    game.world.bringToTop(player1Group);
    game.world.bringToTop(player2Group);

    console.log(player1Group);
    console.log(player2Group);
    console.log(groundGroup);
    //console.log(test(1,10));
}

function update() {
    // Colliders
    var groundCollision = game.physics.arcade.collide(player1Group, groundGroup);
    var groundCollision2 = game.physics.arcade.collide(player2Group, groundGroup);
    var worldWrapCollision = game.physics.arcade.overlap(player1Group, worldWrapGroup);

    // Control movement and animations for player 1
    player1Group.forEach(function(player) {controlPlayer(player, player1Group);}, this);

    // Control movement and animations for player 2
    //player2Group.forEach(function(player) {controlPlayer(player, 'player2');}, this);
}
