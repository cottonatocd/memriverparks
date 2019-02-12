
// $(window).scroll(function(){
//     if ($(window).scrollTop() >= 200) {
//         $('nav').addClass('sticky-nav');
//     }
//     else {
//         $('nav').removeClass('sticky-nav');
//     }
// });

$(document).ready(function(){

    // cache the element
    var $navBar = $('.nav-wrapper');

    // find original navigation bar position
    var navPos = $navBar.outerHeight();

    $('.nav-placeholder').css('height', navPos);

    // on scroll
    $(window).scroll(function() {

        // get scroll position from top of the page
        var scrollPos = $(this).scrollTop();

        // check if scroll position is >= the nav position
        if (scrollPos >= navPos) {
            $navBar.addClass('fixed');
        } else {
            $navBar.removeClass('fixed');
        }

    });

    // var palette = ['#44b549', '#ffc818', '#f05f22', '#298fce', '#e684a1'];
    
    var animations = ['bgcolorchange1', 'bgcolorchange2', 'bgcolorchange3', 'bgcolorchange4'];

    $("a.btn").mouseleave(function(){
        var css = 'a.btn.btn-primary:hover, a.btn.btn-secondary:hover, .inverse a.btn.btn-secondary:hover, .dropdown-menu.show li a.btn:hover{ animation-name:' +  animations[Math.floor(Math.random()*animations.length)] +' }';
        var style = document.createElement('style');
    
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.getElementsByTagName('head')[0].appendChild(style);
    });



 });