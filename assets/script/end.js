
cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        cc.audioEngine.playMusic(gameData.storeHouse.sound["bgMusic"])
        let anima = cc.find("Canvas/end").getComponent(cc.Animation)
        anima.on("finished", () => { cc.find("Canvas/gameOver").active = true }, this);

    },

    returnClicked() {
        cc.director.loadScene("start");
    }

    // update (dt) {},
});
