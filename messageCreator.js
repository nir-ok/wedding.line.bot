const cuisineMessage = require("./messages/cuisineMessage.js");
const helpMessage    = require("./messages/helpMessage.js");

exports.create = (text) => {
    // システムメッセージ対応
    let msg = text.split('[system]');
    let detail = text.split('料理_');
    if (msg.length === 2) {
        return systemMessage(msg[1]);
    } else if (detail.length === 2) {
        return cuisineMessage.getDetail(detail[1]);
    }
    // 通常メッセージ
    switch (text) {
        case "料理":
            return cuisineMessage.getList();
        case "予定":
            break;
        case "テスト":
            return test(text);
        case "ヘルプ":
        default:
            return helpMessage.print();
    }
};

function systemMessage(text) {
    return [{
        "type": "text",
        "text": text
    }];
}

function error() {
    return [{
        "type": "text",
        "text": "エラーです！"
    }];
}

function test(text) {
    return [{
        "type": "text",
        "text": text + "イカ！"
    }];
}
