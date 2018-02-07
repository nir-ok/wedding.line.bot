const errorMessage   = require("./messages/errorMessage.js");
const cuisineMessage = require("./messages/cuisineMessage.js");
const helpMessage    = require("./messages/helpMessage.js");
const testMessage    = require("./messages/testMessage.js");

exports.create = (message) => {
    const text = message.text;
    switch (text) {
        case "料理":
            return cuisineMessage.print();
        case "予定":
            break;
        case "テスト":
            return testMessage.print(text);
        case "ヘルプ":
        default:
            return helpMessage.print();
    }
};
