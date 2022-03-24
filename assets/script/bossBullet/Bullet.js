
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        let collider = this.node.addComponent(cc.CircleCollider)
        collider.tag = 200;
        collider.radius = this.node.width / 2;
    },

    start() {
        this.bossNode = cc.find("Canvas/BossLayer/pos");
        this.heroNode = cc.find("Canvas/HeroLayer/hero");
    },

    init(v) {
        this.node.getComponent(cc.RigidBody).linearVelocity = v
    },


    type2() {

    },

    // 转圈圈，半径扩大
    circleFly() {
        let bossNode = cc.find("Canvas/BossLayer/pos");
        let center = cc.v2(bossNode.position);
        let radius = 100;
        //旋转的角度
        let angle = 0
        this.schedule(() => {
            let posX = center.x + radius * Math.cos(angle * Math.PI / 180);
            let posY = center.y + radius * Math.sin(angle * Math.PI / 180);
            this.node.setPosition(cc.v2(posX, posY))
            angle += 4;
            radius += 2;
        }, 0.01)
    },

    // 弧线飞行
    curveFly(dir) {
        // this.dir = this.node.x > 0 ? 1 : -1
        //根据子弹的位置，来画圆
        let nowPos = this.node.getPosition();
        //计算轴向量  根据传入的方向值决定画圆的圆形位置
        this.axleV = nowPos.add(cc.v2(dir * 100, 0));
        //计算辐向量
        this.spokeV = cc.v2(-dir * 100, 0);
        //设置旋转的角度
        this.angleSpeed = -dir * 10;
        //角度的计量  用于统计是否满足180度
        this.rotateCount = 0;
        this.count = 0;
        this.schedule(this.safeLyFly, 0.01);
    },

    safeLyFly() {
        if (this.rotateCount < 180) {
            this.spokeV.rotateSelf(this.angleSpeed * Math.PI / 180);
            this.node.setPosition(this.axleV.add(this.spokeV));
            //将子弹进行一个旋转
            this.node.angle += this.angleSpeed;
            this.rotateCount += Math.abs(this.angleSpeed);
        } else {
            console.log(1);
            this.unschedule(this.safeLyFly);
            this.schedule(this.lockFly, 0.01);
        }
    },

    lockFly() {
        let followV = cc.v2(0, 1);
        followV = cc.v2(cc.find("Canvas/HeroLayer/hero").position).sub(cc.v2(this.node.position));
        this.node.angle = -cc.v2(followV).signAngle(cc.v2(0, 1)) * 180 / Math.PI;
        followV = followV.normalize().mulSelf(4);
        if (cc.v2(cc.find("Canvas/HeroLayer/hero").position).sub(cc.v2(this.node.position)).mag() <= 500) {
            // cc.Tween.stopAllByTarget(this.node)
            cc.tween(this.node)
                .by(0.2, { position: cc.v2(followV.x, followV.y) })
                .call(() => {
                    this.init(cc.v2(followV).mul(200))
                    this.unschedule(this.lockFly);
                })
                .start()
        } else {
            this.node.x += followV.x;
            this.node.y += followV.y;
        }

    },

    // 旋转画圆
    // rotateCircle() {
    //     if (Math.abs(cc.v2(0, 1).signAngle(this.node.position) / Math.PI * 180) > 60) {
    //         this.unschedule(this.rotateCircle)
    //         this.schedule(this.lockFly, 0.01);
    //     }
    //     this.spokeV.rotateSelf(this.angleSpeed * Math.PI / 180);
    //     this.node.setPosition(this.axleV.add(this.spokeV));
    //     //将子弹进行一个旋转
    //     this.node.angle += this.angleSpeed;
    //     // this.rotateCount += Math.abs(this.angleSpeed);

    // },




    // 碰撞进行中
    // onPreSolve: function (contact, selfCollider, otherCollider) {
    //     if (otherCollider === 500) {
    //         this.node.getComponent(cc.PhysicsCircleCollider).sensor = true;
    //     }
    // },
    // // 碰撞结束
    // onPostSolve: function (contact, selfCollider, otherCollider) {
    //     this.node.getComponent(cc.PhysicsCircleCollider).sensor = false;
    // },
    // 开始碰撞
    onBeginContact: function (contact, selfCollider, otherCollider) {
        if (otherCollider.tag === 300 || otherCollider.tag === 400 || otherCollider.tag === 100) {
            if (otherCollider.tag === 100) {
                console.log("hit");
            }
            this.node.destroy();
        }
    },
    update(dt) {
        gameData.destroy(this.node)
    },
});
