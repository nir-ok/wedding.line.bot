'use strict';

const AWS            = require('aws-sdk');
const https          = require('https');
const messageCreator = require("./messageCreator.js");

AWS.config.update({
    accessKeyId    : process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region         : process.env.S3_REGION
});

// 送信処理
let send = (data, callback) => {
    let body = JSON.stringify(data);
    let req = https.request({
        hostname: "api.line.me",
        port    : 443,
        path    : "/v2/bot/message/reply",
        method  : "POST",
        headers : {
            "Content-Type"  : "application/json",
            "Content-Length": Buffer.byteLength(body),
            "Authorization" : "Bearer " + process.env.ACCESS_TOKEN
        }
    });

    req.end(body, (err) => {
        err && console.log(err);
        callback(err);
    });
}

let uploadS3 = (img, userId, context) => {
    let s3 = new AWS.S3();
    const nowTime = new Date().getTime();
    const params = {
        Bucket: process.env.S3_BUCKET_NAME, // ←バケット名
        Key: userId + '/' + nowTime + '.jpg', // ←バケットに保存するファイル名
        Body: Buffer.concat(img)
    };
    s3.putObject(params, function(err, data) {
        console.log('[debug] s3 put err -> ' + err);
        context.done();
    });
};

exports.handler = (event, context, callback) => {
    let content = event.events[0];
    let replyToken = content.replyToken;
    let message = content.message;
    let userId = content.source.userId;

    if (message.type === 'text') {
        let data = {
            "replyToken": replyToken,
            "messages"  : messageCreator.create(message)
        };
        send(data, () => {
            callback();
        });
    } else if (message.type === 'image') {
        console.log("[debug] image up");
        //画像が投稿された場合の処理はこちら
        //投稿された画像はmessage_idによって取得
        const sendOptions = {
            host: 'api.line.me',
            path: '/v2/bot/message/'+ message.id +'/content',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": " Bearer " + process.env.ACCESS_TOKEN
            },
            method:'GET'
        };
        let img = [];
        let req = https.request(sendOptions, (res) => {
            res.on('data', (chunk) => {
                img.push(new Buffer(chunk));
            }).on('error', (e) => {
                console.log('[debug] image error. ' + e.stack);
            }).on('end', () => {
                uploadS3(img, userId, context);
            });
        });
        req.end();
    } else {
        callback();
    }
};
