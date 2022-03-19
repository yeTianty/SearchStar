
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.bossNode = cc.find("Canvas/BossLayer/pos");
    },

    start() {
        this.init();
        this.schedule(this.shootModel, 5)
    },

    init() {
        this.angle = 0;
    },

    shootModel() {
        this.shootCount = 0;
        this.schedule(this.shootType1, 0.01)

    },

    // 攻击模式1
    shootType1() {
        gameData.bossModel = true;
        if (this.shootCount >= 50) {
            this.unschedule(this.shootType1);
            gameData.bossModel = false
        }
        // let center = cc.v2(this.bossNode.position);
        let radius = 50;
        //旋转的角度
        let bullet = cc.instantiate(gameData.storeHouse.prefab["bullet1"]);
        let posX = this.bossNode.x + radius * Math.cos(this.angle * Math.PI / 180);
        let posY = this.bossNode.y + radius * Math.sin(this.angle * Math.PI / 180);
        bullet.setPosition(cc.v2(posX, posY))
        let com = bullet.addComponent("Bullet");
        com.init(cc.v2(radius * Math.cos(this.angle * Math.PI / 180), radius * Math.sin(this.angle * Math.PI / 180)).normalizeSelf().mulSelf(300))
        cc.find("Canvas/BossLayer/bulletLayer").addChild(bullet);
        this.angle += 30;
        this.shootCount += 1;
    },

    // update (dt) {},
});
