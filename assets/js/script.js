
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
    var $navBar = $('.nav-placeholder .nav-wrapper');

    // find original navigation bar position
    var navPos = $navBar.outerHeight();

    // $('.nav-placeholder').css('height', navPos);

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
        var css = 'a.btn.btn-primary:hover, a.btn.btn-secondary:hover, .bg-dark a.btn.btn-secondary:hover, .dropdown-menu.show li a.btn:hover{ animation-name:' +  animations[Math.floor(Math.random()*animations.length)] +' }';
        var style = document.createElement('style');
    
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.getElementsByTagName('head')[0].appendChild(style);
    });


    $('.collapse').on('show.bs.collapse', function(){
        var p = $(this).parent();
        $(p).find( '.plus' ).text("-");
    });

    $('.collapse').on('hide.bs.collapse', function(){
        var p = $(this).parent();
        $(p).find( '.plus' ).text("+");
    });

    // var getJSON = function(url, callback) {
    //     var xhr = new XMLHttpRequest();
    //     xhr.open('GET', url, true);
    //     xhr.responseType = 'json';
    //     xhr.onload = function() {
    //       var status = xhr.status;
    //       if (status === 200) {
    //         callback(null, xhr.response);
    //       } else {
    //         callback(status, xhr.response);
    //       }
    //     };
    //     xhr.send();
    // };

    // getJSON('https://cors.io/?https://medium.com/memriverparks/latest?format=json',
    // function(err, data) {
    // if (err !== null) {
    //     console.log('Something went wrong: ' + err);
    // } else {
    //     console.log(JSON.parse(data));
    // }
    // });


    // $.ajax({
    //     type: "POST", //rest Type
    //     dataType: 'jsonp', //mispelled
    //     url: "http://cors.io/?https://medium.com/memriverparks/latest?format=json",
    //     async: false,
    //     contentType: "application/json; charset=utf-8",
    //     success: function (msg) {
    //         console.log(JSON.parse(msg));                
    //     }
    // });


    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/memriverparks')
   .then((res) => res.json())
   .then((data) => {
      // Filter for acctual posts. Comments don't have categories, therefore can filter for items with categories bigger than 0
      const res = data.items //This is an array with the content. No feed, no info about author etc..
      const posts = res.filter(item => item.categories.length > 0) // That's the main trick* !

      // Functions to create a short text out of whole blog's content
      function toText(node) {
         let tag = document.createElement('div')
         tag.innerHTML = node
         node = tag.innerText
         return node
      }
      function shortenText(text,startingPoint ,maxLength) {
         return text.length > maxLength?
         text.slice(startingPoint, maxLength):
         text
      }

      // Put things in right spots of markup
      let output = '';
      posts.forEach((item) => {
        //  output += `
        //  <li class="blog__post">
        //     <a href="${item.link}">
        //        <img src="${item.thumbnail}" class="blog__topImg"></img>
        //        <div class="blog__content">
        //           <div class="blog_preview">
        //              <h2 class="blog__title">${shortenText(item.title, 0, 30)+ '...'}</h2>
        //              <p class="blog__intro">${'...' + shortenText(toText(item.content),60, 300)+ '...'}</p>
        //           </div>
        //           <hr>
        //           <div class="blog__info">
        //              <span class="blog__author">${item.author}</span>
        //              <span class="blog__date">${shortenText(item.pubDate,0 ,10)}</span>
        //           </div>
        //        </div>
        //     <a/>
        //  </li>`
        output += `
        <div class="row pt-4 pb-2">
            <div class="col-5 offset-1">
                <div class="row">
                    <div class="col-10">
                            <h3 class="mb-2">${shortenText(item.pubDate,0,10)}</h3>
                            <h2>${item.title}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p class="mb-3">Foundation’s support to be celebrated this Friday at Grand Opening of the River Line and River Garden.</p>
                        <a href="${item.link}" class="btn btn-secondary" target='_blank'>Read More</a>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <img class="img-fluid" src="${item.thumbnail}">
            </div>
        </div>
        `
        //console.log(new Date(item.pubDate));
        console.log(item);
      })
      document.querySelector('#news-items').innerHTML = output
    //console.log(output);
})
    

 });







//  $(document).on('shown.bs.collapse', 'faq .collapse', function (e) {
//     
//  });

//  $(document).on('hidden.bs.collapse', '#collapseExample', function (e) {
//     $('.plus').text("+");
//  });
