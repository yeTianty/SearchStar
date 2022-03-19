const BulletManager = require("./base/BulletManager")
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.Boss1 = this;
    },

    start() {
        this.bossAdmission();
        this.bossBg = this.node.parent.getChildByName("bossBg")
        this.hero = cc.find("Canvas/HeroLayer/hero")
    },

    /********boss入场********** */
    bossAdmission() {
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .call(() => { this.node.scale = 0 })
            .to(1, { scale: 1, angle: 720 })
            // 测试，将开始进入战斗放入入场之后2s开始
            .delay(2)
            .call(() => { this.bgAngle(); this.playMoveStart() })
            .start()
    },

    /**************开始进入战斗时*************** */
    // boss开始移动
    playMoveStart() {
        this.schedule(this.playMove, 3)
    },
    playMove() {
        if (gameData.bossModel) {
            return
        }
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(1, { x: (Math.random() * (cc.winSize.width - this.bossBg.width) - (cc.winSize.width / 2 - this.bossBg.width / 2)) })
            .start()
    },

    // boss背景出现并旋转
    bgAngle() {
        this.bossBg.active = true
        cc.Tween.stopAllByTarget(this.bossBg)
        cc.tween(this.bossBg)
            .call(() => { this.bossBg.scale = 0 })
            .to(1, { scale: 1 })
            .by(1, { angle: 20 })
            .repeatForever()
            .start()
    },
    // boss开始发射子弹
    shootStart() {

    },


    update(dt) {
        if (this.hero.x <= this.node.parent.x) {
            this.node.scaleX = 1;
        } else {
            this.node.scaleX = -1
        }
    },
});
