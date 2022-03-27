
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.loadLocalRes("prefab", cc.Prefab, "prefab");
        this.loadLocalRes("frame", cc.SpriteFrame, "frame");
        this.loadLocalRes("json", cc.JsonAsset, "json");
        this.loadLocalRes("sound", cc.AudioClip, "sound");
        //已加载的资源 计数
        this.loadCount = 0;
        gameData.loading = this
        this.barValue = 0
        this.totalRes = Object.keys(gameData.storeHouse).length;
        // 开启碰撞
        cc.director.getPhysicsManager().enabled = true;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        cc.game.setFrameRate(60)
    },

    start() {
        this.schedule(this.updateLoadingProgress, 0.01);
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
    // boss1
    test() {
        cc.director.loadScene("boss1")
    },
    // boss2
    boss2() {
        cc.director.loadScene("boss2")
    },

    startClick() {
        cc.director.loadScene("story");
    },

    startStart() {
        cc.director.loadScene("dialogue");
    },
    startEnd() {
        cc.director.loadScene("teaching")
    },
    startEnd2() {
        cc.director.loadScene("teaching2")
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
        cc.find("Canvas/camera/dialogue6").active = true;
    },

    thirdStart() {
        gameData.nowLevel = 4;
        cc.find("Canvas/camera/dialogue").active = true;
    },

    fourIsPass() {
        gameData.nowLevel = 5;
        gameData.isPass = true;
        cc.find("Canvas/camera/dialogue2").active = true;
    },
    fourNoPass() {
        gameData.nowLevel = 5;
        gameData.isPass = false;
        cc.find("Canvas/camera/dialogue3").active = true;
    },
    end() {
        cc.director.loadScene("end")
        gameData.nowLevel = 6;
    },



    // 进度条
    updateLoadingProgress() {
        if (this.loadCount === this.totalRes) {
            cc.tween(cc.find("Canvas/loading"))
                .to(0.1, { scaleY: 0 })
                .call(() => {
                    cc.find("Canvas/loading").active = false;
                    cc.audioEngine.playMusic(gameData.storeHouse.sound["bgMusic"])
                })
                .start();
        }
    }

    // update(dt) {

    // },
});
