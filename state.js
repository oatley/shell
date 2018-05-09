// State control
let isTitleScreen = true;
let isGameOver = false;
let isGameOverScreen = false;

let state = {
    gameOver: function () {
        clean.cleanPortraits();
        clean.cleanPlatforms();
        let screenGameOver = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
        screenGameOver.anchor.setTo(0.5, 0.5);
        displayScreensGroup.add(screenGameOver);
        game.world.bringToTop(displayScreensGroup);
        if (player1Group.length > 0) {
            console.log('you win player1');
            player1Group.forEach(function(player) {
                console.log(player.model);
                player.portrait = game.add.sprite(game.world.width / 2, game.world.height / 2 - 100, player.model + player.playerStage);
                player.portrait.anchor.setTo(0.5, 0.5);
                portraitsGroup.add(player.portrait);
                game.world.bringToTop(portraitsGroup);
                game.world.bringToTop(player.group);
                game.world.bringToTop(platformGroup);
            }, this);
        } else if (player2Group.length > 0) {
            console.log('you win player2');
            player2Group.forEach(function(player) {
                console.log(player.model);
                player.portrait = game.add.sprite(game.world.width / 2, game.world.height / 2 - 100, player.model + player.playerStage);
                player.portrait.anchor.setTo(0.5, 0.5);
                portraitsGroup.add(player.portrait);
                game.world.bringToTop(portraitsGroup);
                game.world.bringToTop(player.group);
                game.world.bringToTop(platformGroup);
            }, this);
        }
        isGameOverScreen = true;
    },
    startGame: function () {
        // Clean up all left over sprites
        clean.cleanUpAll();

        // Create map1
        levels.createMap1();

        // Create characters
        characters.createPlayer(player1Group);
        characters.createPlayer(player2Group);

        // Resume music if it stopped
        audio.resumeMusic();
    },
    startGameCheck: function() {
        // Control game state (title screen, game over screen, in game)
        if (isGameOver && resetGameButton.isDown) {
            clean.cleanUpAll();
            isGameOver = false;
            isGameOverScreen = false;
            state.startGame();
        } else if (isTitleScreen && resetGameButton.isDown) {
            isTitleScreen = false;
            isGameOverScreen = false;
            state.startGame();
        }
    }
};
