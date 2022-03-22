cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab,
        bulletPar: cc.Node,
        bulletPoint: cc.Node,
        hand: cc.Node,
    },


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;

        this.node.parent.on("touchstart", this.onTouchMove, this);
        this.node.parent.on("touchmove", this.onTouchMove, this);
        this.node.parent.on("touchend", this.onTouchEnd, this);


    },

    start() {
        this.shoot = cc.find("Canvas/HeroLayer/hero/player/body/righthand")
        this.hero = cc.find("Canvas/HeroLayer/hero")
        this.dir = 1;
        this.shootSpeed = 0.05;
        this.isCanShoot = false;
        this.isShoot = true;
    },

    onTouchStart(e) {
        this.isCanShoot = true;

        this.event = e;
    },

    onTouchMove(e) {

        this.isCanShoot = true;

        this.event = e;

    },

    shootMove(e) {

        let dir = this.node.parent.convertToNodeSpaceAR(e.getLocation())

        //根据鼠标位置调整角色朝向
        if (dir.x < this.hero.x) {
            this.hero.children[0].scaleX = this.dir;
        } else if (dir.x > this.hero.x) {
            this.hero.children[0].scaleX = -this.dir;
        }

    },



    onTouchEnd() {
        cc.Tween.stopAllByTarget(this.hand.children[0])
        cc.tween(this.hand.children[0])
            .to(0.3, { opacity: 0 })
            .start();
        this.isCanShoot = false;
    },

    createBullet(e) {
        if (this.isShoot) {
            this.isShoot = false;
            this.scheduleOnce(() => {
                this.isShoot = true;
            }, this.shootSpeed);
        } else {
            return;
        }
        let location = this.node.convertToNodeSpaceAR(e.getLocation());
        let unitV = location.normalize();
        let angle = cc.v2(0, -1).signAngle(unitV) * 180 / Math.PI;

        let bullet = cc.instantiate(this.bullet)
        bullet.angle = angle
        bullet.addComponent("bullet").init(unitV);
        this.bulletPar.parent.addChild(bullet);

    },

    update(dt) {
        if (this.isCanShoot) {

            this.shootMove(this.event);

            this.bulletPar.active = true;

            this.createBullet(this.event);

        } else {
            this.bulletPar.active = false;

        }
    },
});
