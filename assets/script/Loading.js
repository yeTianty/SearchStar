
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.barValue = 0
        // this.totalRes = Object.keys(gameData.storeHouse).length;
        this.loadCount = 0;
        // 开启碰撞
        cc.director.getPhysicsManager().enabled = true
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        //     cc.PhysicsManager.DrawBits.e_pairBit |
        //     cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        //     cc.PhysicsManager.DrawBits.e_jointBit |
        //     cc.PhysicsManager.DrawBits.e_shapeBit;
    },

    start() {
        this.loadLocalRes("prefab", cc.Prefab, "prefab");
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
