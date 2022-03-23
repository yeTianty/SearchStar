cc.Class({
    extends: cc.Component,

    properties: {
        player: cc.Node,
    },


    onLoad() {
        this.cameraWidth = this.node.width / 2
        gameData.cameraWidth = this.cameraWidth;
        gameData.camera = this.node;
    },

    start() {

        
    },




    onDestroy() {
        gameData.cameraWidth = null;
        gameData.camera = null
    },


    update(dt) {
        if (Math.abs(this.node.x + this.player.x) < gameData.cameraWidth) {
            this.node.x = this.player.x
        } else if (this.node.x <= -gameData.cameraWidth) {
            this.node.x = -gameData.cameraWidth
        } else if (this.node.x >= gameData.cameraWidth) {
            this.node.x = gameData.cameraWidth
        }
    },
});
