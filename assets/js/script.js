$(document).ready(function(){

    //SHRINK NAV
    var $navBar = $('.nav-placeholder .nav-wrapper');

    if ($('.round').length){
        var shrinkPos = $('.round').offset().top;
    } else {
        var shrinkPos = 200;
    }

    $(window).scroll(function() {

        var scrollPos = $(this).scrollTop();

        if (scrollPos >= shrinkPos) {
            $navBar.addClass('fixed');
        } else {
            $navBar.removeClass('fixed');
        }

    });


    //PARKS TRANSITION & LOAD

    $('#parks-hero a').click(function(e){
        e.preventDefault(); 
        $('#parks-hero').addClass('clicked');
        $('#parks-hero').find('.district').addClass('hidden');
        $(this).addClass('disabled');
        $(this).find('.district').removeClass('hidden').addClass('clicked');
        $(this).find('.after-click').removeClass('d-none');
        $(this).find('.before-click').addClass('d-none');

        var url = "../../" + this.id + ".html";
        $("#district-content").html("<p>loading...</p>").load(url);
    });



    //HOVER COLOR EFFECTS & ANIMATIONS

    var palette = ['#44b549', '#ffc818', '#f05f22', '#298fce', '#e684a1'];
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
    
    $("a").mouseleave(function(){
        var css = '.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus, a:hover, a:focus{ color: ' + palette[Math.floor(Math.random()*palette.length)] +' !important; } .event-image .img-container{ background-color: ' + palette[Math.floor(Math.random()*palette.length)] +' }'; 
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.getElementsByTagName('head')[0].appendChild(style);
    });



    // FOOTER BG COLOR

    if($('#main-parent').length){
        var lastContainer = $( "#main-parent .container-fluid:last-child" );
    } else {
        var lastContainer = $('footer').prev('div');
    }
    if (lastContainer.hasClass('bg-grey')){
        $('footer .container-fluid').removeClass('bg-grey');
    }



    //FAQ COLLAPSE

    $('.collapse').on('show.bs.collapse', function(){
        var p = $(this).parent();
        $(p).find( '.plus' ).text("-");
    });

    $('.collapse').on('hide.bs.collapse', function(){
        var p = $(this).parent();
        $(p).find( '.plus' ).text("+");
    });



    //MEDIUM

    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/memriverparks')
   .then((res) => res.json())
   .then((data) => {
      const res = data.items
      const posts = res.filter(item => item.categories.length > 0)

      let output = '';
      let outputLanding = '';
      let iteration = 0;

      console.log(res);
      
      posts.forEach((item) => {
        var pubDate = new Date(item.pubDate);
        var pubDateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        var desc = item.description;
        var stripped = $(desc).text();
        var firstLine = stripped.split('.')[0];
        firstLine += ".";

        

        output += `
        <div class="row pt-4 pb-2">
            <div class="col-5 offset-1">
                <div class="row">
                    <div class="col-10">
                            <h3 class="mb-2">${pubDate.toLocaleDateString("en-US", pubDateOptions)}</h3>
                            <h2>${item.title}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-6">
                        <p class="mb-3">${firstLine}</p>
                        <a href="${item.link}" class="btn btn-secondary" target='_blank'>Read More</a>
                    </div>
                </div>
            </div>
            <div class="col-5">
                <img class="img-fluid" src="${item.thumbnail}">
            </div>
        </div>
        `;

        if (iteration<2){
            outputLanding += `
                <div class="row mb-5">
                    <div class="col-6">
                        <img class="img-fluid" src="${item.thumbnail}">
                    </div>
                    <div class="col-6">
                        <h3 class="mb-2">${pubDate.toLocaleDateString("en-US", pubDateOptions)}</h3>
                        <h2>${item.title}</h2>
                        <p class="mb-3">${firstLine}</p>
                        <a href="${item.link}" class="btn btn-secondary" target='_blank'>Read More</a>
                    </div>
                </div>
                `;
            }

            iteration+=1 ;

      });
      
        var newsFeed =  document.getElementById('news-items');
        var newsSelection =  document.getElementById('news-items-selection');

        if (typeof(newsFeed) != 'undefined' && newsFeed != null) {
            document.querySelector('#news-items').innerHTML = output;
        }
        if (typeof(newsSelection) != 'undefined' && newsSelection != null) {
            document.querySelector('#news-items-selection').innerHTML = outputLanding;
        }

    })




    //INSTAGRAM
    var token = '1537913266.ff0987d.2d654495e5a54058a67e7dfdce65cb7a', // learn how to obtain it below
        userid = 1537913266, // User ID - get it in source HTML of your Instagram profile or look at the next example :)
        num_photos = 18, // how much photos do you want to get
        instagramContent = '';
    
    $.ajax({
        url: 'https://api.instagram.com/v1/users/self/media/recent', // or /users/self/media/recent for Sandbox
        dataType: 'jsonp',
        type: 'GET',
        data: {access_token: token, count: num_photos},
        success: function(data){
            for( x in data.data ){
                instagramContent += '<div class="col-2 mb-1"><a href="' + data.data[x].link + '" target="_blank"><img class="img-fluid mb-3" src="' + data.data[x].images.standard_resolution.url + '"></a></div>';
            }
            document.getElementById('instaFeed').innerHTML = instagramContent;

        },
        error: function(data){
            console.log(data); // send the error notifications to console
        }
    });
    

 });
