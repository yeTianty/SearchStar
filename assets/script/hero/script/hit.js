cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        this.isDash = false;
    },

    init(hp) {
        this.hp = hp
    },

    changeState() {
        this.isDash = true;
        setTimeout(() => { this.isDash = false; }, 400)
    },

    onCollisionEnter: function (other, self) {
        if (!this.isDash && other.tag === 300) {
            cc.log("被打中了")
            cc.log(self)
        }

    },

    update(dt) {
        if (this.isDash) {
            cc.log(this.isDash);
        }
    },
});
