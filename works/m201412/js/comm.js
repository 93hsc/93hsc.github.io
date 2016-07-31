// loading
var oWrap = document.getElementById('wrap');
var loading = document.getElementById('loading');
var oPercentNum = document.getElementById('percentNum');
var imgPath = 'images/';
var arrImgOne = ['bg1.jpg','bg2.jpg','index-spr.png','page1-spr.png','page2-spr.png','page3-spr.png','page4-spr.png','page5-spr.png','page-bg1.png','page-bg2.png','page-bg3.png','peo-1.png','peo-2.png','peo-3.png','peo-4.png'];

function loadFn(arrimg) {
    for (var i = 0; i < arrimg.length; i++) {
        arrimg[i] = (imgPath + arrimg[i]);
    };
    var loadImage = function (path, callback) {
        var img = new Image();
        img.onload = function () {
            img.onload = null;
            callback(path);
        }
        img.src = path;
    }

    var imgLoader = function (imgs, callback) {
        var len = imgs.length, i = 0;
        while (imgs.length) {
            loadImage(imgs.shift(), function (path) {
                callback(path, ++i, len);
            })
        }
    }
    var percent = 0;
    imgLoader(arrimg, function (path, curNum, total) {
        percent = curNum / total;
        oPercentNum.innerHTML = Math.floor(percent*100)+'%';
        if (percent == 1) {
            setTimeout(function () {
                loading.style.display = 'none';
                oWrap.style.display = 'block';
                oWrap.className = 'wrap pr bc ovh show';
            },500);
        }
    });
};
loadFn(arrImgOne);

$('#start-btn').on('touchend',function(){
    oWrap.style.top = '-100%';
    setTimeout(function(){
        $('#slider').addClass('show');
        slideCont();
    },500);
});

// 首页视频
var player1 = null;
$('.vid-btn').on('touchend',function(){
    $('#pop-video-box').show();
    if (player1 != null) {
        player1.play();
    } else{
        var video1 = new tvp.VideoInfo();
        video1.setVid('x0317okwfej');
        player1 = new tvp.Player();
        player1.create({
            width: 320,
            height: 240,
            video: video1,
            modId: 'pop-video',
            pic: '',        //视频封面地址
            vodFlashSkin: 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',  //精简皮肤        
            autoplay: true   //是否自动播放
        });
    } 
});
$('#pop-video-box').find('.close').on('touchend',function(){
    $('#pop-video-box').hide();
    player1.pause();
});

// 滑屏事件
function slideCont(){
    var pageIndex = 0,
        $aPage = $('#main .page'),
        $pageNum = $('#page-num'),
        outTimer = null,
        inTimer = null,
        player = null,
        peoTimer = null;
    $aPage.eq(pageIndex).addClass('upin').show();
    inTimer = setTimeout(function(){
        $aPage.eq(pageIndex).removeClass('upin downin').addClass('show');
        $pageNum.html('0'+(pageIndex+1));
    },1200);

    var gst = gesture($('#main')[0],{
        preventDefault : true
    });
    gst.on('swipeup',slideUp).on('swipedown',slideDown);

    function slideUp(){
        if (pageIndex >= $aPage.length - 1) return;
        gst.off('swipeup',slideUp).off('swipedown',slideDown);
        var thisIndex = pageIndex;
        clearTimeout(inTimer);
        clearTimeout(outTimer);
        clearTimeout(peoTimer);
        pauseVid();
        $('#page-4 .ele-1').hide();
        $aPage.eq(pageIndex).removeClass('upin downin show').addClass('upout');
        outTimer = setTimeout(function(){
            $aPage.eq(thisIndex).hide().removeClass('upout');
        },1200);
        pageIndex++;
        $aPage.eq(pageIndex).show().addClass('upin');
        inTimer = setTimeout(function(){
            $aPage.eq(pageIndex).removeClass('upin downin').addClass('show');
            $pageNum.html('0'+(pageIndex+1));
            playVid();
            peoAni();
            gst.on('swipeup',slideUp).on('swipedown',slideDown);
            if (pageIndex >= $aPage.length - 1) {
                $('#slider i').hide();
                $('#back-btn').css('display','block');
            };
        },1200);
    };

    function slideDown(){
        if (pageIndex <= 0) return;
        gst.off('swipeup',slideUp).off('swipedown',slideDown);
        var thisIndex = pageIndex;
        clearTimeout(inTimer);
        clearTimeout(outTimer);
        clearTimeout(peoTimer);
        pauseVid();
        $('#page-4 .ele-1').hide();
        $aPage.eq(pageIndex).removeClass('upin downin show').addClass('downout');
        outTimer = setTimeout(function(){
            $aPage.eq(thisIndex).hide().removeClass('downout');
        },1200);
        pageIndex--;
        $aPage.eq(pageIndex).show().addClass('downin');
        inTimer = setTimeout(function(){
            $aPage.eq(pageIndex).removeClass('upin downin').addClass('show');
            $pageNum.html('0'+(pageIndex+1));
            playVid();
            peoAni();
            gst.on('swipeup',slideUp).on('swipedown',slideDown);
            $('#slider i').show();
            $('#back-btn').hide();
        },1200);
    };

    function playVid(){
        if (pageIndex == 1) {
            if (player == null) {
                $('#videoCon').show();
                $('.page-vid-btn').hide();
                var video = new tvp.VideoInfo();
                video.setVid('x0317okwfej');
                player = new tvp.Player();
                player.create({
                    width: 250,
                    height: 145,
                    video: video,
                    modId: 'videoCon',
                    pic: '',        //视频封面地址
                    vodFlashSkin: 'http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf',  //精简皮肤        
                    autoplay: true   //是否自动播放
                });
            } else{
                $('#videoCon').show();
                $('.page-vid-btn').hide();
                player.play();
            };  
        };
    };
    function pauseVid(){
        $('#videoCon').hide();
        $('.page-vid-btn').show();
        if (player != null) {player.pause();}
    };
    function peoAni(){
        if (pageIndex == 3) {
            var n = 0,
                $aPeo = $('#page-4 .peo');
            $aPeo.removeClass('on').eq(n).addClass('on');
            setTimeout(function(){
                $aPeo.eq(n).removeClass('on');
            },2400);
            $('#page-4 .ele-1').show().attr('class','ele-1 pa num-'+n);
            peoTimer = setInterval(function(){
                n++;
                if (n >= 4) n = 0;
                $aPeo.removeClass('on');
                setTimeout(function(){
                    $aPeo.eq(n).addClass('on');
                },400);
                $('#page-4 .ele-1').attr('class','ele-1 pa num-'+n)
            },2800);
        };
    };
    $('#back-btn').on('touchend',function(){
        $aPage.removeClass('upin downin upout downout show').hide();
        oWrap.style.top = 0;
        gst.off('swipeup',slideUp).off('swipedown',slideDown);
    });
};