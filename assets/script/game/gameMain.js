
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        gameData.gameMain = this;
        // this.node.on('goShoot', this.openShoot, this);
    },

    start() {
        cc.tween(this.node)
            .delay(1)
            .call(() => { cc.find("Canvas/HeroLayer/hero").active = true; this.openHeroAnima() })
            .delay(1.5)
            .call(() => { cc.find("Canvas/BossLayer/pos/boss1").active = true; this.openBossAnima() })
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
    }

    // update (dt) {},
});
