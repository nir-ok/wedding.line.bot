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
let sendMessage = (text, content) => {
    let data = {
        //"replyToken": content.replyToken,
        "to" : content.source.userId,
        "messages"  : messageCreator.create(text)
    };
    let body = JSON.stringify(data);
    let req = https.request({
        hostname: "api.line.me",
        port    : 443,
        //path    : "/v2/bot/message/reply",
        path    : "/v2/bot/message/push",
        method  : "POST",
        headers : {
            "Content-Type"  : "application/json",
            "Content-Length": Buffer.byteLength(body),
            "Authorization" : "Bearer " + process.env.ACCESS_TOKEN
        }
    });
    req.end(body, (err) => {
        err && console.log(err);
    });
}

let uploadS3 = (content) => {
    const errorMessage    = "[system]アップロードに失敗しました。再度試してみて下さい。";
    const successMessage  = "[system]アップロード完了しました！";
    const progressMessage = "[system]アップロード中です。ちょっと待ってね";
    let message = content.message;
    let userId  = content.source.userId;
    let s3      = new AWS.S3();
    //投稿された画像はmessage_idによって取得
    const sendOptions = {
        host   : 'api.line.me',
        path   : '/v2/bot/message/'+ message.id +'/content',
        headers: {
            "Content-type" : "application/json; charset=UTF-8",
            "Authorization": " Bearer " + process.env.ACCESS_TOKEN
        },
        method:'GET'
    };
    let img = [];
    sendMessage(progressMessage, content);
    let req = https.request(sendOptions, (res) => {
        res.on('data', (chunk) => {
            img.push(new Buffer(chunk));
        }).on('error', (e) => {
            console.log('[debug] image error. ' + e.stack);
            sendMessage(errorMessage, content);
        }).on('end', () => {
            const nowTime = new Date().getTime();
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,      // バケット名
                Key   : userId + '/' + nowTime + '.jpg', // バケットに保存するファイル名
                Body  : Buffer.concat(img)
            };
            s3.putObject(params, function(err, data) {
                if (err === null) {
                    console.log('[debug] s3 put success -> ' + err);
                    sendMessage(successMessage, content);
                } else {
                    console.log('[debug] s3 put err -> ' + err);
                    sendMessage(errorMessage, content);
                }
            });
        });
    });
    req.end();
};

exports.handler = (event, context, callback) => {
    let content = event.events[0];
    let message = content.message;

    if (message.type === 'text') {
        sendMessage(message.text, content);
    } else if (message.type === 'image') {
        uploadS3(content);
    } else {
        callback();
    }
};
