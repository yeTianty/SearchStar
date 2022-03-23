window.gameData = window.gameData || {}

gameData.storeHouse = require("./storeHouse");



// false为正常，true为攻击状态 攻击状态下不可移动
gameData.bossModel = false;

// 出屏销毁
gameData.destroy = function (node) {
    if (node.x > (cc.find("Canvas/camera") / 2 + node.width / 2) ||
        node.x < (-cc.find("Canvas/camera") / 2 - node.width / 2) ||
        node.y > (cc.winSize.height * 2 / 3 + node.height / 2) ||
        node.y < (-cc.winSize.height - node.height / 2)) {
        node.destroy();
    }
}

gameData.gameMain = null;

gameData.hero = null;

gameData.BulletControl = null;

gameData.Boss = null;

gameData.Boss1 = null;

gameData.dialogue = null;

gameData.loading = null;

gameData.bossIsDied = false;

gameData.cameraWidth = null;

gameData.camera = null;


gameData.colliderTag = {
    "bossBullet": 500,
    "heroBullet": 200,
    "wall": 300,
    "grade": 400,
    "hero": 100,
    "boss": 600
}

// 关卡
gameData.level = {
    "1": "start",
    "2": "first",
    "3": "second",
    "4": "third",
    "5": "four",
    "6": "end",

}

gameData.nowLevel = 1;

// 是否通过当前关卡
gameData.isPass = false;