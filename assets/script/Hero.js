
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // 键盘监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);

        // 组件调用
        this.anima = this.node.getComponent(cc.Animation)
        this.animaState = this.anima.getAnimationState("heroRunAnima")
    },
    /***************************键盘监听相关*********************************** */
    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.node.scaleX = -1;
                this.dir = -1;
                if (this.animaState.isPaused) {
                    this.animaState.resume()
                    return;
                } else {
                    if (!this.animaState.isPlaying) {
                        this.anima.play("heroRunAnima");
                    }
                }
                break;
            case cc.macro.KEY.d:
                this.node.scaleX = 1;
                this.dir = 1
                if (this.animaState.isPaused) {
                    this.animaState.resume()
                    return;
                } else {
                    if (!this.animaState.isPlaying) {
                        this.anima.play("heroRunAnima");
                    }
                }
                break;
            case cc.macro.KEY.space:
                console.log('jump');
                break;
        }
    },

    onKeyUp: function (event) {
        this.dir = 0;
        switch (event.keyCode) {
            case cc.macro.KEY.a:
                this.animaState.pause("heroRunAnima");
                break;
            case cc.macro.KEY.d:
                this.animaState.pause("heroRunAnima");
                break;
            case cc.macro.KEY.space:
                console.log('Press a SPACE');
                break;
        }
    },
    /************************键盘结束******************************* */
    start() {
        // 用于判断方向 1为右，-1为左
        this.dir = 0;

        // // 添加碰撞组件
        // let collider = this.node.addComponent(cc.BoxCollider)
        // collider.tag = gameData.colliderTag.hero;
    },

    runMove() {
        this.node.x += 5 * this.dir;
    },

    update(dt) {
        this.runMove();
    },
});
