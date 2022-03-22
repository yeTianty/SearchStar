cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        this.node.getComponent(cc.RigidBody).linearVelocity = this.speed.mul(2000);
    },

    init(unitV) {
        this.speed = unitV;
    },



    update(dt) {
        if (Math.abs(this.node.x) > cc.winSize.width
            || Math.abs(this.node.y) > cc.winSize.height) {
            this.node.destroy();
        }
    },
});
