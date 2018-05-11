let load = {
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
        game.load.image('blank', 'assets/sprites/characters/green.png');
        game.load.image('green', 'assets/sprites/characters/green.png');

        // Title screen and win screen
        game.load.image('youwin', 'assets/sprites/ui/ui_winscreen.png');
        game.load.image('title', 'assets/sprites/ui/ui_titleScreen.png');

        // Portraits for each character
        game.load.image('sciStage1', 'assets/sprites/ui/ui_portrait_sci01.png');
        game.load.image('janStage1', 'assets/sprites/ui/ui_portrait_jan01.png');
        game.load.image('sciStage2', 'assets/sprites/ui/ui_portrait_sci02.png');
        game.load.image('janStage2', 'assets/sprites/ui/ui_portrait_jan02.png');
        game.load.image('sciStage3', 'assets/sprites/ui/ui_portrait_sci03.png');
        game.load.image('janStage3', 'assets/sprites/ui/ui_portrait_jan03.png');
    },
    // Load spritesheets for each character
    loadSpriteSheets: function() {
        game.load.spritesheet('battery', 'assets/sprites/characters/battery-spritesheet.png', 64, 64);
        game.load.spritesheet('sci', 'assets/sprites/characters/sci_spritesheet.png', 128, 128);
        game.load.spritesheet('jan', 'assets/sprites/characters/knight_spritesheet.png', 128, 128);
    },
    // Load music and audio files
    loadMusic: function () {
        game.load.audio('bgmusic', ['assets/audio/bgmusic.mp3']);
    },
    loadSoundFX: function () {
        game.load.audio('run', ['assets/audio/running.mp3']);
        game.load.audio('hit', ['assets/audio/hits.mp3']);
        game.load.audio('land', ['assets/audio/land.mp3']);
    },
    // Preload images, spritesheets, and audio
    preload: function () {
        load.loadImages();
        load.loadSpriteSheets();
        load.loadMusic();
        load.loadSoundFX();
    }
};
