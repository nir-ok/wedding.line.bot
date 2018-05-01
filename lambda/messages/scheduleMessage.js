const columns = [
    {
        "title"  : "挙式まで",
        "text"   : "~ 12:00",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "予定_before"
        }]
    },
    {
        "title"  : "挙式",
        "text"   : "12:00 ~ 12:45",
        "actions": [{
            "type" : "message",
            "label": "詳細",
            "text" : "予定_wedding"
        }]
    },
    {
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
    before   : "ドリンクを用意していますので、挙式までしばらくお待ちください。\n" +
               "式場では、開始前にオープニングムービーが流れます。",
    wedding  : "2人とも緊張していると思いますので、近くを通った際は是非声をかけてください。\n" +
               "写真、動画もよろしくお願いします！\n\n" +
               "挙式後はフラワーシャワー、記念撮影ののちにウェルカムパーティを予定しています。\n" +
               "自由に過ごせるので是非ともお声がけください。\n" +
               "天気が良ければ、外で行われます。",
    reception: "新郎新婦入場、司会者開宴の辞ののち、新郎上司の" + process.env.GUEST_1 + "さんからお言葉を賜ります。\n" +
               "その後、乾杯のご挨拶を新郎上司の" + process.env.GUEST_2 + "さんより賜ります。\n" +
               "乾杯ののち順に料理が運ばれてきますので、是非お楽しみください。\n\n" +

               "しばらくご歓談頂いてから、新郎新婦色直しのため退場します。再入場前にはメモリアルムービーが流れます。\n" +
               "再入場時には、各テーブルにフルーツシャンパンを注ぎにまいります。\n" +
               "色直し後には、新郎友人による余興をお願いしています。\n" +
               "両親への花束贈呈、両家代表挨拶、新郎挨拶が終わると新郎新婦退場になります。"
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
