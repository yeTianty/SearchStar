
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
        // let random = Math.random() * 3 | 0;
        let random = 2
        switch (random) {
            case 0:
                this.schedule(this.shootType1, 0.3, 9);
                break;
            case 1:
                this.schedule(this.shootType2, 0.1, 8);
                break;
            case 2:
                this.createLine();

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
    shootType3() {
        this.createBigBullet(e);
    },
    // 生成大子弹
    createBigBullet(e) {
        let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet2"]);
        let com = bullet.addComponent("Bullet");
        let posX = this.node.x + 50 * Math.cos(e.angle * Math.PI / 180);
        let posY = this.node.y + 50 * Math.sin(e.angle * Math.PI / 180);
        bullet.setPosition(cc.v2(posX, posY))
        com.init(cc.v2(posX, posY).normalize().mul(300))
        this.node.addChild(bullet)
    },
    //生成3条线 适用于模式3；
    createLine() {
        let posV = cc.v2(this.heroNode.position).sub(cc.v2(this.node.position))
        let angle = cc.v2(1, 0).signAngle(cc.v2(this.heroNode.x - this.node.x, this.heroNode.y - this.node.y)) / Math.PI * 180;
        for (let i = -1; i < 2; i++) {
            lineLong = posV.mul(3).len()
            let line = cc.instantiate(gameData.storeHouse.prefab["line"]);
            line.width = lineLong;
            line.angle = angle + i * 10 + 180;
            console.log(angle);
            this.node.getChildByName("lineLayer").addChild(line);
            cc.tween(this.node.getChildByName("lineLayer"))
                .to(0.01, { opacity: 255 })
                .to(1, { opacity: 0 })
                .call(() => { this.node.getChildByName("lineLayer").destroyAllChildren() })
                .start()
        }

    },

    // boss当前状态及 是否可以生成子弹变量
    // isShoot(sum) {
    //     if (this.shootCount >= sum) {
    //         this.unschedule(this.shootType1);
    //         gameData.bossModel = false
    //     }
    // },
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
