
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {

    },

    start() {

    },

    init(v) {
        // this.node.getComponent(cc.RigidBody).linearVelocity = v
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 100) {
            console.log("hit");
        }
    },
    // update (dt) {},
});
