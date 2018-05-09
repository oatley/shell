// State control
let isTitleScreen = true;
let isGameOver = false;

var state = {
    gameOver: function (player) {
        clean.cleanPlayers();
        let screenGameOver = game.add.sprite(game.world.width/2, game.world.height/2, 'youwin');
        screenGameOver.anchor.setTo(0.5, 0.5);
        displayScreensGroup.add(screenGameOver);
    }
};
