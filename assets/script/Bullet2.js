
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
        if (otherCollider === 200 || otherCollider === 300 || otherCollider === 400 || otherCollider === 50) {
            // cc.log(1);
            this.node.destroy();
        }
    },
    // update (dt) {},
});
