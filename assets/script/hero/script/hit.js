cc.Class({
    extends: cc.Component,

    properties: {

    },


    // onLoad () {},

    start() {
        this.hitting = this.node.getComponent(cc.AudioSource);
        this.isDash = false;
        this.beHited = false;
        this.waiG = false;
        this.isDead = false;
        this.playerPos = this.node.parent.parent.getPosition()
        this.player = this.node.parent.parent.parent;
        this.face = this.node.parent.parent.getChildByName("head").getChildByName("face")
        this.camera = gameData.camera;
    },

    init(hp) {
        this.hp = hp
    },

    changeState() {
        this.isDash = true;
        setTimeout(() => { this.isDash = false; }, 500)
    },

    beHit() {
        let hpLayer = cc.find("Canvas/camera/UiLayer/heroHpLayer");
        if (hpLayer.children.length > 0) {
            hpLayer.children[0].destroy();
        } else {
            gameData.heroIsDied = true;
        }
        this.beHited = true;
        this.hitting.play("受击");
        cc.tween(this.camera)
            .to(0.1, { angle: 1 })
            .to(0.1, { angle: -1 })
            .to(0.1, { angle: 0 })
            .start();
        this.face.children[0].active = false;
        this.face.children[1].active = true;


        /*** */
        if (this.isDead) { return }
        cc.tween(this.player)
            .to(0.2, { opacity: 100 })
            .to(0.2, { opacity: 200 })
            .union()
            .repeatForever()
            .start()



        this.scheduleOnce(() => {
            if (this.hp > 2) {
                this.face.children[0].active = true;
                this.face.children[1].active = false;
            }
            this.beHited = false;
            if (this.waiG) { return };
            this.player.opacity = 255;
            cc.Tween.stopAllByTarget(this.player)

        }, 3)
        
    },

    wuDi() {
        this.waiG = !this.waiG;
        cc.Tween.stopAllByTarget(this.player)
        if (this.waiG) {
            cc.tween(this.player)
                .to(0.2, { opacity: 100 })
                .to(0.2, { opacity: 255 })
                .union()
                .repeatForever()
                .start()
        } else {
            this.player.opacity = 255;
        }
    },

    onCollisionStay: function (other, self) {
        if (!this.isDead && !this.waiG && !this.isDash && !this.beHited && other.tag === 999) {
            this.hp -= 1;
            if (this.hp <= 0) {
                this.isDead = true;
                this.node.dispatchEvent(new cc.Event.EventCustom('dead', true));
            }
            this.beHit()
        }
    },


    onBeginContact: function (contact, selfCollider, otherCollider) {

        if (!this.isDead && !this.waiG && !this.isDash && !this.beHited && otherCollider.tag === 500) {
            this.hp -= 1;
            if (this.hp <= 0) {
                this.isDead = true;
                this.node.dispatchEvent(new cc.Event.EventCustom('dead', true));
            }
            this.beHit()
        }

    },

    update(dt) {
        this.node.setPosition(this.playerPos)
        if (!this.isDead && (this.isDash || this.beHited)) {
        }
    },
});
