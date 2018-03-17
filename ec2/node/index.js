// 初期設定
var AWS    = require('aws-sdk');
var fs     = require('fs');
var http   = require('http');
var conf   = require('./conf.json');
var server = http.createServer();

// サーバ起動
server.on('request', function(req, res) {
    var stream = fs.createReadStream('index.html');
    res.writeHead(200, {'Content-Type': 'text/html'});
    stream.pipe(res);
});
var io = require('socket.io').listen(server);
server.listen(conf.port);

// AWS設定
AWS.config.loadFromPath('./rootkey.json');
AWS.config.update({ region: conf.region });
var s3 = new AWS.S3();

// ファイルリスト、タイマー
var fileList = []; // ファイル名格納配列
var images   = []; // 画像データ格納配列
var timer    = setInterval(getList, 60 * 1000);
getList();

// 接続時処理
io.on('connection', function(socket) {
    console.log('connection: ' + socket.id);
    // 接続後は現状格納している画像リストを渡す
    socket.emit('image', { value: images });
});

/**
 * リストを取得
 **/
function getList() {
    var params = {
        Bucket : conf.bucket,
        MaxKeys: conf.max_keys
    };
    // s3データから最新のファイル名リストを取得
    s3.listObjects(params, function(err, data) {
        if (err != null) {
            console.log('listObjects error. -> ' + err);
            return;
        }
        var list = [];
        data.Contents.forEach(function(content) {
            list.push(content.Key);
        });
        // 旧ファイル名リストに無いものをリストアップし、リスト更新
        var result = getArrayIndexValueDiff(fileList, list);
        fileList = list;
        // 更新ファイルあれば画像データの取得へ
        if (result.length !== 0) {
            updateObjects(result);
        }
    });
}

/**
 * 新配列の方にしかない文字を取得
 **/
function getArrayIndexValueDiff(oldArr, newArr) {
  return newArr.filter((v, i)=> oldArr[i] !== v);
}

/**
 * 画像データ群の更新
 **/
function updateObjects(names) {
    // 1つずつ画像データを取得
    var p = new Promise((onSuccess, onFailed) => {
        var objects = [];
        names.forEach(function(name) {
            var image = getImage(name);
            image.then((data) => {
                objects.push(data);
                // すべて取得できたら終了
                if (names.length === objects.length) {
                    console.log('get Objects -> ' + objects.length);
                    onSuccess(objects);
                }
            });
        });
    });
    p.then((objects) => {
        // 初回以外で追加画像がある場合は全クライアントに通知
        if (images.length !== 0 && objects.length > 0) {
            console.log('updateObjects. -> ' + objects.length);
            io.sockets.emit('image', { value: objects });
        }
        // 画像データを結合し、初期最大表示数を超えるようであれば古い方を削除
        images = images.concat(objects);
        if (images.length > conf.max_keys) {
            images.splice(0, objects.length);
        }
    });
}

/**
 * 画像データの取得
 * @param String name ファイル名
 **/
function getImage(name) {
    return new Promise((onSuccess, onFailed) => {
        var params = {
            Bucket: conf.bucket,
            Key   : name
        };
        s3.getObject(params, function(err, data) {
            if (err) {
                console.log('getImage err -> ' + err);
                onFailed();
            } else {
                onSuccess(data.Body);
            }
        });
    });
}
