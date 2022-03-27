cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        this.hp = 20;
        this.biHit = true;
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (this.biHit && otherCollider.tag === 200) {
            this.biHit = false;
            this.hp -= 1;
            if (this.hp <= 0) {
                cc.find("Canvas/next").active = true;
                cc.find("Canvas/camera/guoGuan").active = true;
                this.node.destroy();
                return;
            }
            cc.Tween.stopAllByTarget(this.node)
            cc.tween(this.node)
                .to(0.05, { opacity: 100 })
                .to(0.05, { opacity: 255 })
                .start()
            setTimeout(() => { this.biHit = true; }, 150)

            otherCollider.destroy();
        }
    },
    // update (dt) {},
});
