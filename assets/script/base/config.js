window.gameData = window.gameData || {}

gameData.storeHouse = require("./storeHouse");

gameData.Boss1 = null;

// false为正常，true为攻击状态 攻击状态下不可移动
gameData.bossModel = false;

// 出屏销毁
gameData.destroy = function (node) {
    if (node.x > (cc.winSize.width / 2 + node.width / 2) ||
        node.x < (-cc.winSize.width / 2 - node.width / 2) ||
        node.y > (cc.winSize.height / 2 + node.height / 2) ||
        node.y < (-cc.winSize.height / 2 - node.height / 2)) {
        node.destroy();
    }
}