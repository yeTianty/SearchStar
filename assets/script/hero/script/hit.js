cc.Class({
    extends: cc.Component,

    properties: {

    },

    // onLoad () {},

    start() {
        this.isDash = false;
        this.beHited = false;
        this.playerPos = this.node.parent.parent.getPosition()
        this.player = this.node.parent.parent.parent;
        this.camera = gameData.camera;
    },

    init(hp) {
        this.hp = hp;
    },

    changeState() {
        this.isDash = true;
        setTimeout(() => { this.isDash = false; }, 500)
    },

    beHit() {
        let hpLayer = cc.find("Canvas/camera/UiLayer/heroHpLayer");
        if (hpLayer.children.length > 0) {
            hpLayer.children[0].destroy();
        } else {
            console.log("玩家死亡");
        }
        this.beHited = true;
        cc.tween(this.camera)
            .to(0.1, { angle: 1 })
            .to(0.1, { angle: -1 })
            .to(0.1, { angle: 0 })
            .start();

        cc.tween(this.player)
            .to(0.2, { opacity: 100 })
            .to(0.2, { opacity: 255 })
            .union()
            .repeat(5)
            .start()
        this.scheduleOnce(() => { this.beHited = false; }, 3)
    },

    onBeginContact: function (contact, selfCollider, otherCollider) {

        if (!this.isDash && !this.beHited && otherCollider.tag === 500) {
            this.beHit()
        }
    },

    update(dt) {
        this.node.setPosition(this.playerPos)
        if (this.isDash || this.beHited) {
            // cc.log("无敌状态");
        }
    },
});
