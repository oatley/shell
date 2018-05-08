var screen = {
    toggleFullscreen: function() {
        if (game.scale.isFullScreen) {
            game.scale.stopFullScreen();
        } else {
            game.scale.startFullScreen(false);
        }
    },
    // Create a second version of the player wallwrapping
    worldWrap: function(bounds, player) {
        //player.brokenCollide = true;
        //console.log(player.brokenCollide);
        if (player.group.length == 1) {
            // game.world.width - 64 is the bounds for rigth side
            // 0 is the bounds for left side
            var y = player.body.y;
            if (player.body.x < 0) {
                if (player.playerStage == 'Stage1') {
                    var x = game.world.width -32;
                } else if (player.playerStage == 'Stage2') {
                    var x = game.world.width -48;
                } else if (player.playerStage == 'Stage3') {
                    var x = game.world.width -48;
                }

            } else if (player.body.x > (game.world.width - 128)) {
                if (player.playerStage == 'Stage1') {
                    var x = -96;
                } else if (player.playerStage == 'Stage2') {
                    var x = -80;
                } else if (player.playerStage == 'Stage3') {
                    var x = -80;
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
