
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.game2 = this;
        cc.audioEngine.playMusic(gameData.storeHouse.sound["fulan"])
    },

    start() {
        gameData.nowLevel = 3;
        gameData.nowScene = "boss2"
        cc.tween(this.node)
            .delay(1)
            .call(() => { this.openDialogue(); })
            .delay(1.5)
            .call(() => { cc.find("Canvas/BossLayer/pos/boss1").active = true; this.openBossAnima() })
            .start()
    },


    openDialogue() {
        gameData.loading.secondStart();
        console.log(111);
    },
    // boss进场动画开启
    openBossAnima() {
        gameData.Boss1.bossAdmission();
    },

    // hero进场动画开启
    openHeroAnima() {
        gameData.hero.heroAdmission();
    },
    // 开启射击
    openShoot() {
        gameData.BulletControl2.goShoot();
    },
    stopShoot() {
        gameData.BulletControl2.stopShoot();
    },

    // update (dt) {},
});
