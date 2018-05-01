const columns = [
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/appetizer.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_1" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/soup.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_2" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/no_image.png",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_3" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/no_image.png",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_4" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/main.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_5" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/salad.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_6" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/fish2.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_7" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/soba.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_8" }
    },
    {
        "imageUrl": "https://s3-ap-northeast-1.amazonaws.com/ts-wedding-public/dessert.JPG",
        "action"  : { "type" : "message", "label": "詳細", "text" : "料理_9" }
    }
];

const template = {
    "type"   : "image_carousel",
    "columns": columns
};

const detail = [
    "",
    "御祝肴 季節の装い",
    "紅白蛤真丈の御吸物",
    "御造りの盛り合わせ",
    "茶碗蒸し",
    "国産牛ロースのグリル おろしポン酢ソース",
    "自家製ドレッシングのサラダ",
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
