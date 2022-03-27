
cc.Class({
    extends: cc.Component,

    properties: {

    },



    // onLoad () {},

    start() {
    },
    // 1
    rotateLine() {
        cc.tween(this.node)
            .by(0.1, { angle: 10 })
            .repeat(30)
            .call(() => { this.node.destroy(); })
            .start()
    },
    // 2
    moveLine(dir) {
        cc.tween(this.node)
            .by(0.01, { x: 5 * -dir })
            .repeat(1000)
            .call(() => { this.node.destroy(); })
            .start()
    },


    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 400 && selfCollider.node.name === "daoBullet") {
            selfCollider.node.children[0].active = false;
            selfCollider.node.children[1].active = true;
            selfCollider.node.removeComponent(cc.PhysicsPolygonCollider);
            let anim = selfCollider.node.children[1].getComponent(cc.Animation);
            cc.audioEngine.setEffectsVolume(0.6)
            cc.audioEngine.playEffect(gameData.storeHouse.sound["fire"])
            anim.play("fire");
            anim.on('finished', this.onFinished, this);
        }
    },


    onFinished() {
        this.node.destroy();
    },



    // update (dt) {},
});
