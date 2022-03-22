
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bossNode = cc.find("Canvas/BossLayer/pos");
        this.heroNode = cc.find("Canvas/HeroLayer/hero");
    },

    start() {
        this.init();
        this.schedule(this.shootModel, 3)
    },

    init() {
        this.angle = 0;
        this.shootCount = 0;
    },

    shootModel() {
        // let random = Math.random() * 4 | 0;
        let random = 2
        switch (random) {
            case 0:
                this.schedule(this.shootType1, 0.3, 9);
                break;
            case 1:
                this.schedule(this.shootType2, 0.1, 8);
                break;
            case 2:
                this.shootType3();
                break;
            case 3:
                this.shootType4();
                break;
            case 4:
                this.shootType5();
                break;
            default:
                break;
        }
    },

    // 攻击模式1
    // shootGoType1() {

    // },
    // 攻击模式1 身边生成一圈子弹随后扩散
    shootType1() {
        gameData.bossModel = true;
        // this.isShoot(12);
        this.createCircle(12, 300);
        this.shootCount += 1;
    },

    // 攻击模式2 身边生成一圈会旋转的子弹
    shootType2() {
        cc.Tween.stopAllByTarget(this.node);
        gameData.bossModel = true;
        // this.isShoot(8)
        this.createCircle(8, 300);
        cc.tween(this.node)
            .by(0.1, { angle: 10 })
            .repeat(10)
            .to(0.1, { angle: 0 })
            .start();
        this.shootCount += 1;
    },

    // 射击模式3 以玩家为终点 ，生成3条线并生成大型子弹射出
    // 生成大子弹
    createBigBullet(e) {
        this.schedule(() => {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet2"]);
            let com = bullet.addComponent("Bullet");
            let posX = this.node.x + 50 * Math.cos(e * Math.PI / 180);
            let posY = this.node.y + 50 * Math.sin(e * Math.PI / 180);
            bullet.setPosition(cc.v2(posX, posY))
            // console.log(posX, posY);
            com.init(cc.v2(-posX, -posY).normalize().mul(400))
            this.node.addChild(bullet)
        }, 0.1, 3)

    },
    //生成3条线 适用于模式3；
    shootType3() {
        let posV = cc.v2(this.heroNode.position).sub(cc.v2(this.node.position))
        let angle = cc.v2(-1, 0).signAngle(posV) * 180 / Math.PI;
        cc.log(angle)
        for (let i = -2; i < 3; i++) {
            lineLong = posV.mul(3).len()
            let line = cc.instantiate(gameData.storeHouse.prefab["line"]);
            // this.node.getChildByName("lineLayer").addChild(line);
            // line.width = lineLong;
            line.angle = angle + i * 10;
            cc.log(line.angle);
            this.node.getChildByName("lineLayer").addChild(line);
            cc.tween(this.node.getChildByName("lineLayer"))
                .to(0.01, { opacity: 255 })
                .to(1, { opacity: 0 })
                .call(() => {
                    this.createBigBullet(line.angle)
                    this.node.getChildByName("lineLayer").destroyAllChildren()
                })
                .start()
        }

    },

    // 射击模式4
    shootType4() {
        cc.find("bat", this.node).active = true;
        let left = cc.find("bat/left", this.node)
        let right = cc.find("bat/right", this.node)
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
    },

    rotate(xLine, dir) {
        cc.Tween.stopAllByTarget(xLine)
        cc.tween(xLine)
            .call(() => { xLine.parent.active = true })
            .to(2, { angle: 480 * dir })
            .call(() => { xLine.parent.active = false; xLine.destroy() })
            // .delay(0.1)
            // .call(() => {  })
            .start()
    },

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
        com.openSafeLyFly();
        bat.setPosition(cc.v2(this.node.x + this.i * -200, (this.node.y + this.j * 200)));
        this.node.addChild(bat);
    },







    // 生成环状子弹
    createCircle(num, speed) {
        let radius = 50;
        for (let i = 0; i < num; i++) {
            let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet1"]);
            let posX = this.node.x + radius * Math.cos(this.angle * Math.PI / 180);
            let posY = this.node.y + radius * Math.sin(this.angle * Math.PI / 180);
            bullet.setPosition(cc.v2(posX, posY));
            this.node.addChild(bullet);
            let com = bullet.addComponent("Bullet");
            com.init(cc.v2(posX, posY).normalize().mul(speed))
            this.angle += 360 / num;
        }
    },
    // update(dt) { },
});
