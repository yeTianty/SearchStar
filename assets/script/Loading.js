
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.loading = this
        this.barValue = 0
        // this.totalRes = Object.keys(gameData.storeHouse).length;
        this.loadCount = 0;
        // 开启碰撞
        cc.director.getPhysicsManager().enabled = true;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        cc.game.setFrameRate(60)
    },

    start() {
        this.loadLocalRes("prefab", cc.Prefab, "prefab");
        this.loadLocalRes("frame", cc.SpriteFrame, "frame");
        this.loadLocalRes("json", cc.JsonAsset, "json");
        //已加载的资源 计数
        this.loadCount = 0;
        // this.schedule(this.updateLoadingProgress, 0.01);
    },

    loadLocalRes(resPath, resType, savePath) {
        cc.resources.loadDir(resPath, resType, (err, assets) => {
            if (err) {
                cc.error(err);
            } else {
                for (let i = 0; i < assets.length; i++) {
                    //获取资源名称
                    let name = assets[i] instanceof cc.SpriteAtlas ? assets[i].name.slice(0, -6) : assets[i].name;
                    //资源存放到对应路径中
                    gameData.storeHouse[savePath][name] = assets[i] instanceof cc.JsonAsset ? assets[i].json : assets[i];
                }
                this.loadCount += 1;
            }
        });
    },

    test() {
        cc.director.loadScene("play")
    },

    startClick() {
        cc.director.loadScene("dialogue");
    },
    firstIsPass() {
        gameData.nowLevel = 2;
        gameData.isPass = true;
        cc.director.loadScene("dialogue");
    },

    firstNoPass() {
        gameData.nowLevel = 2;
        gameData.isPass = false;
        cc.director.loadScene("dialogue");
    },

    secondStart() {
        gameData.nowLevel = 3;
        cc.director.loadScene("dialogue");
    },

    thirdStart() {
        gameData.nowLevel = 4;
        cc.find("Canvas/camera/dialogue").active = true;
    },

    fourIsPass() {
        gameData.nowLevel = 5;
        gameData.isPass = true;
        cc.director.loadScene("dialogue");
    },
    fourNoPass() {
        gameData.nowLevel = 5;
        gameData.isPass = false;
        cc.director.loadScene("dialogue");
    },
    end() {
        gameData.nowLevel = 6;
        cc.director.loadScene("dialogue");
    },


    // 进度条
    // updateLoadingProgress() {
    //     this.barValue += 0.3;
    //     this.loadProgress.progress = this.barValue / 100;
    //     this.person.x += 1.72
    //     if (this.loadProgress.progress >= 1 && this.loadCount === this.totalRes) {
    //         this.person.getComponent(cc.Animation).stop("walk");
    //         cc.director.loadScene("login");
    //     }
    // }

    // update (dt) {},
});
