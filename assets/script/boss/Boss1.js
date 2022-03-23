
cc.Class({
    extends: cc.Component,

    properties: {
        progressHp: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        // this.node.dispatchEvent( new cc.Event.EventCustom('bossAdmission', true) );
        // this.node.dispatchEvent(new cc.Event.EventCustom('openShoot', true));
        // gameData.Boss = this

        gameData.Boss1 = this;
        this.hp = gameData.storeHouse.json["boss"]["boss1"]["bossHp"];
    },

    start() {
        // this.bossAdmission();
        this.bossBg = this.node.parent.getChildByName("bossBg")
        this.hero = cc.find("Canvas/HeroLayer/hero")
        this.anima = this.node.getComponent(cc.Animation)
    },

    /********boss入场********** */
    bossAdmission() {
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .call(() => { this.node.scale = 0 })
            .to(1, { scale: 1, angle: 720 })
            .call(() => { this.anima.play("boss1") })
            // 测试，将开始进入战斗放入入场之后2s开始
            .delay(2)
            .call(() => {
                this.bgAngle();

            })
            .start()

    },

    /**************开始进入战斗时*************** */
    // boss开始移动
    // 移动至屏幕中间
    centerMove() {
        cc.Tween.stopAllByTarget(cc.find("Canvas/BossLayer/pos"))
        cc.tween(cc.find("Canvas/BossLayer/pos"))
            .to(1, { position: cc.v2(0, 0) })
            .start()
    },

    // 从左至右移动
    leftGoRight() {
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(1, { position: cc.v2(-cc.winSize.width * 1 / 3, 300) })
            .to(2, { position: cc.v2(cc.winSize.width * 1 / 3, 300) })
            .start()
    },

    // 回到中间停止3s
    returnCenter() {
        cc.Tween.stopAllByTarget(this.node.parent);
        cc.tween(this.node.parent)
            // .delay(1)
            .to(0.1, { position: cc.v2(this.hero.x, 200) })
            .delay(3)
            .start()
    },

    // 随机移动
    randomMove() {
        let randomX = Math.random() * cc.find("Canvas/camera").width * 2 / 3 - cc.find("Canvas/camera").width / 3
        let randomY = Math.random() * cc.find("Canvas/camera").height * 3 / 4 - cc.find("Canvas/camera").height / 5
        let randomTime = Math.random() * 3
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(randomTime, { position: cc.v2(randomX, randomY) })
    },

    // 停止原地
    stopMove() {
        cc.Tween.stopAllByTarget(this.node.parent);
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

    onBeginContact: function (contact, selfCollider, otherCollider) {
        // if (otherCollider.tag === 200) {
        //     this.progressHp.progress = this.hp / 1000
        // }
    },

    onCollisionEnter: function (other, self) {
        // console.log(other.node.getComponent(cc.PhysicsPolygonCollider).tag);
        if (other.node.getComponent(cc.PhysicsPolygonCollider)) {
            if (other.node.getComponent(cc.PhysicsPolygonCollider).tag === 200) {
                this.hp -= 10
                this.progressHp.progress = this.hp / 3000;
                other.node.destroy();
                if (this.hp <= 0) {
                    this.node.getComponent(cc.CircleCollider).active = false;
                    gameData.bossIsDied = true;
                }
            }
        }

    },

    bossOver() {
        gameData.BulletControl.stopShoot();
        let animaState = this.node.getComponent(cc.Animation).getAnimationState("boss1DieAnima")
        if (!animaState.isPlaying) {
            this.anima.play("boss1DieAnima")
            this.schedule(() => {
                let bobm = cc.instantiate(gameData.storeHouse.prefab["bobm"]);
                let randomX = Math.random() * this.node.width - this.node.width / 2
                let randomY = Math.random() * this.node.height - this.node.height / 2
                bobm.setPosition(cc.v2(randomX, randomY));
                this.node.addChild(bobm)
                if (i = 2) {
                    let animaState1 = bobm.getComponent(cc.Animation).getAnimationState("bossBobm")
                    animaState1.on('stop', () => { this.node.parent.destroy() }, this);
                }
            }, 0.5, 3)
            this.scheduleOnce(() => {
                this.node.parent.destroy();
            }, 2)
        }
    },

    update(dt) {
        if (gameData.bossIsDied) {
            this.bossOver();
        }
        if (this.hero.x <= this.node.parent.x) {
            this.node.scaleX = 1;
        } else {
            this.node.scaleX = -1
        }
    },
});
