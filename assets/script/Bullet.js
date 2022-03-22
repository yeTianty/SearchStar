
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    init(v) {
        this.node.getComponent(cc.RigidBody).linearVelocity = v
    },


    type2() {

    },

    // 弧线飞行
    curveFly() {

    },

    openSafeLyFly() {
        this.dir = this.node.x > 0 ? 1 : -1
        //根据子弹的位置，来画圆
        let nowPos = this.node.getPosition();
        //计算轴向量  根据传入的方向值决定画圆的圆形位置
        this.axleV = nowPos.add(cc.v2(this.dir * 100, 0));
        //计算辐向量
        this.spokeV = cc.v2(-this.dir * 100, 0);
        //设置旋转的角度
        this.angleSpeed = this.dir * 10;
        //角度的计量  用于统计是否满足180度
        this.rotateCount = 0;
        this.count = 0;
        this.schedule(this.lockFly, 0.02);

    },

    lockFly() {
        this.count += 1
        if (this.count >= 100) {
            let followV = cc.v2(50 * Math.cos(this.node.angle / Math.PI * 180), 50 * Math.sin(this.node.angle / Math.PI * 180)).sub(this.node.parent.position);
            followV = followV.normalize().mulSelf(5);
            this.node.x += followV.x;
            this.node.y += followV.y;
            return
        }
        // cc.log(this.node.position);
        let followV = cc.v2(0, 1);
        // console.log("bullet",cc.find("Canvas/HeroLayer/hero").position);
        followV = cc.v2(cc.find("Canvas/HeroLayer/hero").position).sub(cc.v2(this.node.position));
        // console.log(followV.sub(cc.find("Canvas/HeroLayer/hero").position));
        this.node.angle = -cc.v2(followV).signAngle(cc.v2(0, 1)) * 180 / Math.PI;
        followV = followV.normalize().mulSelf(5);
        this.node.x += followV.x;
        this.node.y += followV.y;
    },




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
        if (otherCollider.tag === 200 || otherCollider.tag === 300 || otherCollider.tag === 400 || otherCollider.tag === 100) {
            this.node.destroy();
        }
    },
    update(dt) {
        gameData.destroy(this.node)
    },
});
