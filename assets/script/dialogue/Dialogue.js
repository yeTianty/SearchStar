
cc.Class({
    extends: cc.Component,

    properties: {
        // 英雄
        hero: cc.Node,
        // 巫女
        medium: cc.Node,
        // 魔王
        wang: cc.Node,
        // 说话对象
        nameTxt: cc.Label,
        // 说话内容
        contentTxt: cc.Label,

    },


    onLoad() {
        this.node.on("touchend", this.nextDialogue, this);
        cc.game.setFrameRate(60)
    },

    start() {
        this.init();
        this.nextDialogue();
    },

    // 初始化数据
    init() {
        // 英雄对话皮肤
        this.heroSkin = gameData.storeHouse["frame"];
        // 巫女对话皮肤
        this.mediumSkin = gameData.storeHouse.frame;
        // 魔王对话皮肤
        this.wangSkin = gameData.storeHouse.frame;

        // 获取到对话表
        this.dialogueData = gameData.storeHouse.json["dialogueForm"];

        // 当前对话内容条数初始化
        this.dialogueIndex = 0;

        // 当前对话内容初始化
        this.nowDialogue = null;
        // 当前对话是否播放完
        this.dialogueEnd = true;

        this.nowLevel = gameData.nowLevel;

        this.state = true;

        // 获取到关卡和关卡内容条数
        this.levelList = {};
        for (let i in this.dialogueData) {
            this.level = i.slice(0, -2);
            if (this.levelList.hasOwnProperty(this.level)) {
                this.levelList[this.level]++;
            } else {
                this.levelList[this.level] = 1;
            }
        }
        // 当前关卡内容条数
        this.contentCount = this.levelList[gameData.level[this.nowLevel]];

    },
    nextDialogue() {
        // 当对话播放完才可以点击
        if (!this.dialogueEnd) return;
        this.dialogueEnd = false;

        // 当前关卡内容条数
        // if (this.dialogueIndex < this.contentCount) {
        //     this.dialogueIndex += 1;
        //     // 当前关卡所有对话内容 
        //     this.levelDialogueData = this.dialogueData[gameData.level[this.nowLevel] + "-" + this.dialogueIndex];
        //     // 当前关卡对话内容 段落+条数
        //     this.nowDialogue = this.levelDialogueData.dialogue;
        //     this.setContentData(this.dialogueIndex, this.nowDialogue, this.levelDialogueData);
        // } else {
        //     // 当前关卡内容播放完
        //     this.node.active = false;
        // }

        let level = gameData.level[this.nowLevel];
        if (level === "first" || level === "four") {
            if(this.state){
                this.state = false;
                level = null
                this.isSelect();
            }
            cc.log(92)
        } else {
            // 当前关卡内容条数
            if (this.dialogueIndex < this.contentCount) {
                this.dialogueIndex += 1;
                // 当前关卡所有对话内容 
                this.levelDialogueData = this.dialogueData[gameData.level[this.nowLevel] + "-" + this.dialogueIndex];
                // 当前关卡对话内容 段落+条数
                this.nowDialogue = this.levelDialogueData.dialogue;
                this.setContentData(this.dialogueIndex, this.nowDialogue, this.levelDialogueData);
            } else {
                cc.log(95)
                // 当前关卡内容播放完
                // if (level === "first") {
                //     cc.director.loadScene("teach");
                // }
                if (level === "third") {
                    // cc.director.loadScene("teach");
                    cc.find("Canvas/camera/dialogue").active = false;
                    gameData.BulletControl.goShoot();
                }
                this.node.active = false;
            }
        }

    },

    // 是否是有失败
    isSelect() {
        if (gameData.isPass) {
            this.levelDialogueData = this.dialogueData[gameData.level[this.nowLevel] + "-" + 1];
            this.nowDialogue = this.levelDialogueData.dialogue;
            this.setContentData(1, this.nowDialogue, this.levelDialogueData);
        } else {
            this.levelDialogueData = this.dialogueData[gameData.level[this.nowLevel] + "-" + 2];
            this.nowDialogue = this.levelDialogueData.dialogue;
            this.setContentData(2, this.nowDialogue, this.levelDialogueData);
        }
    },

    //对话交互界面
    setContentData(num, nowDialogue, levelDialogueData) {
        /**给对话框的说话对象赋值 */
        this.nameTxt.string = this.dialogueData[gameData.level[this.nowLevel] + "-" + num].name;
        /**说话对象皮肤 */
        // 下一次对话前将节点复原
        this.hero.scale = 1;
        this.medium.scale = 1;
        this.wang.scale = 1;
        if (this.nameTxt.string === "赫卡提亚·雪乃") {
            this.hero.getComponent(cc.Sprite).spriteFrame = this.heroSkin[levelDialogueData["frame"]];
            this.hero.active = true;
            this.medium.active = false;
            this.wang.active = false;
            cc.tween(this.hero).to(0.5, { scale: 1.2 }).start()
        } else if (this.nameTxt.string === "魔王") {
            this.wang.getComponent(cc.Sprite).spriteFrame = this.wangSkin[levelDialogueData["frame"]];
            this.hero.active = false;
            this.medium.active = false;
            this.wang.active = true;
            cc.tween(this.wang).to(0.5, { scale: 1.2 }).start()
        } else {
            // 旁白
            if (levelDialogueData.name === "") {
                this.hero.active = false;
                this.medium.active = false;
                this.wang.active = false;

                // 巫女的属性
            } else {
                this.medium.getComponent(cc.Sprite).spriteFrame = this.mediumSkin[levelDialogueData["frame"]];
                this.hero.active = false;
                this.medium.active = true;
                this.wang.active = false;
                cc.tween(this.medium).to(0.5, { scale: 1.2 }).start()
            }
        }

        /**给对话框的说话内容赋值 */
        this.dazi(nowDialogue);
        // this.schedule(() => {
        //     if (this.contentTxt.string.length < nowDialogue.length) {
        //         this.contentTxt.string = nowDialogue.slice(0, this.contentTxt.string.length + 1);
        //     } else {
        //         this.dialogueEnd = true;

        //     }
        // }, 0.1, nowDialogue.length + 1, 0.1)

        if (num < this.contentCount) {
            this.contentTxt.string = "";
        } else {
            this.contentTxt.string = nowDialogue;
        }

    },

    dazi(nowDialogue) {
        this.schedule(() => {
            if (this.contentTxt.string.length < nowDialogue.length) {
                this.contentTxt.string = nowDialogue.slice(0, this.contentTxt.string.length + 1);
            } else {
                this.dialogueEnd = true;
            }
        }, 0.1, nowDialogue.length + 1, 0.1)
    },


    // update (dt) {},
});
