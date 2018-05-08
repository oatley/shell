var controller = {
    // Set player 1 controls
    player1Controls: function() {
        // Keyboard controls
        upPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.W);
        downPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.S);
        leftPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.A);
        rightPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.D);
        attackPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.F);
        switchPlayer1Button = game.input.keyboard.addKey(Phaser.Keyboard.E);
        resetGameButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


        //game.add.group();
        // Xbox controller controls

    },
    // Set player 2 controls
    player2Controls: function() {
        // Keyboard controls
        upPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        attackPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.L);
        //switchPlayer2Button = game.input.keyboard.addKey(Phaser.Keyboard.K);

        // Xbox controller controls

    },
    musicControls: function() {
        musicMuteButton = game.input.keyboard.addKey(Phaser.Keyboard.P);
        musicPlus1Button = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);
        musicPlus2Button = game.input.keyboard.addKey(Phaser.Keyboard.PLUS);
        musicMinus1Button = game.input.keyboard.addKey(Phaser.Keyboard.MINUS);
        musicMinus2Button = game.input.keyboard.addKey(Phaser.Keyboard.UNDERSCORE);
        musicMuteButton.onDown.add(audio.muteMusicVolume, this);
        musicPlus1Button.onDown.add(audio.increaseMusicVolume, this);
        musicPlus2Button.onDown.add(audio.increaseMusicVolume, this);
        musicMinus1Button.onDown.add(audio.decreaseMusicVolume, this);
        musicMinus2Button.onDown.add(audio.decreaseMusicVolume, this);
    }
};
