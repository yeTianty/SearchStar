
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
    // 碰撞进行中
    // onPreSolve: function (contact, selfCollider, otherCollider) {
    //     if (otherCollider === 500) {
    //         this.node.getComponent(cc.PhysicsCircleCollider).sensor = true;
    //     }
    // },
    // // 碰撞结束
    // onPostSolve: function (contact, selfCollider, otherCollider) {
    //     this.node.getComponent(cc.PhysicsCircleCollider).sensor = false;
    // },
    // 开始碰撞
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 200 || otherCollider.tag === 300 || otherCollider.tag === 400 || otherCollider.tag === 100) {
            // cc.log(1);
            this.node.destroy();
        }
    },
    update(dt) {
        // gameData.destroy(this.node)
    },
});
