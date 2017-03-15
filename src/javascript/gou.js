/**
 * Created by 小剑 on 2017/2/18.
 */
$(function () {

    //----------------------------------轮播图切换-----------------------------------//
    var curNum=0,
        count = $('#sidleBtn li').length,   //轮播图片的张数
        currentDiv = $('.wrapImg .sidleImg'),   //获取淡入淡出的DIV层
        timer = setInterval(autoPlay,5000);
    //手动控制轮播
    $('#sidleBtn li').mouseenter(function () {
        clearInterval(timer);
        curNum = $(this).index();
        state(curNum);
    }).mouseleave(function () {
        timer = setInterval(autoPlay,5000);
    });
    //自动播放
    function autoPlay() {
        curNum++;
        if(curNum==count){
            curNum=0;
        }
        state(curNum);
    }

    function state(num) {
        currentDiv.eq(num).stop().fadeIn(2500).siblings().stop().fadeOut(1500);
        currentDiv.eq(num).find('img').addClass('trans');
        currentDiv.eq(num).siblings().find('img').removeClass('trans');
        $('#sidleBtn li').eq(num).addClass('current').siblings().removeClass('current');
    }

    //-------------------------------整点抢/商品列表---------------------------------//
    var tapLi = $('.buy-tap ul li'),
        tapUlLists = $('.tap-content ul'),
        currentIndex=0,comObj,len,buyBtnCon
        arr=[0,0,0,0,0];
    getCon(currentIndex);
    tapLi.on('click',function () {
        var arrowI = $('<i class="arrow-down"></i>');
        currentIndex = $(this).index();
        //头部选项卡样式切换
        $(this).addClass('tap-current').siblings().removeClass('tap-current');
        $(this).append(arrowI).siblings().find('i').remove();
        //商品列表ul的显示隐藏
        tapUlLists.eq(currentIndex).show().siblings().hide();
        //遍历每栏中的商品数目添加到要添加的ul中
        getCon(currentIndex);
    });

    function getCon(currentIndex) {
        conObj = conDateJson["conId"+(currentIndex+1)];
        len = conObj.length;
        tapUlLists.eq(currentIndex).empty().width(300*len);
        if(currentIndex==0){
            buyBtnCon = '马上抢';
        }else{
            buyBtnCon = '即将开抢';
        }
        for(var i=0;i<len;i++){
            var html =  '<li>'+
                '<a href="#"><img src="'+conObj[i].imgSrc+'" alt=""></a>' +
                    '<div class="des"><a href="#"><font color="red">'+conObj[i].red+'</font>'+conObj[i].describe+'</a></div>'+
                    '<p class="price">￥<b class="number">'+conObj[i].price+'</b><s>价格<del>￥'+conObj[i].old_price+'</del></s></p>' +
                    '<div class="buyBtn"><a href="#">'+buyBtnCon+'</a></div>' +
                '</li>';
            tapUlLists.eq(currentIndex).append($(html));
        }
    }
    //点击滑动切换
    $('#next').click(function () {
        nextMove(arr[currentIndex]);
    });
    $('#pre').click(function () {
        preMove(arr[currentIndex]);
    });

    function nextMove(moveNum) {
        if(moveNum==(len/4)-1){
            return;
        }
        moveNum++;
        arr[currentIndex] = moveNum;
        tapUlLists.eq(currentIndex).stop().animate({left:-moveNum*300*4},1000);
    }

    function preMove(moveNum) {
        if(moveNum==0){
            return;
        }
        moveNum--;
        arr[currentIndex] = moveNum;
        tapUlLists.eq(currentIndex).stop().animate({left:-moveNum*300*4},1000);
    }

    //-----------------------楼层中的小轮播图--------------------------------------------------//
    var  floor1 = new moveBanner();
    floor1.init($('#moveban1'),$('#prev1'),$('#next1'));

    var  floor2 = new moveBanner();
    floor2.init($('#moveban2'),$('#prev2'),$('#next2'));

    var  floor3 = new moveBanner();
    floor3.init($('#moveban3'),$('#prev3'),$('#next3'));

    var  floor4= new moveBanner();
    floor4.init($('#moveban4'),$('#prev4'),$('#next4'));

    var  floor5 = new moveBanner();
    floor5.init($('#moveban5'),$('#prev5'),$('#next5'));

    var  floor6 = new moveBanner();
    floor6.init($('#moveban6'),$('#prev6'),$('#next6'));

    var  floor7 = new moveBanner();
    floor7.init($('#moveban7'),$('#prev7'),$('#next7'));

    var  floor8= new moveBanner();
    floor8.init($('#moveban8'),$('#prev8'),$('#next8'));

    var  floor9= new moveBanner();
    floor9.init($('#moveban9'),$('#prev9'),$('#next9'));


    /*var floorBanNum = 0;
    var floorBanLen = $('.fB-list li').length;
    // 自动轮播
    var t = setInterval(function () {
        floorBanNum++;
        floorBanMove();
    },2500);

    // 移入移出
    $('.floorBanner').hover(function () {
        clearInterval(t);
    },function () {
        t = setInterval(function () {
            floorBanNum++;
            floorBanMove();
        },2500);
    });

    $('.nextfloor').click(function () {
        floorBanNum++;
        floorBanMove();
    });
    $('.prevfloor').click(function () {
        floorBanNum--;
        floorBanMove();
    });
    function floorBanMove(){
        if(floorBanNum==floorBanLen){
            floorBanNum = 1;
            $('.fB-list').css('left','0');
        }
        if(floorBanNum==-1){
            $('.fB-list').css('left',-(floorBanLen-1)*90);
            floorBanNum=floorBanLen-2;
        }
        $('.fB-list').stop().animate({left:-floorBanNum*90});
    }*/
});


function moveBanner() {
    this.obj = null;        //对象
    this.preBtn= null;      //前一页
    this.nextBtn= null;     //下一页
    this.len = null;        //轮播的组数
    this.timer = null;      //轮播定时器
    this.Num = 0;           //控制循环变量数字
    this.width = 0;         //轮播一组时的宽度
}
moveBanner.prototype.init=function (obj,preBtn,nextBtn) {
    var that = this;
    this.obj = obj;
    this.preBtn= preBtn;
    this.nextBtn= nextBtn;
    this.len = this.obj.find('li').length;
    this.width = this.obj.find('li').eq(0).width();

    this.preBtn.click(function () {
        that.Num--;
        that.fnMove();
    });
    this.nextBtn.click(function () {
        that.Num++;
        that.fnMove();
    });
    this.autoPlay();
    this.mousechange();
}

//左右按钮轮播
moveBanner.prototype.fnMove=function () {
    if(this.Num==this.len){
        this.Num = 1;
        this.obj.children('ul').css('left','0');
    }
    if(this.Num==-1){
        this.obj.children('ul').css('left',-(this.len-1)*this.width);
        this.Num=this.len-2;
    }
    this.obj.children('ul').stop().animate({left:-this.Num*this.width});
}
//自动播放
moveBanner.prototype.autoPlay=function () {
    var that = this;
    this.timer = setInterval(function () {
        that.Num++;
        that.fnMove();
    },1500);
}
//移入停止移出轮播
moveBanner.prototype.mousechange=function () {
    var that = this;
    this.obj.parent().hover(function () {
        clearInterval(that.timer);
    },function () {
        that.timer = setInterval(function () {
            that.Num++;
            that.fnMove();
        },2500);
    });
}
