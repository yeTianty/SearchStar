
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.BulletControl = this
        this.bossNode = cc.find("Canvas/BossLayer/pos");
        this.heroNode = cc.find("Canvas/HeroLayer/hero");
    },

    start() {
        this.init();
    },

    init() {
        this.angle = 0;
        this.shootCount = 0;
    },
    // 启动射击
    goShoot() {
        this.schedule(this.shootModel, 3)
    },
    // 停止射击
    stopShoot() {
        this.unschedule(this.shootModel);
    },
    // 射击模式
    shootModel() {
        let random = Math.random() * ((gameData.Boss1.nowHpCount + 1) | 0);

        switch (random) {
            case 0:
                gameData.Boss1.randomShootModel();
                this.shootType1();
                break;
            case 1:
                gameData.Boss1.randomShootModel()
                this.shootType2();
                break;
            case 2:
                gameData.Boss1.stopMove();
                this.shootType3();
                break;
            case 3:
                gameData.Boss1.randomShootModel();
                this.shootType4();
                break;
            case 4:
                gameData.Boss1.randomShootModel();
                this.shootType5();
                break;
            default:
                break;
        }
    },

    // 攻击模式1 身边生成一圈子弹随后扩散
    shootType1() {
        gameData.bossModel = true;
        this.schedule(() => { this.createCircle(12, 800); this.shootCount += 1; }, 0.3, 6)
    },

    // 攻击模式2 身边生成一圈会旋转的子弹
    shootType2() {
        gameData.Boss1.returnCenter()
        this.ge = 0
        cc.Tween.stopAllByTarget(this.node);
        gameData.bossModel = true;
        this.schedule(this.createType2, 0.2)
    },
    // 旋转子弹
    createType2() {
        this.ge += 1;
        if (this.ge >= 20) {
            this.unschedule(this.createType2)
        }
        let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet1"])
        bullet.setPosition(this.bossNode.position)
        let com = bullet.addComponent("Bullet");
        com.getComponent("Bullet").circleFly();
        this.node.addChild(bullet);
    },

    // 射击模式3 以玩家为终点 ，生成3条线并生成大型子弹射出

    //生成3条线 适用于模式3；
    shootType3() {
        let posV = cc.v2(this.heroNode.position).sub(cc.v2(this.bossNode.position))
        let angle = cc.v2(-1, 0).signAngle(posV) * 180 / Math.PI;
        for (let i = -1; i < 2; i++) {
            lineLong = posV.mul(3).len()
            let line = cc.instantiate(gameData.storeHouse.prefab["line"]);
            line.setPosition(this.bossNode.position);
            line.angle = angle + i * 20;
            this.i = i;
            // this.node.getChildByName("lineLayer").addChild(line);
            this.lineTween(line.angle);
        }
        this.scheduleOnce(() => { gameData.Boss1.randomMove() }, 0.2)
    },

    lineTween(angle) {
        cc.tween(this.node.getChildByName("lineLayer"))
            .to(0.01, { opacity: 255 })
            .to(1, { opacity: 0 })
            .call(() => {
                this.createBigBullet(angle)
                this.node.getChildByName("lineLayer").destroyAllChildren()
            })
            .start()
    },

    createBigBullet(e) {
        this.schedule(() => {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet2"]);
            let com = bullet.addComponent("Bullet");
            let posX = bullet.x + 100 * Math.cos(e * Math.PI / 180)
            let posY = bullet.x + 100 * Math.sin(e * Math.PI / 180)
            bullet.setPosition(this.bossNode.position);
            com.init(cc.v2(-posX, -posY).normalize().mul(600))
            this.node.addChild(bullet);
        }, 0.2, 4)

    },

    // 射击模式4
    shootType4() {
        cc.find("bat", this.node).setPosition(this.bossNode.position)
        cc.find("bat", this.node).active = true;
        let left = cc.find("bat/left", this.node)
        let right = cc.find("bat/right", this.node)
        this.scheduleOnce(() => {
            let xLine = cc.instantiate(gameData.storeHouse.prefab["xLine"]);
            left.addChild(xLine)
            let xLine1 = cc.instantiate(gameData.storeHouse.prefab["xLine1"]);
            xLine.addComponent("Bullet2");
            xLine1.addComponent("Bullet2")
            right.addChild(xLine1)
            this.dir = 1;
            this.rotate(xLine, this.dir);
            this.dir = -1
            this.rotate(xLine1, this.dir);

        }, 1)


    },

    rotate(xLine, dir) {
        cc.Tween.stopAllByTarget(xLine)
        cc.tween(xLine)
            .call(() => { xLine.parent.active = true })
            .to(2, { angle: 480 * dir })
            .call(() => { xLine.parent.active = false; xLine.destroy() })
            .start()
    },
    // 射击模式5
    shootType5() {
        this.i = 1;
        this.j = -2;
        this.batCount = 0;
        this.schedule(this.createBatBullet, 0.3, 5);
    },

    createBatBullet() {
        this.i *= -1;
        if (this.i === -1) {
            this.j += 1
        }
        let bat = cc.instantiate(gameData.storeHouse.prefab["bat"]);
        let com = bat.addComponent("Bullet")
        bat.setPosition(cc.v2(this.bossNode.x + this.i * -200, (this.bossNode.y + this.j * 200)));
        let dir = bat.x > this.bossNode.x ? 1 : -1;
        com.curveFly(dir);
        this.node.addChild(bat);
    },

    // 生成环状子弹
    createCircle(num, speed) {
        let radius = 50;
        this.bulletCircleList = [];
        for (let i = 0; i < num; i++) {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet1"]);
            let posX = this.node.x + radius * Math.cos(this.angle * Math.PI / 180);
            let posY = this.node.y + radius * Math.sin(this.angle * Math.PI / 180);
            bullet.setPosition(this.bossNode.position);
            this.bulletCircleList.push(bullet);
            this.node.addChild(bullet);
            let com = bullet.addComponent("Bullet");
            com.init(cc.v2(posX, posY).normalize().mul(speed))
            this.angle += 360 / num;
        }
    },
    // update(dt) { },
});
