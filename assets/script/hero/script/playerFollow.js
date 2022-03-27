cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
        gameOver: cc.Node,
    },


    onLoad() {
        this.cameraWidth = this.node.width / 2
        gameData.cameraWidth = this.cameraWidth;
        gameData.camera = this.node;
        gameData.dead = this.node.getChildByName("dead");
    },

    start() {


    },




    onDestroy() {
        gameData.cameraWidth = null;
        gameData.camera = null
        gameData.dead = null;
    },


    update(dt) {
        if (Math.abs(this.node.x + this.player.x) < gameData.cameraWidth) {
            this.node.x = this.player.x
            this.gameOver.x = this.player.x
        } else if (this.node.x <= -gameData.cameraWidth) {
            this.node.x = -gameData.cameraWidth
            this.gameOver.x = -gameData.cameraWidth
        } else if (this.node.x >= gameData.cameraWidth) {
            this.node.x = gameData.cameraWidth
            this.gameOver.x = gameData.cameraWidth

        }
    },
});
