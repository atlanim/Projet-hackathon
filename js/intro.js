/**
 * Created by belugum on 16/06/17.
 */
var intro = function(game) {
    var spaceKey;
};


intro.prototype = {
    preload: function () {
        this.game.load.image('text', 'assets/Debut.png');
    },
    create: function () {
        this.game.add.image(0, 0, 'text').scale.setTo(0.75,0.75);
        this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function() {
        if(this.spaceKey.isDown)
        {
            this.game.state.start('Indoor');
        }
    }
};