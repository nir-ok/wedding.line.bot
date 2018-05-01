const columns = [
    {
        "text"   : "挙式 ~ ウェルカムパーティ",
        "actions": [{
            "type" : "message",
            "label": "曲を見る",
            "text" : "曲_wedding"
        }]
    },
    {
        "text"   : "披露宴前半",
        "actions": [{
            "type" : "message",
            "label": "曲を見る",
            "text" : "曲_reception1"
        }]
    },
    {
        "text"   : "披露宴後半",
        "actions": [{
            "type" : "message",
            "label": "曲を見る",
            "text" : "曲_reception2"
        }]
    }
];

const template = {
    "type"   : "carousel",
    "columns": columns
};

const detail = {
    none      : "",
    wedding   : "■ ガーデンセレモニー\n" +
                "・Call Me Maybe / Carly Rae Jepsen\n" +
                "・I Really Like You / Carly Rae Jepsen\n\n" +
                "■ ウェルカムパーティ入場\n" +
                "・Wedding March (Winter REMIX) / Q;indivi\n\n" +
                "■ ケーキ入刀 / ファーストバイト\n" +
                "・Wedding March Part.2 (Precious Time Mix) / Q;indivi\n" +
                "・Still Dreaming (Q;indivi~in early synner Remix) / Q;indivi",
    reception1: "■ 披露宴入場\n" +
                "・sea-through communication / school food punishment\n\n" +
                "■ 乾杯\n" +
                "・Can't Take My Eyes Off You (Late Might Tails Version) / Q;indivi\n\n" +
                "■ 新婦お色直し退場\n" +
                "・A Whole New World / Q;indivi\n\n" +
                "■ 新郎お色直し退場\n" +
                "・Good Time / Owl City & Carly Rae Jepsen",
    reception2: "■ お色直し入場\n" +
                "・Stay with You / Capsule\n" +
                "・Wake me up before you go go / Q;indivi\n" +
                "・Pathetic / Q;indivi\n\n" +
                "■ お手紙・プレゼント\n" +
                "・当日のお楽しみ☆\n\n" +
                "■ 新郎新婦退場\n" +
                "・美女と野獣 / Ariana Grande & John Legend"
};

exports.getList = () => {
    return [{
        "type"    : "template",
        "altText" : "曲を表示",
        "template": template
    }];
};

exports.getDetail = (key) => {
    return [{
        "type": "text",
        "text": detail[key]
    }];
};
