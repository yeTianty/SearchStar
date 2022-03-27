
cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        gameData.BulletControl2 = this;
        cc.director.getPhysicsManager().enabled = true;
        this.bossNode = cc.find("Canvas/BossLayer/pos");
        this.heroNode = cc.find("Canvas/HeroLayer/hero");
        this.lineLayer = cc.find("Canvas/bulletLayer/lineLayer");
    },

    start() {
        this.init();
    },

    init() {
        this.angle = 0;
        this.shootCount = 0;
    },

    goShoot() {
        this.schedule(this.shootModel, 4);
    },
    // 停止射击
    stopShoot() {
        this.unschedule(this.shootModel);
    },

    shootModel() {
        let random = Math.random() * gameData.Boss1.nowHpCount | 0;
        switch (random) {
            case 0:
                gameData.Boss1.randomShootModel();
                this.shootType4();
                break;
            case 1:
                gameData.Boss1.randomShootModel();
                this.shootType5();
                break;
            case 2:
                gameData.Boss1.randomShootModel();
                this.shootType6();
                break;
            case 3:
                Math.random() > 0.5 ? gameData.Boss1.leftGoRight() : gameData.Boss1.rightGoLeft();
                this.shootType7();
                break;
            default:
                break;
        }
    },


    shootType4() {
        this.schedule(this.createStar, 1, 4);
    },
    shootType5() {
        this.createRotateLine();
    },
    shootType6() {
        // 时间间隔，重复次数，开始延时
        this.schedule(this.createMoveLine, 2, 2, 0.5);
    },
    shootType7() {
        // 时间间隔，重复次数，开始延时
        // this.bossMove();
        this.schedule(this.createFire, 0.3, 5);
    },
    // boss的移动
    bossMove() {
        let boss = cc.find("Canvas/BossLayer/pos")
        cc.Tween.stopAllByTarget(boss);
        cc.tween(boss)
            .to(2, { x: -cc.winSize.width / 2 + 200 })
            .to(2, { x: cc.winSize.width / 2 - 200 })
            .call(() => { this.unschedule(this.createFire); })
            .start()
    },
    // 鬼火
    createFire() {
        let bullet = cc.instantiate(gameData.storeHouse.prefab["daoBullet"]);
        let collider = bullet.getComponent(cc.PhysicsPolygonCollider);
        collider.tag = 500;
        bullet.addComponent("lineBullet");
        this.lineLayer.addChild(bullet);
    },
    // 创建移动的线
    createMoveLine() {
        for (let i = 1; i <= 2; i++) {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["lineBullet"]);
            bullet.color = cc.Color.BLUE;
            let com = bullet.addComponent("lineBullet");
            if (i % 2 === 0) {
                //左边
                this.dir = -1;
                bullet.anchorX = 0.5;
                bullet.x = -cc.winSize.width / 2 - 100;
                bullet.y = 0;
                bullet.angle = 60;
            } else {
                this.dir = 1;
                bullet.anchorX = 0.5;
                bullet.x = cc.winSize.width / 2 + 100;
                bullet.y = 0;
                bullet.angle = -60;

            }
            this.lineLayer.parent.addChild(bullet);
            // 线的移动
            com.moveLine(this.dir);
        }
    },
    // 旋转的四条线
    createRotateLine() {
        let angleChange = 90;
        for (let i = 0; i < 4; i++) {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["lineBullet"]);
            bullet.x = 0;
            bullet.y = 0;
            bullet.angle = i * angleChange;
            let com = bullet.addComponent("lineBullet");
            this.lineLayer.addChild(bullet);
            com.rotateLine();
        }
    },
    // 根据英雄的位置生成星星
    createStar() {
        // 获取英雄的位置
        let pos = this.heroNode.position;
        // pos = cc.find("Canvas").convertToNodeSpaceAR(pos);
        let bullet = cc.instantiate(gameData.storeHouse.prefab["starBullet"]);
        bullet.addComponent("starBullet");
        bullet.x = pos.x;
        bullet.y = pos.y;
        cc.find("Canvas/bulletLayer").addChild(bullet);
    },


    // update(dt) { },
});
