cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {

    },

    start() {

    },

    onCollisionEnter: function (other, self) {
        if (other.tag === 10) {
            gameData.hero.getComponent("hero").enterLevel();
            setTimeout(() => {
                gameData.loading.firstIsPass();
            }, 200)
        }

    },

    // update (dt) {},
});
