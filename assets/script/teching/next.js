cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        gameData.nowScene = "teaching"
       
    },

    start() {

    },

    onCollisionEnter: function (other, self) {
        if (other.tag === 10) {
            gameData.hero.getComponent("hero").enterLevel();
            setTimeout(() => {
                gameData.nowScene = "teaching2"
                cc.director.loadScene("teaching2");
            }, 200)
        }

    },

    // update (dt) {},
});
