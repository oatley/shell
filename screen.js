let screen = {
    displayConfiguration: function() {
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
        game.input.activePointer.leftButton.onDown.add(screen.toggleFullscreen, this);
    },
    displayTitleScreen: function(displayScreensGroup) {
        let titlescreen = displayScreensGroup.create(game.world.width/2, game.world.height/2, 'title');
        titlescreen.anchor.setTo(0.5, 0.5);
    },
    toggleFullscreen: function() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    },
    // Create a second version of the player wallwrapping
    worldWrap: function(bounds, player) {
        if (player.group.length == 1) {
            // game.world.width - 64 is the bounds for rigth side
            // 0 is the bounds for left side
            let y = player.body.y;
            if (player.body.x < 0) {
                if (player.playerStage == 'Stage1') {
                    let x = game.world.width -32;
                } else if (player.playerStage == 'Stage2') {
                    let x = game.world.width -48;
                } else if (player.playerStage == 'Stage3') {
                    let x = game.world.width -48;
                }

            } else if (player.body.x > (game.world.width - 128)) {
                if (player.playerStage == 'Stage1') {
                    let x = -96;
                } else if (player.playerStage == 'Stage2') {
                    let x = -80;
                } else if (player.playerStage == 'Stage3') {
                    let x = -80;
                }
            }

            if (player.model == 'mech') {
                characters.createMech(player.group, x, y - 64 - 20, stage=player.playerStage);
            } else {
                characters.createKnight(player.group, x, y - 64 - 20, stage=player.playerStage);
            }

            game.world.bringToTop(player.group);
            game.world.bringToTop(platformGroup);
        }
    },
    // Callback to destroy character out of bounds
    destroyCharacter: function(player) {
        player.destroy();
    }


};
