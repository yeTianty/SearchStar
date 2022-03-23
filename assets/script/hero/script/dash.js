cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad() { },

    start() {
        this.node.angle = this.hero.angle;
        this.node.scaleX = this.hero.scaleX;
    },

    init(node) {
        this.hero = node;
    },

    update(dt) {
        this.node.opacity -= 25;
        if (this.node.opacity <= 0) {
            this.node.destroy();
        }
    },
});
