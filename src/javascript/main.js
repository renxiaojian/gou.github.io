/**
 * Created by 小剑 on 2017/2/23.
 */
$(function () {
    //----------------顶部广告位隐藏-----------------------------------
    $('#closeBtn').click(function () {
        $('.adTop').slideUp('slow');
    });

    //----------------top-main右侧下拉菜单-----------------------------
    $('.mygou').on({
        'mouseenter':function () {
            $(this).addClass('on');
            $(this).find('.arrow').addClass('onarrow');
            $(this).find('.noneCon').slideDown('fast');
        },
        'mouseleave':function () {
            $(this).removeClass('on');
            $(this).find('.arrow').removeClass('onarrow');
            $(this).find('.noneCon').slideUp('fast');
        }
    });

    //--------------------------------------导航菜单滑动效果-----------------------------------------
    var navBar = $('#nav-bar'),   //导航条
        navLi = $('#nav-bar li'),   //导航条下的Li
        li_a = $('.current-line a'),    //当前移动到下滑线处的a
        leftPos,    //下划线的位置
        newWidth;   //新下划线的宽度
    navBar.append('<li class="line"><div class="line-arrow"></div></li>');
    var magicLine = $('.line');
    //初始化样式
    magicLine
        .width(li_a.width())
        .css('left',li_a.parent('li').position().left)
        .data('origLeft',magicLine.position().left)
        .data('origWidth',magicLine.width());

    navLi.find('a').hover(function () {
        $(this).parent('li').addClass('nav-on');
        leftPos = $(this).parent('li').position().left;
        newWidth = $(this).width();
        magicLine.stop().animate({
            left:leftPos,
            width:newWidth
        });
    },function () {
        $(this).parent('li').removeClass('nav-on');
        magicLine.stop().animate({
            left:magicLine.data('origLeft'),
            width:magicLine.data('origWidth')
        });
    });

    //-------------------------动态添加左边侧边栏二级菜单数据----------------------
    var liObj = $('.nav-list li'),
        menuList,menuListLen,navIndex;

    liObj.mouseenter(function () {
        $(this).addClass('liColor').siblings().removeClass('liColor');
        $(this).children('i').width(47).parent().siblings().children('i').width(39);
        $('.menu').css('left','170px').show().stop().animate({left:180,opacity:0.95},300);
        $('.menu').empty();
        navIndex = $(this).index();
        menuList = menuDate['list'+(navIndex+1)];
        menuListLen = menuList.length;
        for(var i=0;i<menuListLen;i++){
            var pObj = $('<p><strong>'+menuList[i].strong+'</strong></p>');
            for(var j=0;j<menuList[i].aLists.length;j++){
                var aObj = $('<a href="#">'+menuList[i].aLists[j]+'</a>');
                pObj.append(aObj);
            }
            $('.menu').append(pObj);
        }
    });

    $('.sidleCon').mouseleave(function () {
        $('.menu').hide().css('left','170px');
        liObj.eq(navIndex).removeClass('liColor').children('i').width(39);

    });

    //--------------------------右侧边栏目--------------------
    var tanW;
    $('#top').click(function () {
        $('html,body').animate({scrollTop: '0px'}, 1000);
    });
    $('.car-info li').mouseenter(function () {
        tanW = $(this).find('.tan').width();
        $(this).find('.tan').stop().animate({left:-tanW},300);
    }).mouseleave(function () {
        $(this).find('.tan').stop().animate({left:0},300);
    });
//---------------------------左侧边栏目------------------
    var floorH = [];
    var floorLen = $('section[floor]').length;
    for(var i=0;i<floorLen;i++){
        var height = $('section[floor]').eq(i).offset().top;
        floorH.push(height);
    }
    var onOff = true;
    $('.asideLeft a').on({
        mouseenter:function () {
            if($(this).attr('class')=='on'){
                onOff = true;
            }else{
                $(this).addClass('on');
                $(this).children('div').hide();
                onOff = false;
            }
        },
        mouseleave:function () {
            if(onOff){
                return false;
            }else{
                $(this).removeClass('on');
                $(this).children('div').show();
            }
        },
        click:function () {
            var index = $(this).index();
            $('html,body').animate({scrollTop: floorH[index]}, 800);
        }
    });
//-------------------------滚轮监听事件----------------------
    var scrollTop,     //获取滚动条到顶部的距离
        asideA = $('.asideLeft a');
    $(window).scroll(function () {
        scrollTop = $(window).scrollTop();
        if(scrollTop<1500){
            $('.fly-nav').stop().animate({top:-55},300);
        }else if(scrollTop>floorH[0]){
            $('.asideLeft').css('top','200px');
        }else{
            $('.fly-nav').stop().animate({top:0},300);
            $('.asideLeft').css('top','650px');
        }
        for(var i=0;i<floorLen;i++){
            if(scrollTop>floorH[i]-50){
                asideA.eq(i).addClass('on');
                asideA.eq(i).children('div').hide();
                asideA.eq(i).siblings().removeClass('on');
                asideA.eq(i).siblings().children('div').show();
            }
        }
    });
});