cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {

    },

    onCollisionEnter: function (other, self) {
        if (other.tag === 10) {
            this.node.children[0].active = true;
        }
        if (other.tag === 10 && self.tag === 1) {
            this.node.children[0].active = true;
            this.node.opacity = 255
            setTimeout(() => {
                this.node.children[0].active = false;
                this.node.opacity = 10
            }, 2000)

        }
    },

    onCollisionExit: function (other, self) {
        if (other.tag === 10 && self.tag !== 1) {
            this.node.children[0].active = false;
        }

    }

    // update (dt) {},
});
