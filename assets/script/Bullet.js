
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    init(v) {
        this.node.getComponent(cc.RigidBody).linearVelocity = v
    },


    type2() {

    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider === 200 || 300 || 400 || 50) {
            this.node.destroy();
        }
    },
    update(dt) {
        // gameData.destroy(this.node)
    },
});
