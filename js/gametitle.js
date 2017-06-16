/**
 * Created by atlani_m on 15/06/2017.
 */
var gameTitle = function(game){}

gameTitle.prototype = {
    preload: function() {

    this.game.load.image('phaser', 'assets/pole-emploi.jpg');
    this.game.load.script('filter', 'https://cdn.rawgit.com/photonstorm/phaser/master/v2/filters/Pixelate.js');

    },
    create: function () {
        var logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'phaser');

        logo.anchor.set(0.5);

        var filter = this.game.add.filter('Pixelate', 800, 600);

        logo.filters = [filter];

        this.game.add.tween(filter).to( { sizeX: 100, sizeY: 100 }, 5000, "Quad.easeInOut", true, 0, -1, true);
    },
    playTheGame: function () {
        this.game.state.start("Indoor");
    }
}