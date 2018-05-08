var clean = {
    // Delete all players from game
    cleanPlayers: function(player1Group, player2Group) {
        if (player1Group.length > 0) {
            player1Group.forEach(function(player) {
                if (!player) return;
                if (player.attackTimer) player.attackTimer.stop();
                if (player.attackTimer2) player.attackTimer2.stop();
                if (player.attackBox) player.attackBox.destroy();
                player.destroy();
            }, this);
        }
        if (player2Group.length > 0) {
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
    cleanPlatforms: function(platformGroup) {
        if (platformGroup.length > 0) {
            while(platformGroup.length > 0) { // Because it refuses to run the function on all items in the group
                console.log('platform', platformGroup.length);
                platformGroup.forEach(function(platform) {
                    platform.destroy();
                }, this);
            }
        }
    },
    // Delete all ground from game
    cleanGround: function(groundGroup) {
        if (groundGroup.length > 0) {
            while(groundGroup.length > 0) { // Because it refuses to run the function on all items in the group
                console.log('ground', groundGroup.length);
                groundGroup.forEach(function(ground) {
                    ground.destroy();
                }, this);
            }
        }
    },
    // Delete all backgrounds from game
    cleanBackground: function(backgroundGroup) {
        if (backgroundGroup.length > 0) {
            while(backgroundGroup.length > 0) { // Because it refuses to run the function on all items in the group
                console.log('cleanBackground', backgroundGroup.length);
                backgroundGroup.forEach(function(background) {
                    background.destroy();
                }, this);
            }
        }
    }
};
