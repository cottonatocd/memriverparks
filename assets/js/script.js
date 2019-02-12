
// $(window).scroll(function(){
//     if ($(window).scrollTop() >= 200) {
//         $('nav').addClass('sticky-nav');
//     }
//     else {
//         $('nav').removeClass('sticky-nav');
//     }
// });





$(document).ready(function(){


    
    // $('#myDropdown').on('show.bs.dropdown', function () {
    //     // do something…
    //     console.log("shown");
    // });


    // cache the element
    var $navBar = $('.nav-wrapper');

    // find original navigation bar position
    var navPos = $navBar.outerHeight();

    $('.nav-placeholder').css('height', navPos);

    console.log(navPos);

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




    var palette = ['#44b549', '#ffc818', '#f05f22', '#298fce', '#e684a1'];

    // $("a.btn").hover(function(){
    //   $(this).css("background-color", "yellow");
    //   }, function(){
    //   $(this).css("background-color", "pink");
    // });

   
    // colorCycle(palette);


//     $("a.btn").mouseover(function(){
//         palette = shuffle(palette);
//         (function recurse(counter) {
//             var color = palette[counter];
//             $(this).css("background-color", color);
//             console.log(color);
//             delete palette[counter];
//             palette.push(color);
//             setTimeout(function() {
//                 recurse(counter + 1);
//             }, 300);
//         })(0);
    
//     });

 });


// function shuffle(array) {
//     var currentIndex = array.length, temporaryValue, randomIndex;
  
//     // While there remain elements to shuffle...
//     while (0 !== currentIndex) {
  
//       // Pick a remaining element...
//       randomIndex = Math.floor(Math.random() * currentIndex);
//       currentIndex -= 1;
  
//       // And swap it with the current element.
//       temporaryValue = array[currentIndex];
//       array[currentIndex] = array[randomIndex];
//       array[randomIndex] = temporaryValue;
//     }
  
//     return array;
// }

// function colorCycle(array) {
//     array = shuffle(array);
//     for (var x = 0; x < array.length; x++) {
//         setTimeout(function(y) {    
//             console.log(array[y]);
//         }, x * 500, x); // we're passing x
//     }
// }






// var newsArray = [];   // your code puts strings into this array
// var curNewsIndex = -1;

// function advanceNewsItem() {
//     ++curNewsIndex;
//     if (curNewsIndex >= newsArray.length) {
//         curNewsIndex = 0;
//     }
//     setTickerNews(newsArray[curNewsIndex]);   // set new news item into the ticker
// }



