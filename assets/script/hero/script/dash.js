cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        this.hero = cc.find("Canvas/HeroLayer/hero/player")
    },

    start() {
        this.node.angle = this.hero.angle;
        this.node.scaleX = this.hero.scaleX;
    },

    update(dt) {
        this.node.opacity -= 25;
        if (this.node.opacity <= 0) {
            this.node.destroy();
        }
    },
});
