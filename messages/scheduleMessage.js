const columns = [
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1179901246_7727.jpg",
        "title"  : "挙式まで",
        "text"   : "~ 12:00",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "予定_before"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1179901246_7727.jpg",
        "title"  : "挙式",
        "text"   : "12:00 ~ 12:45",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "予定_wedding"
        }]
    },
    {
        "thumbnailImageUrl": "https://www.kyounoryouri.jp/upfile/l_1207104711_1302.jpg",
        "title"  : "披露宴",
        "text"   : "12:45 ~ 15:00",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "予定_reception"
        }]
    }
];

const template = {
    "type"   : "carousel",
    "columns": columns
};

const detail = {
    none     : "",
    before   : "挙式までの詳細です\nhogehoge",
    wedding  : "挙式の詳細です",
    reception: "披露宴の詳細です",
};

exports.getList = () => {
    return [{
        "type"    : "template",
        "altText" : "予定を表示",
        "template": template
    }];
};

exports.getDetail = (key) => {
    return [{
        "type": "text",
        "text": detail[key]
    }];
};
