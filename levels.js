var levels = {
    // Create a second and 3rd map off screen so the doubles never get out of sync
    createMap1: function(groundGroup, worldWrapGroup, platformGroup, backgroundGroup) {
        for (var i = 0; i < 8; i++) {
            var sky = backgroundGroup.create(0 + (64*i), 0, 'sky1');
        }
        for (var i = 0; i < 8; i++) {
            var sky = backgroundGroup.create(0 + (64*i), 64, 'sky2');
        }
        for (var i = 0; i < 8; i++) {
            var sky = backgroundGroup.create(0 + (64*i), 128, 'sky3');
        }
        for (var i = 0; i < 8; i++) {
            var sky = backgroundGroup.create(0 + (64*i), 192, 'sky4');
        }
        var mountain = backgroundGroup.create(0, -48, 'mountain');
        var mountain2 = backgroundGroup.create(game.world.width + 64, -48, 'mountain');
        mountain2.scale.x *=-1;
        var cloud = backgroundGroup.create(game.world.width - 100, -32, 'cloud');
        var cloud2 = backgroundGroup.create(220, -10 , 'cloud');
        var cloud22 = backgroundGroup.create(-32, -10 , 'cloud');
        cloud2.scale.x *= -1;

        var platform = platformGroup.create(game.world.width/2 - 64, -40, 'platform');
        platform.body.immovable = true;
        platform.body.setSize(100, 4, 14, 110);
        platform.body.onCollide = new Phaser.Signal();
        platform.body.onCollide.add(characters.groundPlayer);
        platform.body.checkCollision.down = false;
        platform.body.checkCollision.left = false;
        platform.body.checkCollision.right = false;
        var platform2 = platformGroup.create(48, 24, 'platform');
        platform2.body.immovable = true;
        platform2.body.setSize(100, 4, 14, 110);
        platform2.body.onCollide = new Phaser.Signal();
        platform2.body.onCollide.add(characters.groundPlayer);
        platform2.body.checkCollision.down = false;
        platform2.body.checkCollision.left = false;
        platform2.body.checkCollision.right = false;
        var platform3 = platformGroup.create(game.world.width - 128 - 48, 24, 'platform');
        platform3.body.immovable = true;
        platform3.body.setSize(100, 4, 14, 110);
        platform3.body.onCollide = new Phaser.Signal();
        platform3.body.onCollide.add(characters.groundPlayer);
        platform3.body.checkCollision.down = false;
        platform3.body.checkCollision.left = false;
        platform3.body.checkCollision.right = false;

        for (var i = 0; i < 10; i++) {
            var ground = groundGroup.create(-64 + (64*i), game.world.height - 64, 'ground');
            ground.body.immovable = true;
            ground.body.setSize(64, 32, 0, 32);
            ground.body.onCollide = new Phaser.Signal();
            ground.body.onCollide.add(characters.groundPlayer);
            var roof = groundGroup.create(-64 + (64*i), 0 - 64, 'ground');
            roof.body.setSize(64, 32, 0, 0);
            roof.body.immovable = true;
        }
        //var worldWrapTile = worldWrapGroup.create(-64, game.world.height - 64, 'ground');
        var worldWrapTile = worldWrapGroup.create(-64, 0, 'ground');
        worldWrapTile.body.immovable = true;
        worldWrapTile.body.onOverlap = new Phaser.Signal();
        worldWrapTile.body.onOverlap.add(screen.worldWrap);
        worldWrapTile.body.setSize(4, 1000, 60)
        //var worldWrapTile2 = worldWrapGroup.create(game.world.width, game.world.height -64, 'ground');
        var worldWrapTile2 = worldWrapGroup.create(game.world.width, 0, 'ground');
        worldWrapTile2.body.immovable = true;
        worldWrapTile2.body.onOverlap = new Phaser.Signal();
        worldWrapTile2.body.onOverlap.add(screen.worldWrap)
        worldWrapTile2.body.setSize(4, 1000)

    }
};
