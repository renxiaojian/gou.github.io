/**
 * Created by 小剑 on 2017/2/26.
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

});