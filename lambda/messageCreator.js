const cuisineMessage  = require("./messages/cuisineMessage.js");
const scheduleMessage = require("./messages/scheduleMessage.js");
const helpMessage     = require("./messages/helpMessage.js");
const imageMessage    = require("./messages/imageMessage.js");

exports.create = (text) => {
    // システムメッセージ対応
    let msg      = text.split('[system]');
    let detail   = text.split('料理_');
    let schedule = text.split('予定_');
    if (msg.length === 2) {
        return systemMessage(msg[1]);
    } else if (detail.length === 2) {
        return cuisineMessage.getDetail(detail[1]);
    } else if (schedule.length === 2) {
        return scheduleMessage.getDetail(schedule[1]);
    }
    // 通常メッセージ
    switch (text) {
        case "料理":
            return cuisineMessage.getList();
        case "予定":
            return scheduleMessage.getList();
        case "画像":
            return imageMessage.print();
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
