const columns = [
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/appetizer.JPG",
        "text"   : "前菜",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_1" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/soup.JPG",
        "text"   : "汁物",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_2" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/no_image.png",
        "text"   : "刺身",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_3" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/no_image.png",
        "text"   : "茶碗蒸し",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_4" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/main.JPG",
        "text"   : "肉",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_5" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/salad.JPG",
        "text"   : "副菜",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_6" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/fish.JPG",
        "text"   : "魚",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_7" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/soba.JPG",
        "text"   : "そば",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_8" }]
    },
    {
        "thumbnailImageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/dessert.JPG",
        "text"   : "デザート",
        "actions": [{ "type" : "message", "label": "詳細", "text" : "料理_9" }]
    }
];

const template = {
    "type"   : "carousel",
    "columns": columns
};

const detail = [
    "",
    "御祝肴 季節の装い",
    "紅白蛤真丈の御吸物",
    "御造りの盛り合わせ",
    "茶碗蒸し",
    "国産牛ロースのグリル おろしポン酢ソース",
    "サラダ",
    "のど黒の杉板焼き",
    "茶そば",
    "ティラミス",
];

exports.getList = () => {
    return [{
        "type"    : "template",
        "altText" : "料理一覧を表示",
        "template": template
    }];
};

exports.getDetail = (index) => {
    return [{
        "type": "text",
        "text": detail[index]
    }];
};
