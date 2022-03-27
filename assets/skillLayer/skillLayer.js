cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        gameData.skillLayer = this;
    },

    start() {
        this.skillCD = true;
        this.shootSpeed = this.node.getChildByName("shootSpeed")
        this.ready = this.node.getChildByName("ready")

    },

    changeState() {
        if (this.skillCD) {
            this.skillCD = false;
            this.shootSpeed.opacity = 150
            this.ready.active = this.skillCD;
            this.scheduleOnce(() => {
                this.skillCD = true;
                this.shootSpeed.opacity = 255;
                this.ready.active = this.skillCD;
            }, gameData.skillCD);
        }

    },



    // update (dt) {},
});
