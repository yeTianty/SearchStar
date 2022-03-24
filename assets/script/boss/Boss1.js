
cc.Class({
    extends: cc.Component,

    properties: {
        progressHp: cc.ProgressBar,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.Boss1 = this;
        let bossData = gameData.storeHouse.json["boss"]["boss1"]
        this.hp = bossData["bossHp"];
        this.hpCount = bossData["hpCount"];
    },

    start() {
        this.bossBg = this.node.parent.getChildByName("bossBg")
        this.hero = cc.find("Canvas/HeroLayer/hero")
        this.anima = this.node.getComponent(cc.Animation)
        this.quan = cc.find("Canvas/BossLayer/pos/quan")
        this.nowHpCount = 1;
        this.lockHp = true
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
        let randomTime = Math.random() * 4
        cc.Tween.stopAllByTarget(cc.find("Canvas/BossLayer/pos"))
        cc.tween(cc.find("Canvas/BossLayer/pos"))
            .to(randomTime, { position: cc.v2(0, 0) })
            .start()
    },

    // 从左至右移动
    leftGoRight() {
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(1, { position: cc.v2(-cc.find("Canvas/camera").width * 1 / 3, 300) })
            .to(2, { position: cc.v2(cc.find("Canvas/camera").width * 1 / 3, 300) })
            .start()
    },

    // 从右至左移动
    rightGoLeft() {
        let randomTime = Math.random() * 5
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(randomTime, { position: cc.v2(cc.find("Canvas/camera").width * 1 / 3, 300) })
            .to(randomTime, { position: cc.v2(-cc.find("Canvas/camera").width * 1 / 3, 300) })
            .start()
    },

    // 回到中间停止3s
    returnCenter() {
        cc.Tween.stopAllByTarget(this.node.parent);
        cc.tween(this.node.parent)
            .to(0.1, { position: cc.v2(this.hero.x, 200) })
            .delay(3)
            .start()
    },

    // 随机移动
    randomMove() {
        let randomX = Math.random() * cc.find("Canvas/camera").width * 2 / 3 - cc.find("Canvas/camera").width / 3
        let randomY = Math.random() * cc.winSize.height * 3 / 4 - cc.winSize.height / 5
        let randomTime = Math.random() * 5
        cc.Tween.stopAllByTarget(this.node.parent)
        cc.tween(this.node.parent)
            .to(randomTime, { position: cc.v2(randomX, randomY) })
            .start()
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
    randomShootModel() {
        let random = Math.random() * 7 | 0;
        if (random === 0) { this.centerMove() }
        else if (random === 1) { this.leftGoRight() }
        else if (random === 2) { this.rightGoLeft() }
        else if (random === 3) { this.returnCenter() }
        else if (random === 4) { this.stopMove() }
        else { this.randomMove() };
    },

    onCollisionEnter: function (other, self) {
        if (other.node.getComponent(cc.PhysicsPolygonCollider) && this.lockHp) {
            if (other.node.getComponent(cc.PhysicsPolygonCollider).tag === 200) {
                console.log(this.hp);
                this.hp -= 10
                this.progressHp.progress = this.hp / gameData.storeHouse.json["boss"]["boss1"]["bossHp"];
                cc.Tween.stopAllByTarget(this.quan)
                cc.tween(this.quan)
                    .call(() => { this.quan.active = true; cc.find("Canvas/BossLayer/pos/boss1/head/face/remi_24").active = false; cc.find("Canvas/BossLayer/pos/boss1/head/face/remi_32").active = true })
                    .delay(0.05)
                    .call(() => {
                        this.quan.active = false;
                    })
                    .start()
                other.node.destroy();
                if (this.hp <= 0 && this.lockHp) {
                    this.lockHp = false;
                    if (this.nowHpCount >= this.hpCount) {
                        this.node.getComponent(cc.CircleCollider).active = false;
                        gameData.bossIsDied = true;
                        this.bossOver();
                    } else {
                        this.nowHpCount += 1;
                        this.resumeHp();
                    }
                }
            }
        } else {
            cc.find("Canvas/BossLayer/pos/boss1/head/face/remi_24").active = true;
            cc.find("Canvas/BossLayer/pos/boss1/head/face/remi_32").active = false
        }
    },

    // 血量回复100
    resumeHp() {
        this.schedule(this.addHp, 0.01)
    },
    addHp() {
        if (this.progressHp.progress >= 1) {
            this.unschedule(this.addHp)
            this.progressHp.progress = 1;
            this.hp = gameData.storeHouse.json["boss"]["boss1"]["bossHp"]
            this.scheduleOnce(() => { this.lockHp = true }, 0.5)
        }
        this.progressHp.progress += 0.01
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
        if (this.hero.x <= this.node.parent.x) {
            this.node.scaleX = 1;
        } else {
            this.node.scaleX = -1
        }
    },
});
