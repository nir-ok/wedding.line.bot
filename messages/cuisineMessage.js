const columns = [
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1179901246_7727.jpg",
        "title"  : "料理1",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "メッセージ"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1207104711_1302.jpg",
        "title"  : "料理2",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "メッセージ"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1383203492_9742.jpg",
        "title"  : "料理3",
        "text"   : "料理の説明",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "メッセージ"
        }]
    }
];

const template = {
    "type"   : "carousel",
    "columns": columns
};

exports.print = () => {
    return [{
        "type"    : "template",
        "altText" : "料理一覧を表示",
        "template": template
    }];
};
