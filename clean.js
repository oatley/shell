let clean = {
    // Run all cleanup functions
    cleanUpAll: function() {
        clean.cleanPlayers();
        clean.cleanGround();
        clean.cleanPlatforms();
        clean.cleanBackground();
        clean.cleanScreens();
        if(sci)sci.destroy();
        if(jan)jan.destroy();
    },
    // Delete all screens
    cleanScreens: function() {
        while(displayScreensGroup.length > 0) { // Because it refuses to run the function on all items in the group
            displayScreensGroup.forEach(function(displayedScreen) {
                displayedScreen.destroy();
            }, this);
        }
    },
    // Delete all players from game
    cleanPlayers: function() {
        while(player1Group.length > 0) { // Because it refuses to run the function on all items in the group
            player1Group.forEach(function(player) {
                if (!player) return;
                if (player.attackTimer) player.attackTimer.stop();
                if (player.attackTimer2) player.attackTimer2.stop();
                if (player.attackBox) player.attackBox.destroy();
                player.destroy();
            }, this);
        }
        while(player2Group.length > 0) { // Because it refuses to run the function on all items in the group
            player2Group.forEach(function(player) {
                if (!player) return;
                if (player.attackTimer) player.attackTimer.stop();
                if (player.attackTimer2) player.attackTimer2.stop();
                if (player.attackBox) player.attackBox.destroy();
                player.destroy();
            }, this);
        }
    },
    // Delete all platforms from game
    cleanPlatforms: function() {
            while(platformGroup.length > 0) { // Because it refuses to run the function on all items in the group
                platformGroup.forEach(function(platform) {
                    platform.destroy();
                }, this);
            }
    },
    // Delete all ground from game
    cleanGround: function() {
            while(groundGroup.length > 0) { // Because it refuses to run the function on all items in the group
                groundGroup.forEach(function(ground) {
                    ground.destroy();
                }, this);
            }
    },
    // Delete all backgrounds from game
    cleanBackground: function() {
            while(backgroundGroup.length > 0) { // Because it refuses to run the function on all items in the group
                backgroundGroup.forEach(function(background) {
                    background.destroy();
                }, this);
            }
    }
};
