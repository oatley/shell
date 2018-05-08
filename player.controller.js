let playerController = {
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

        resetGameButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        musicMuteButton.onDown.add(muteMusicVolume, this);
        musicPlus1Button.onDown.add(increaseMusicVolume, this);
        musicPlus2Button.onDown.add(increaseMusicVolume, this);
        musicMinus1Button.onDown.add(decreaseMusicVolume, this);
        musicMinus2Button.onDown.add(decreaseMusicVolume, this);

        //switchPlayer1Button.onDown.add(switchAllLevel, this);
        game.add.group();
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
}

module.exports = playerController;
