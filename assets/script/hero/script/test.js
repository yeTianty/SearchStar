cc.Class({
    extends: cc.Component,

    properties: {
        bullet: cc.Prefab,
        bulletPar: cc.Node,
        GameOver: cc.Node
    },


    onLoad() {
        cc.director.getPhysicsManager().enabled = true;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        gameData.camera.on("touchstart", this.onTouchMove, this);
        gameData.camera.on("touchmove", this.onTouchMove, this);
        gameData.camera.on("touchend", this.onTouchEnd, this);
        this.node.on("dead", this.dead, this);
        cc.game.setFrameRate(60)
    },

    start() {
        this.node.children[0].opacity = 255;
        this.hero = this.node
        this.dir = 1;
        this.died = gameData.dead;
        this.shootSpeed = 0.1;
        this.isCanShoot = false;
        this.isShoot = true;
        this.skillUsing = true;
    },

    useSkill() {
        // if (this.skillUsing) {
        // this.skillUsing = false;
        this.shootSpeed = 0.01;
        this.scheduleOnce(() => { this.shootSpeed = 0.1 }, 3)
        // this.scheduleOnce(() => { this.skillUsing = true }, 5)
        // }

    },

    dead() {
        gameData.camera.off("touchstart", this.onTouchMove, this);
        gameData.camera.off("touchmove", this.onTouchMove, this);
        gameData.camera.off("touchend", this.onTouchEnd, this);
        if (gameData.nowScene === "boss1") {
            gameData.BulletControl.stopShoot();
            cc.find("Canvas/bulletLayer").destroyAllChildren();
        } else if (gameData.nowScene === "boss2") {
            gameData.BulletControl2.stopShoot();
            cc.find("Canvas/bulletLayer").destroyAllChildren();
        }

        this.gameOver()
        this.onTouchEnd();

    },

    gameOver() {
        this.deadAnima = this.node.getComponent(cc.Animation)
        this.node.children[0].opacity = 0;
        this.deadAnima.play("dead")
        this.deadAnima.on("finished", this.onFinished, this);

    },

    onFinished() {
        // this.deadAnima.off("finished", this.onFinished, this);
        this.GameOver.active = true;

    },

    exit() {
        this.GameOver.active = false;
        cc.director.loadScene("start");
    },
    continue() {
        this.GameOver.active = false;
        cc.director.loadScene(gameData.nowScene);
    },
    // continue1() {
    //     this.GameOver.active = false
    //     cc.director.loadScene("boss1");
    //     // gameData.loading.thirdStart();
    // },
    // continue2() {
    //     this.GameOver.active = false
    //     cc.director.loadScene("boss2");
    // },

    onTouchStart(e) {
        this.isCanShoot = true;
        this.event = e;
        this.node.getComponent("hero").cantChangeDir();
    },

    onTouchMove(e) {

        this.isCanShoot = true;

        this.event = e;

    },

    shootMove(e) {

        let dir = this.node.parent.convertToNodeSpaceAR(e.getLocation())
        if (Math.abs(dir.x + this.hero.x) < gameData.cameraWidth / 2) {
            dir.x += this.hero.x
        } else if (dir.x + this.hero.x < -gameData.cameraWidth / 2) {
            dir.x = dir.x - gameData.cameraWidth / 2;
        } else if (dir.x + this.hero.x > gameData.cameraWidth / 2) {
            dir.x = dir.x + gameData.cameraWidth / 2;
        }

        //根据鼠标位置调整角色朝向
        if (dir.x < this.hero.x) {
            this.hero.children[0].scaleX = this.dir;
        } else if (dir.x > this.hero.x) {
            this.hero.children[0].scaleX = -this.dir;
        }

    },



    onTouchEnd() {
        cc.Tween.stopAllByTarget(this.bulletPar)
        cc.tween(this.bulletPar)
            .to(0.3, { opacity: 0 })
            .start();
        this.isCanShoot = false;
        this.node.getComponent("hero").canChangeDir();
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
        let location = this.bulletPar.parent.convertToNodeSpaceAR(e.getLocation());

        //位置检测
        // if (!this.Send) {
        //     this.Send = true;
        //     cc.log("location:" + location)
        //     cc.log("hero.x:" + this.hero.x)
        //     cc.log("location.x+hero.x:" + (location.x + this.hero.x))
        //     // cc.log("unitV:" + unitV)
        //     this.scheduleOnce(() => { this.Send = false }, 1)
        // }

        if (Math.abs(this.hero.x) < gameData.cameraWidth / 2) {
            location.x += this.hero.x
        } else if (this.hero.x <= -gameData.cameraWidth / 2) {
            location.x = location.x - gameData.cameraWidth / 2;

        } else if (this.hero.x >= gameData.cameraWidth / 2) {
            location.x = location.x + gameData.cameraWidth / 2;
        }



        let unitV = location.normalize();

        let angle = cc.v2(0, 1).signAngle(unitV) * 180 / Math.PI;

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
