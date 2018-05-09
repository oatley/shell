// State control
let isTitleScreen = true;
let isGameOver = false;

var state = {
    gameOver: function () {
        let screenGameOver = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
        screenGameOver.anchor.setTo(0.5, 0.5);
        displayScreensGroup.add(screenGameOver);
        game.world.bringToTop(displayScreensGroup);
        if (player1Group.length > 0) {
            console.log('you win player1');
            player1Group.forEach(function(player) {
                console.log(player.model);
            }, this);
        } else if (player2Group.length > 0) {
            console.log('you win player1');
            player2Group.forEach(function(player) {
                console.log(player.model);
            }, this);
        }
        clean.cleanPlayers();
    }
};