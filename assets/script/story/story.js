
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.animaState = this.node.getChildByName("storyBg").getComponent(cc.Animation).getAnimationState("bookOpen");
        this.anima = this.node.getChildByName("storyBg").getComponent(cc.Animation)

    },

    start() {
        this.anima.once("finished", () => { cc.find("Canvas/dialogue").active = true; }, this);
    },

    update(dt) {
    },
});
