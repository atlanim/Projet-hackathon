/*
	bare bones main.js file for phaser
	edit at your own risk:)
*/


var Game = function(game){
    var player;
    var cursors;
    var direction = "down";
    var speed;
    var spaceKey;
    var data = '';
    var data_bat = '';
    var data_maison = '';
    var music;
    var room = 0;
    var p_x;
    var p_y;
};

Game.prototype = {
preload: function(){
    this.game.load.image('background', 'assets/tests/debug-grid-1920x1920.png');
    this.game.load.image('pnj1', 'assets/sprites/characters/adam.png');
    this.game.load.image('pnj2', 'assets/sprites/characters/Ashley.png');
    this.game.load.image('pnj3', 'assets/sprites/characters/Matt.png');
    this.game.load.image('tiles', 'assets/3863.png');
    this.game.load.image('tiles_batiment', 'assets/tile set batiment.png');
    //very important that the width and height be correct otherwise animations will not look right.
    this.game.load.spritesheet('dude', 'assets/sprite.png', 24, 32);
    this.game.load.audio('boden', 'assets/music.mp3');
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.speed = 0;
    },

create: function() {

    data = readfile('assets/map_sol.csv', Game);
    data_bat = readfile('assets/map_bat.csv', Game);
    //  Add data to the cache
    this.game.cache.addTilemap('tilemap', null, data, Phaser.Tilemap.CSV);

    //  Create our map (the 16x16 is the tile size)
    map = this.game.add.tilemap('tilemap', 16, 16);

    //  'tiles' = cache image key, 16x16 = tile size
    map.addTilesetImage('tiles', 'tiles', 17, 17, 1);
    map.createLayer(0).resizeWorld();


    this.game.cache.addTilemap('tilemap_bat', null, data_bat, Phaser.Tilemap.CSV);
    //  Create our map (the 16x16 is the tile size)
    map_bat = this.game.add.tilemap('tilemap_bat', 16, 16);

    //  'tiles' = cache image key, 16x16 = tile size
    map_bat.addTilesetImage('tiles_batiment', 'tiles_batiment', 17, 17, 1);

    map_bat.createLayer(0).resizeWorld();

    this.game.add.image(260, 265, 'pnj1').scale.setTo(0.75,0.75);
    this.game.add.image(200, 405, 'pnj2').scale.setTo(0.75,0.75);
    this.game.add.image(715, 265, 'pnj3').scale.setTo(0.75,0.75);
    this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');



    this.music = this.game.add.audio('boden');

    this.music.play();

    spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    //set up the background and the player
    //setting the player in center for fun

    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.enable(this.player);
    this.player.anchor.setTo(0.5, 0.5);
    this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);

    //animations
    this.player.body.x = 450;
    this.player.body.y = 510;
    this.player.animations.add('down', [0, 1, 2], 10, true);
    this.player.animations.add('left', [3, 4, 5], 10, true);
    this.player.animations.add('right', [6, 7, 8], 10, true);
    this.player.animations.add('up', [9, 10, 11], 10, true);
    cursors = this.game.input.keyboard.createCursorKeys();

    room = 1;
},

update: function() {
    // have to always reset the player's velocity otherwise when you move him he'll keep going
    this.player.body.setZeroVelocity();

    if (this.player.body.y > 451 && this.player.body.x > 425 && this.player.body.y < 485 && this.player.body.x < 485)// 26.2 et 26.7
    {
        this.game.state.start("Indoor");
    }
    if (this.cursors.left.isDown) {
        if (spaceKey.isDown) {
            this.speed = 300;
        } else {
            this.speed = 200;
        }
        this.player.body.moveLeft(this.speed);
        this.player.animations.play('left');
        this.direction = "left";
    }
    else if (this.cursors.right.isDown) {
        if (spaceKey.isDown) {
            this.speed = 300;
        } else {
            this.speed = 200;
        }
        this.player.body.moveRight(this.speed);
        this.player.animations.play('right');
        this.direction = "right";
    }
    else if (this.cursors.up.isDown) {
        if (spaceKey.isDown) {
            this.speed = 300;
        } else {
            this.speed = 200;
        }
        this.player.body.moveUp(this.speed);
        this.player.animations.play('up');
        this.direction = "up";
    }
    else if (this.cursors.down.isDown) {
        if (spaceKey.isDown) {
            this.speed = 300;
        } else {
            this.speed = 200;
        }
        this.player.body.moveDown(this.speed);
        this.player.animations.play('down');
        this.direction = "down";
    }
    else {
        this.player.animations.stop(null, true);
        if (this.direction === "left") {
            this.player.frame = 4;
        } else if (this.direction === "right") {
            this.player.frame = 7;
        } else if (this.direction === "up") {
            this.player.frame = 10;
        } else {
            this.player.frame = 1;
        }
    }
},
}

function readfile(filename , Game) {
    var txtFile = new XMLHttpRequest();
    txtFile.open("GET", filename, false);
    var txt = '';
    txtFile.onreadystatechange = function () {
        txt = txtFile.responseText;
    };
    txtFile.send();
    return txt;
}