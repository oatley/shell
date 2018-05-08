var load = {
    // Load images
    loadImages: function() {
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
        // Attack boxes
        game.load.image('blank', 'assets/sprites/characters/blank.png');
        game.load.image('green', 'assets/sprites/characters/blank.png');

        // Win screen
        game.load.image('youwin', 'assets/sprites/ui/ui_winscreen.png');
        game.load.image('title', 'assets/sprites/ui/ui_titleScreen.png');
        game.load.image('sci', 'assets/sprites/ui/ui_portrait_sci03.png');
        game.load.image('jan', 'assets/sprites/ui/ui_portrait_jan03.png');
    },
    // Load spritesheets
    loadSpriteSheets: function() {
        game.load.spritesheet('battery', 'assets/sprites/characters/battery-spritesheet.png', 64, 64);
        game.load.spritesheet('mech', 'assets/sprites/characters/sci_spritesheet.png', 128, 128);
        game.load.spritesheet('knight', 'assets/sprites/characters/knight_spritesheet.png', 128, 128);


    },
    // Load music
    loadMusic: function () {
        game.load.audio('bgmusic', ['assets/audio/bgmusic.mp3']);
    }

};
