
cc.Class({
    extends: cc.Component,

    properties: {
        dash: cc.Prefab,
        hpLayer: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        gameData.hero = this
        // 键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

    },

    start() {
        this.hp = 10;
        this.jumpW = true;
        this.jumpS = true;
        this.shiftDown = true;
        this.changeDir = true
        this.ang = 0;
        this.speed = 0;
        this.shiftSpeed = 0;
        this.jumpCount = 2
        this.hero = this.node.getChildByName("player")
        this.hitBox = this.node.getChildByName("player").getChildByName("body").getChildByName("hitBox").addComponent("hit")
        this.hitBox.init(this.hp)
        this.dir = 1;
        this.createHp();
    },

    createHp() {
        for (let i = 0; i < 10; i++) {
            let hpSkin = cc.instantiate(gameData.storeHouse.prefab["hpSkin"])
            this.hpLayer.addChild(hpSkin);
        }
    },

    cantChangeDir() {
        this.changeDir = false;
    },

    canChangeDir() {
        this.changeDir = true
    },

    /*************************人物入场************************** */
    heroAdmission() {
        cc.Tween.stopAllByTarget(this.node);
        cc.tween(this.node)
            .call(() => { this.node.scale = 0 })
            .to(1, { scale: 1, angle: -720 })
            // .call(() => { this.node.scaleX = -1 })
            // 测试，将开始进入战斗放入入场之后2s开始
            .delay(2)
            .start()

    },

    /***************************键盘监听相关*********************************** */


    onKeyDown: function (event) {

        //向左移动
        if (event.keyCode === cc.macro.KEY.a) {
            this.keyA = true;
            this.dir = -1;
            if (this.changeDir) {
                this.node.children[0].scaleX = 1;
            }
            cc.Tween.stopAllByTarget(this.hero)
            this.speed = -10;
            this.ang = 5

        }

        //向右移动
        if (event.keyCode === cc.macro.KEY.d) {
            this.keyD = true;
            this.dir = 1;
            if (this.changeDir) {
                this.node.children[0].scaleX = -1;
            }
            cc.Tween.stopAllByTarget(this.hero)
            this.speed = 10;
            this.ang = -5
        }

        //降低重力
        if (event.keyCode === cc.macro.KEY.w) {
            this.node.getComponent(cc.RigidBody).gravityScale = 0.8;
            this.jumpW = false;
        }

        //跳跃
        if (event.keyCode === cc.macro.KEY.space) {
            if (this.jumpS && this.jumpCount > 0) {
                this.node.getComponent(cc.RigidBody).linearVelocity = cc.v2(0, 400)
                this.jumpCount -= 1;
                this.jumpS = false;
            }
        }

        //使用冲刺
        if (event.keyCode === cc.macro.KEY.shift) {
            if (this.shiftDown) {
                this.hitBox.changeState();
                this.shiftDown = false;
                this.shiftSpeed = 30;
                this.hero.angle = -45 * this.dir;
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        let dash = cc.instantiate(this.dash)
                        dash.getComponent("dash").init(this.node.children[0])
                        dash.parent = this.node.parent;
                        dash.x = this.node.x;
                        dash.y = this.node.y;

                    }, i * 50)
                }
                setTimeout(() => {
                    this.shiftSpeed = 0;
                    if (!this.keyA && !this.keyD) {
                        this.bodyBack();
                    }
                }, 200)
                this.scheduleOnce(() => {
                    this.shiftDown = true;
                }, 0.8)
            }
        }

        //使用技能
        if (event.keyCode === cc.macro.KEY.e) {
            this.node.getComponent("test").useSkill();
        }

    },

    onKeyUp: function (event) {
        if (event.keyCode === cc.macro.KEY.a) {
            this.keyA = false;
            if (!this.keyD) {
                this.bodyBack();
                this.speed = 0;
            }
        }
        if (event.keyCode === cc.macro.KEY.d) {
            this.keyD = false;
            if (!this.keyA) {
                this.bodyBack();
                this.speed = 0;
            }
        }
        if (event.keyCode === cc.macro.KEY.w) {
            this.jumpW = true
            this.node.getComponent(cc.RigidBody).gravityScale = 5;
        }

        if (event.keyCode === cc.macro.KEY.space) {

            this.jumpS = true;
            if (this.jumpW) {
                this.node.getComponent(cc.RigidBody).gravityScale = 5;
            }

        }

    },
    /************************键盘结束******************************* */

    //身体回归正常角度
    bodyBack() {
        cc.Tween.stopAllByTarget(this.hero)
        cc.tween(this.hero)
            .to(0.2, { angle: 0 })
            .start();
    },

    /*********落地以后恢复跳跃能力************/
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 400) {
            this.jumpCount = 2;
        }
    },

    //节点销毁时取消键盘监听事件
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    //移动
    update(dt) {
        this.node.x += this.speed + (this.dir * this.shiftSpeed);

        if (this.keyA || this.keyD) {
            this.hero.angle += this.ang;
            if (this.hero.angle >= 45) {
                this.hero.angle = 45;
            }
        }

        if (this.keyD || this.keyA) {
            this.hero.angle += this.ang;
            if (this.hero.angle <= -45) {
                this.hero.angle = -45;
            }
        }

    },
});
