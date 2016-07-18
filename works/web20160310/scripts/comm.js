// �û��Ƿ���¼
var userState = 0;

// loading
var wrap = document.getElementById("wrap");
var loading = document.getElementById("loading");
var imgPath = '../res/';
var bLoad = true;
var arrImgOne = ['loading-bg.jpg','loading-txt.png','loading-img-1.png','loading-img-2.png'];
var arrImgTwo = ['batman.png','bg1.jpg','bg1-2.jpg','bg2.jpg','bg2-1.jpg','bg3.jpg','bg4.jpg','bg4-2.jpg','corner-1.png','fingerprint-1.png','fingerprint-2.png','gj-bg.png','logo.png','p1-txt.png','p2-txt.png','p3-txt.png','p4-txt.png','page-txt-1.png','page-txt-2.png','pop-bg.png','sprites.png','superman.png','vid-bg.png','vid-logo.jpg','xl-1.jpg','xl-2.jpg','xl-3.png','xl-4.jpg','xl-5.jpg','xl-6.jpg','xl-7.jpg','spark.png','prompt-bg.png'];

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
        if (bLoad == true) {
            if (percent == 1) {
                setTimeout(function () {
                    loadFn(arrImgTwo);
                    bLoad = false;
                }, 500);
            }
        }else{
            if (percent == 1) {
                setTimeout(function () {
                    loading.style.display = 'none';
                    wrap.style.display = 'block';
                },500);
            }
        }
    });
};
loadFn(arrImgOne);

// ����
Zepto(function($){
    window.pageSlide = new mo.Slide({
        target: $('#wrap .event'),
        effect: 'slide'
    });
    pageSlide.on('touchstart', function(){
        if(this.curPage === 0 || this.curPage === 1 || this.curPage === 2 || this.curPage === 3) return false;
    });
});

// ��Ч
var isWebChat = function isWebChat() {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger';
};
var oMusicBtn = $('.music-btn'),
    musicPick = isWebChat(),
    oBgm = $('.audio-box .bgm')[0],
    aSounds = $('.audio-box .sound'),
    oSound1 = $('.audio-box .sound-1')[0],
    oSound2 = $('.audio-box .sound-2')[0],
    oSound3 = $('.audio-box .sound-3')[0],
    oSound4 = $('.audio-box .sound-4')[0],
    oSound5 = $('.audio-box .sound-5')[0];

function musicPlay(){
    if(musicPick == true){
        oBgm.play();
        if (!oMusicBtn.has('music-play')) {
            oMusicBtn.addClass('music-play');
        }; 
    }else{
        oBgm.pause();
        if (oMusicBtn.has('music-play')) {
            oMusicBtn.removeClass('music-play');
        };   
    }
}

musicPlay();
$(window).on('touchstart',function(){
    musicPlay();
    $(window).off();
})

aSounds.each(function(i){
    aSounds.eq(i).on('ended',musicPlay)
})

oMusicBtn.on('touchend',function(){
    if (musicPick == true) {
        musicPick = false;
        musicPlay();
        oMusicBtn.removeClass('music-play');
    }else if(musicPick == false){
        musicPick = true;
        musicPlay();
        oMusicBtn.addClass('music-play');
    }
})

// ҳ��һ����
var oTearBtn = $('.event-1 .tip-round'),
    oLogo = $('.event-1 .logo'),
    oTipImg = $('.event-1 .tip-img'),
    oTipTxt = $('.event-1 .tip-txt'),
    oTearBox = $('.event-1 .tear-box'),
    oTxt1 = $('.event-1 .txt'),
    oFinger = $('.event-1 .finger'),
    oAni = $('.event-1 .ani'),
    oDialogueBox = $('.dialogue-box'),
    oSlider1 = $('.event-1 .slider'),
    timer1 = null;

oTearBtn.on('touchend',function(){
    $(this).hide();
    oTipImg.hide();
    oTipTxt.hide();
    oTearBox.addClass('play').on('webkitAnimationStart',function(){
        oSound1.play();
    });
});

oTearBox.on('webkitAnimationEnd',function(){
    oLogo.addClass('play').on('webkitAnimationStart',function(){
        oSound2.play();
    })
    oTxt1.addClass('play');
    oFinger.show().addClass('play').on('touchstart',function(){
        $(this).hide();
        oLogo.addClass('end');
        setTimeout(function(){
            oSound3.play();
        },2200)
        oAni.addClass('play'); 
    })
});

oAni.on('webkitAnimationEnd',function(){
    oDialogueBox.addClass('play');
});

oDialogueBox.find('.dia-2').on('webkitAnimationEnd',function(){
    setTimeout(function(){
        oDialogueBox.addClass('end')
    },2200)
})

oDialogueBox.find('.dia-8').on('webkitAnimationEnd',function(){
    oSlider1.show();
    $(this).parent().addClass('show');
    pageSlide.off('touchstart');
    pageSlide.on('touchstart', function(){
        if(this.curPage === 1) return false;
    });
})

// ҳ��������
var oEvent2 = $('.event-2'),
    oExc = $('.event-2 .excessive'),
    oVidWrap = $('.event-2 .vid-wrap'),
    oVidBtn = $('.event-2 .vid-btn'),
    oSlider2 = $('.event-2 .slider');

oEvent2.find('.dia-3').on('webkitAnimationEnd',function(){
    var _this = $(this);
    setTimeout(function(){
        oEvent2.addClass('end');
        _this.off().on('webkitAnimationEnd',function(){
            oExc.addClass('play').on('webkitAnimationStart',function(){
                oSound4.play();
            })
        })
    },2200)
})

oExc.on('webkitAnimationEnd',function(){
    oVidWrap.addClass('play');
})

oVidWrap.find('.dia-5').on('webkitAnimationEnd',function(){
    oVidBtn.addClass('show').find('span').on('webkitAnimationEnd',FnVid)
})

function FnVid(){
    oVidBtn.hide();
    oVidWrap.find('.vid-1').addClass('show').on('webkitAnimationEnd',function(){
        $(this).hide();
        oVidWrap.find('.vid-logo').addClass('show').on('webkitAnimationEnd',function(){
            oVidWrap.find('.vid-2').hide().removeClass('show');
            oVidWrap.find('.vid-1').show().removeClass('show');
            oVidBtn.show().removeClass('show').find('span').off();
            oVidWrap.addClass('end');
            setTimeout(function(){
                oSlider2.show();
                pageSlide.off('touchstart');
                pageSlide.on('touchstart', function(){
                    if(this.curPage === 2) return false;
                });
            },500);  
        });
        oVidWrap.find('.vid-2').show().addClass('show');
    })
}

oVidBtn.on('touchend',function(){
    oVidWrap.find('.vid-logo').removeClass('show');
    $(this).addClass('show').find('span').on('webkitAnimationEnd',FnVid())
})

// ҳ��������
var oReceive = $('.event-3 .btn'),
    oPopWrap = $('#pop-wrap'),
    oPopClose = $('#pop-wrap .close'),
    oSubmit = $('#pop-wrap .login-button');

oReceive.on('touchend',function(){
    if (userState == 0) {
        oPopWrap.show();
    }else{
        pageSlide.next();
        pageSlide.on('touchstart', function(){
            if(this.curPage === 3) return false;
        });
    }
});

oPopClose.on('touchend',function(){
    oPopWrap.hide();
});

oSubmit.on('touchend',function(){
    oPopWrap.hide();
    setTimeout(function(){
        pageSlide.next();
        pageSlide.on('touchstart', function(){
            if(this.curPage === 3) return false;
        });
    },500)
});

// ҳ���Ķ���
var oShareWrap = $('#share-wrap'),
    oShareBtn = $('.event-4 .share'),
    oPromptBox = $('#prompt-box'),
    oGrab2 = $('.event-4 .grab-2'),
    oPromptClose = $('#prompt-box .close');

oShareBtn.on('touchend',function(){
    oShareWrap.show();
    oSound5.play();
});

oShareWrap.on('touchend',function(){
    $(this).hide();
});

oGrab2.on('touchend',function(){
    oPromptBox.show();
});

oPromptClose.on('touchend',function(){
    oPromptBox.hide();
})