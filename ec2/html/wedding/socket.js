var viewer       = null;
var viewerOption = {
    title   : false,
    tooltip : false,
    movable : false,
    scalable: false
};
var colW   = (window.innerWidth > 500) ? 300 : 100;
var socket = io(Const.url);

// 接続時
socket.on('connect', function (data) {
    console.log(data);
});

// 画像取得時
socket.on('image', function(images) {
    console.log("on image -> " + images.length);
    images.value.forEach(function(buffer) {
        createImageDom(buffer);
    });
    show();
});

/**
 * 画像表示
 **/
function show() {
    if (viewer === null) {
        viewer = new Viewer(document.getElementById('images'), viewerOption);
    }
    viewer.update()
    var elem  = document.querySelector('.grid');
    var msnry = new Masonry(elem, {
        itemSelector: '.grid-item',
        columnWidth : colW
    });
    scrollTo(0, window.innerHeight);
}

/**
 * Dom生成処理
 **/
function createImageDom(buffer) {
    var divImage = document.getElementById('images');
    var div      = document.createElement('div');
    div.classList.add('grid-item');
    var img          = document.createElement('img');
    img.style.width  = colW + 'px';
    img.style.height = 'auto';
    var str = "data:image/png;base64," + arrayBufferToBase64(buffer);
    img.src = str;
    div.appendChild(img);
    divImage.appendChild(div);
}

/**
 * Base64エンコード
 **/
function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes  = new Uint8Array( buffer );
    var len    = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}
