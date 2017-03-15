/**
 * Created by 小剑 on 2017/2/23.
 */
$(function () {

    //左侧边导航菜单显示隐藏动画
    var sidleNav = $('.sidleCon');
    sidleNav.attr('style','display:none');
    $('.menu-btn').mouseenter(function () {
        sidleNav.stop().slideDown(300);
    });
    $('nav').mouseleave(function () {
        sidleNav.stop().slideUp(300);
    });

    //-------------------------------左侧列表展开收缩--------------------

    var mainmenu = $('.mainmenu');
    var submenu = $('.submenu');
    submenu.hide();
    mainmenu.on('click','.submenu-header',function () {
        $(this).next('.submenu').slideToggle().siblings('.submenu').slideUp();
    });

    $('.sort-bar a').click(function () {
        $(this).addClass('on').siblings().removeClass('on');
    });
    //------------------------商品列表框显示---------------------
    $('.goodsList ul li').mouseenter(function () {
        $(this).addClass('licolor').find('.ass').hide().next('.goodsbtn').show();
    }).mouseleave(function () {
        $(this).removeClass('licolor').find('.ass').show().next('.goodsbtn').hide();
    });
    //---------------------------分页设置-----------------------------
    var lists = $('.goodsList ul li')
    var pageNum = Math.ceil(lists.length/16);

    $('#page').jqPaginator({
        totalPages: pageNum,
        visiblePages: 5,
        currentPage: 1,
        onPageChange: function (num, type) {
            $('#text').html('当前第' + num + '页');
            lists.hide();
            var startNum =(num-1)*16;
            for(var i=startNum;i<startNum+16;i++){
                lists.eq(i).show();
            }
        }
    });

    //-----------------------热销推荐-------------------------
    var moveUl = $('.goodsBox ul');
    var numLi = moveUl.children('li').length;
    var count = 0;
    moveUl.width(numLi*225);
    $('#hotPre').click(function () {
        count--;
        Move();
    });
    $('#hotNext').click(function () {
        count++;
        Move();
    });
    function Move() {
        if(count==numLi/4){
            moveUl.css('left','0');
            count = 1;
        }
        if(count==-1){
            moveUl.css('left','-'+((numLi/4)-1)*255*4+'px');
            count = (numLi/4)-2;
        }
        moveUl.stop().animate({left:-count*225*4},800);
    }

});