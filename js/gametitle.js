/**
 * Created by atlani_m on 15/06/2017.
 */
var gameTitle = function(game) {
    var logo;
}

gameTitle.prototype = {
    preload: function () {

        this.game.load.image('phaser', 'assets/pole-emploi.jpg');
        this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Pixelate.js');
    },
    create: function () {
        this.logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser');

        this.logo.anchor.set(0.5);
        var filter = this.game.add.filter('Pixelate', 800, 600);
        this.logo.filters = [filter];

        this.game.add.tween(filter).to({sizeX: 100, sizeY: 100}, 5000, "Quad.easeInOut", true, 0, -1, true);

        this.time.events.add(2500, this.change, this);
    },
    change: function() {
        this.game.state.start('intro');
    }
}

