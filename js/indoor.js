var indoor = function(game){
    var player;
    var cursors;
    var direction = "down";
    var speed;
    var p_x;
    var p_y;
    var spaceKey;
    var data = '';
    var data_maison = '';
    var data_bat = '';
    var room = 0;
};

indoor.prototype = {
    preload: function(){
        this.game.load.image('background','assets/tests/debug-grid-1920x1920.png');
        this.game.load.image('tiles', 'assets/3863.png');
        this.game.load.image('tiles_batiment', 'assets/tile set batiment.png');
        this.game.load.image('maison', 'assets/indoor.png');
        //very important that the width and height be correct otherwise animations will not look right.
        this.game.load.spritesheet('dude', 'assets/sprite.png', 24, 32);
    },

    create: function() {
        this.data_maison = readfile('assets/maison.csv');

//  Add data to the cache
        this.game.cache.addTilemap('tilemap', null, this.data_maison, Phaser.Tilemap.CSV);

        //  Create our map (the 16x16 is the tile size)
        map_maison = this.game.add.tilemap('tilemap', 17, 17);

        //  'tiles' = cache image key, 16x16 = tile size
        map_maison.addTilesetImage('maison', 'maison', 17, 17, 0);

        map_maison.createLayer(0).resizeWorld();




        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        //set up the background and the player
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //setting the player in center for fun
        this.player = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'dude');
        this.game.physics.p2.enable(this.player);
        //player.anchor.setTo(0.5, 0.5);
        this.game.camera.follow(this.player, Phaser.Camera.FOLLOW_TOPDOWN);

        //animations
        this.player.animations.add('down', [0, 1, 2], 10, true);
        this.player.animations.add('left', [3, 4, 5], 10, true);
        this.player.animations.add('right', [6, 7,8], 10, true);
        this.player.animations.add('up', [9, 10, 11], 10, true);
        this.cursors = this.game.input.keyboard.createCursorKeys();


        this.player.body.x = 27 * 17;
        this.player.body.y = 15 * 17;
        this.room = 0;
    },

    move_maison: function() {
    if(this.spaceKey.isDown)
    {
        this.speed = 300;
    }else{
        this.speed = 200;
    }
    if (this.cursors.left.isDown && this.p_x > 13)
    {
        this.player.body.moveLeft(this.speed);
        this.player.animations.play('left');
    }
    else if (this.cursors.right.isDown && this.p_x < 30)
    {
        this.player.body.moveRight(this.speed);
        this.player.animations.play('right');
    }
    else if (this.cursors.up.isDown && this.p_y > 13 )
    {
        this.player.body.moveUp(this.speed);
        this.player.animations.play('up');
    }
    else if (this.cursors.down.isDown && this.p_y < 17)
    {
        this.player.body.moveDown(this.speed);
        this.player.animations.play('down');
    }
    else
    {
        this.player.animations.stop(null, true);
        this.player.frame = 1;
    }
},

    update: function() {
        this.player.body.setZeroVelocity();

        this.p_x = this.player.position.x / 17;
        this.p_y = this.player.position.y / 17;

        if (this.p_x < 14 && this.p_y > 16.5 && this.room == 0)
            this.game.state.start("Game");
        if (this.p_y > 28.5 && this.p_y < 28.7 && this.p_x > 26.2 && this.p_x < 26.7 && this.room == 1)// 26.2 et 26.7
            create();

        if (this.room == 0)
            this.move_maison();
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
/**
 * Created by atlani_m on 15/06/2017.
 */
