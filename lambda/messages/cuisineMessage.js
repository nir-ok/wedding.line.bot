const columns = [
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1179901246_7727.jpg",
        "title"  : "料理1",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "料理_1"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1207104711_1302.jpg",
        "title"  : "料理2",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "料理_2"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1383203492_9742.jpg",
        "title"  : "料理3",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "料理_3"
        }]
    }
];

const template = {
    "type"   : "carousel",
    "columns": columns
};

const detail = [
    "",
    "料理1の詳細です",
    "料理2の詳細です",
    "料理3の詳細です",
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
