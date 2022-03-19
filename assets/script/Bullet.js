
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

    onBeginContact: function (contact, selfCollider, otherCollider) {
    },
    update(dt) {
        gameData.destroy(this.node)
    },
});
