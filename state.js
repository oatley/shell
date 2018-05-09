// State control
let isTitleScreen = true;
let isGameOver = false;

var state = {
    gameOver: function () {
        clean.cleanPortraits();
        let screenGameOver = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
        screenGameOver.anchor.setTo(0.5, 0.5);
        displayScreensGroup.add(screenGameOver);
        game.world.bringToTop(displayScreensGroup);
        if (player1Group.length > 0) {
            console.log('you win player1');
            player1Group.forEach(function(player) {
                console.log(player.model);
                player.portrait = game.add.sprite(game.world.width / 2, game.world.height / 2 - 1, player.model + player.playerStage);
                player.portrait.anchor.setTo(0.5, 0.5);
                portraitsGroup.add(player.portrait);
                game.world.bringToTop(portraitsGroup);
            }, this);
        } else if (player2Group.length > 0) {
            console.log('you win player2');
            player2Group.forEach(function(player) {
                console.log(player.model);
                player.portrait = game.add.sprite(game.world.width / 2, game.world.height / 2 - 128, player.model + player.playerStage);
                player.portrait.anchor.setTo(0.5, 0.5);
                portraitsGroup.add(player.portrait);
                game.world.bringToTop(portraitsGroup);
            }, this);
        }
        //clean.cleanPlayers();
    }
};
