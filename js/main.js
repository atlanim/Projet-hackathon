/*
	bare bones main.js file for phaser
	edit at your own risk:)
*/
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer', { preload: preload, create: create, update: update });
var player;
var cursors;
var direction = "down";
var speed;
var spaceKey;

function preload() {
	game.load.image('background','assets/tests/debug-grid-1920x1920.png');
	game.load.image('tiles', 'assets/3863.png');
	//very important that the width and height be correct otherwise animations will not look right.
	game.load.spritesheet('dude', 'assets/sprite.png', 24, 32);
}

function create() {
	var data = '';
	var cnt = 0;
    for (var y = 0; y < 128; y++)
    {
        for (var x = 0; x < 128; x++)
        {
            data += "1";//game.rnd.between(0, 20).toString();

            if (x < 127)
            {
                data += ',';
            }
        }

        if (y < 127)
        {
            data += "\n";
        }
    }

    //console.log(data);
    //  Add data to the cache
    game.cache.addTilemap('tilemap', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 16x16 is the tile size)
    map = game.add.tilemap('tilemap', 16, 16);

    //  'tiles' = cache image key, 16x16 = tile size
    map.addTilesetImage('tiles', 'tiles', 17, 17, 1);

    layer = map.createLayer(0);

    //  Scroll it
    layer.resizeWorld();

	spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	//set up the background and the player
	game.physics.startSystem(Phaser.Physics.P2JS);
	//setting the player in center for fun
	player = game.add.sprite(game.world.centerX, game.world.centerY, 'dude');
	game.physics.p2.enable(player);
	player.anchor.setTo(0.5, 0.5);
	game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

	//animations
	player.animations.add('down', [0, 1, 2], 10, true);
	player.animations.add('left', [3, 4, 5], 10, true);
	player.animations.add('right', [6, 7,8], 10, true);
	player.animations.add('up', [9, 10, 11], 10, true);
	cursors = game.input.keyboard.createCursorKeys();
}

function update() {
	// have to always reset the player's velocity otherwise when you move him he'll keep going
	player.body.setZeroVelocity();


	if (cursors.left.isDown)
	{
		if(spaceKey.isDown)
		{
			speed = 300;
		}else{
			speed = 200;
		}
		player.body.moveLeft(speed);
		player.animations.play('left');
		direction = "left";
	}
	else if (cursors.right.isDown)
	{
		if(spaceKey.isDown)
		{
			speed = 300;
		}else{
			speed = 200;
		}
		player.body.moveRight(speed);
		player.animations.play('right');
		direction = "right";
	}
	else if (cursors.up.isDown)
	{
		if(spaceKey.isDown)
		{
			speed = 300;
		}else{
			speed = 200;
		}
		player.body.moveUp(speed);
		player.animations.play('up');
		direction = "up";
	}
	else if (cursors.down.isDown)
	{
		if(spaceKey.isDown)
		{
			speed = 300;
		}else{
			speed = 200;
		}
		player.body.moveDown(speed);
		player.animations.play('down');
		direction = "down";
	}
	else {
		player.animations.stop(null, true);
		if(direction === "left"){
			player.frame = 4;
		}else if(direction === "right"){
			player.frame = 7;
		}else if(direction === "up"){
			player.frame = 10;
		}else{
			player.frame = 1;
		}


	}
}