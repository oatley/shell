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
            console.log(player1Group[0].model);
        } else if (player2Group.length > 0) {
            console.log('you win player1');
            console.log(player1Group);
        }
        clean.cleanPlayers();
    }
};
