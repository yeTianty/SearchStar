
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        // 当动画播放完
        let anim = this.node.getComponent(cc.Animation);
        // let animState = anim.play("starBullet");
        anim.on('finished', this.onFinished, this);
    },
    onFinished() {
        this.node.destroy();
    },



    init(v) {
        this.node.getComponent(cc.RigidBody).linearVelocity = v
    },


    type2() {

    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

    },
    update(dt) {
        gameData.destroy(this.node)
    },
});
