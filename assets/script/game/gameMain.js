
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.gameMain = this;
        cc.audioEngine.playMusic(gameData.storeHouse.sound["leimi"])
        cc.audioEngine.setMusicVolume(0.7)
    },

    start() {
        gameData.nowScene = "boss1"
        cc.tween(this.node)
            .call(() => { cc.find("Canvas/BossLayer/pos").active = true; this.openBossAnima() })
            .delay(2)
            .call(() => { this.openDialogue() })
            .start()
    },

    // 开启boss移动
    openBossMove() {
        gameData.Boss1.centerMove()
    },

    // 开启人物与boss的对话
    openDialogue() {
        // cc.find("Canvas/dialogue").active = true;
        gameData.loading.thirdStart();
    },

    // boss进场动画开启
    openBossAnima() {
        gameData.Boss1.bossAdmission();
    },

    // hero进场动画开启
    openHeroAnima() {
        gameData.hero.heroAdmission();
    },

    // 开始射击
    openShoot() {
        gameData.BulletControl.goShoot();
    },

    // 停止射击
    stopShoot() {
        gameData.BulletControl.stopShoot();
    },

    update(dt) { },
});
