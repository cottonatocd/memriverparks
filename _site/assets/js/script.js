$(document).ready(function(){

    //SHRINK NAV
    var $navBar = $('.nav-placeholder .nav-wrapper');

    if ($('.round.bg-dark').length){
        var shrinkPos = $('.round.bg-dark').offset().top;
    } else {
        var shrinkPos = 200;
    }

    checkNavPosition($(window).scrollTop());

    $(window).scroll(function() {
        //var scrollPos = $(this).scrollTop();
        checkNavPosition($(this).scrollTop());
    });

    

    function checkNavPosition(scrollPos){

        if (scrollPos >= shrinkPos) {
            $navBar.addClass('fixed');
            $('.navbar-brand').addClass('smaller');
        } else {
            $navBar.removeClass('fixed');
            $('.navbar-brand').removeClass('smaller');
            $('.navbar-brand.always').addClass('smaller');
        }
    }

if(document.getElementsByName('Email')[0]){

    document.getElementsByName('Email')[0].onfocus = function(){
        document.getElementsByName('Email')[0].placeholder='Enter your email & press Enter';
    }

    document.getElementsByName('Email')[0].onfocusout = function(){
        document.getElementsByName('Email')[0].placeholder='Sign Up for Updates';
       // console.log("changed!");
    }
}

    //NAV DROPDOWN MOBILE
    $(document).on('click', '.dropdown .dropdown-menu', function (e) {
        e.stopPropagation();
      });
    


    //CAROUSEL
    $('.carousel').carousel({
        interval: false
      })

    //PARKS TRANSITION & LOAD

    $('#parks-hero a').click(function(e){
        e.preventDefault(); 
    
        $('#parks-hero').addClass('clicked');
        $('#parks-hero').find('.district').addClass('hidden');
        $(this).addClass('disabled');
        $(this).find('.district').removeClass('hidden').addClass('clicked');
        $(this).find('.after-click').removeClass('d-none');
        $(this).find('.before-click').addClass('d-none');

        var url = "/dont-edit-parks/" + this.id + ".html";

        window.history.pushState('obj', 'newtitle', "/parks/" + this.id);

       // console.log(url);


        
        $("#district-content").html("<p>loading content...</p>").load(url);
        //Use this inside your document ready jQuery 
        $(window).on('popstate', function() {
            location.reload(true);
        });

        document.body.scrollTop = document.documentElement.scrollTop = 0;
        // return false;
    });


    //NAV COLOR ON MOBILE COLLAPSE
    // $('#collapsingNavbar3').collapse({
    //     // toggle: false
    //   });
      $('#collapsingNavbar3').on('show.bs.collapse', function(){
        $('.nav-wrapper').addClass("navbar-mobile");
    });
    $('#collapsingNavbar3').on('hide.bs.collapse', function(){
        $('.nav-wrapper').removeClass("navbar-mobile");
    });

    //FAVICON
    var page_title = document.getElementsByTagName("title")[0].innerHTML;
    var site_url = "http://localhost:4000";
    var favicon_images = [
        
        site_url + '/assets/images/favicon/2.png',
        site_url + '/assets/images/favicon/3.png',
        site_url + '/assets/images/favicon/4.png',
        site_url + '/assets/images/favicon/5.png',
        site_url + '/assets/images/favicon/1.png'
    ],
    image_counter = 0; // To keep track of the current image

    if(page_title.indexOf("Greenbelt") !== -1 || page_title.indexOf("Mud Island") !== -1 || page_title.indexOf("Fourth Bluff") !== -1 || page_title.indexOf("Big River") !== -1 || page_title.indexOf("MLK") !== -1) {
        // do nothing
    } else {
        setInterval(function() {
        $("link[rel='icon']").remove();
        $("link[rel='shortcut icon']").remove();
        $("head").append('<link rel="icon" href="' + favicon_images[image_counter] + '" type="image/gif">');

        // If last image then goto first image
        // Else go to next image    
        if(image_counter == favicon_images.length -1)
            image_counter = 0;
        else
            image_counter++;
        }, 1000);
    }

    //HOVER COLOR EFFECTS & ANIMATIONS

    var palette = ['#44b549', '#ffc818', '#f05f22', '#298fce', '#e684a1'];
    var animations = ['bgcolorchange1', 'bgcolorchange2', 'bgcolorchange3', 'bgcolorchange4'];

    $("a.btn").mouseleave(function(){
        var css = 'a.btn.btn-primary:not(.btn-404):hover, a.btn.btn-secondary:hover, .bg-dark a.btn.btn-secondary:hover, .dropdown-menu.show li a.btn:hover{ animation-name:' +  animations[Math.floor(Math.random()*animations.length)] +' }';
        var style = document.createElement('style');
    
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.getElementsByTagName('head')[0].appendChild(style);
    });
    
    $("a").mouseleave(function(){
        var css = '.navbar-light .navbar-nav .nav-link:hover, .navbar-light .navbar-nav .nav-link:focus, a:not(.round-donate):hover, a:not(.btn-secondary):hover, a:not(.btn):focus{ color: ' + palette[Math.floor(Math.random()*palette.length)] +' !important; } .event-image .img-container{ background-color: ' + palette[Math.floor(Math.random()*palette.length)] +' }'; 
        var style = document.createElement('style');
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    
        document.getElementsByTagName('head')[0].appendChild(style);
    });

    setTimeout(function(){  

            var classname = document.getElementsByClassName("event-image");

            for (var i = 0; i < classname.length; i++) {
                classname[i].addEventListener("mouseout", function( event ) {
                console.log("left event");
                var randomColor = palette[Math.floor(Math.random()*palette.length)];
                var css = "a.event-image:hover .img-container{  background-color:" +  randomColor + "; -webkit-animation:none; animation:none;} a.event-image:hover h3, a.event-image:hover h2{color:" +  randomColor + "; -webkit-animation:none; animation:none;}";
                var style = document.createElement('style');
                if (style.styleSheet) {
                    style.styleSheet.cssText = css;
                } else {
                    style.appendChild(document.createTextNode(css));
                }
                document.getElementsByTagName('head')[0].appendChild(style);
            });
        };
        }, 3000);

    // 404 BG COLOR CHANGE
    var colors = palette;
    var currentColor = 0;
    var lis = document.getElementById("#page-404");
   
    
    function changeColor() {
    if (currentColor < colors.length - 1){
      ++currentColor
    } else {
        currentColor = 0;
    }
      if (currentColor < 0) {
          currentColor = colors.length -1
      }
      
        if (lis !== null){
            lis.style.background = colors[currentColor];
        }
    }
    
    setInterval(changeColor, 1600);



    // ROUND SUBSCRIBE ACTION HOME PAGE
    $('.join').on('click', function(e){
        e.preventDefault(); 
        $('.round').addClass("form-active");
    })

    // DROPDOWN MENU EVENTS

    $(document).on("hidden.bs.dropdown", ".dropdown", function (e) {
        $(".nav-link.dropdown-toggle").removeClass("showing");
        $(".dropdown-menu li a.btn").addClass('animate-me').removeClass('post-animation');
    });

    var x = document.getElementsByClassName('animate-me');
    for (var i=0; i<x.length; i++){
        //console.log(x[i]);
        x[i].addEventListener("webkitAnimationEnd", animEnd);
    }
    

    function animEnd() {
        $(this).removeClass('animate-me').addClass('post-animation');
       // console.log(this);
    }



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


    //AUTO OPEN FACEBOOK APP
    function openFbApp(){
    setTimeout(function () { 
        window.location = "https://www.facebook.com"; 
    }, 25);
    window.location = "fb://";
    }

    

    //MEDIUM
    

    fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/memriverparks')
   .then((res) => res.json())
   .then((data) => {
      const res = data.items
      const posts = res.filter(item => item.categories.length > 0)

      let output = '';
      let outputLanding = '';
      let iteration = 0;
      
      posts.forEach((item) => {
        var pubDate = new Date(item.pubDate);
        var pubDateSafari = new Date(item.pubDate.replace(/-/g, "/"));
        // console.log(item.pubDate);
        // console.log(pubDate);
        // console.log(pubDateSafari);

        var pubDateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        var desc = item.description;
        var stripped = $(desc).text();
        var firstLine = stripped.split('.')[0];
        firstLine += ".";

        

        output += `
        <div class="row pt-4 pb-2">
            <div class="col-md-6 col-lg-5 offset-lg-1 order-2 order-md-1">
                <div class="row">
                    <div class="col-10 col-sm-6 col-md-12 col-lg-8 col-xl-6">
                            <h3 class="mb-2">${pubDateSafari.toLocaleDateString("en-US", pubDateOptions)}</h3>
                            <h2>${item.title}</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="col-10 col-sm-6 col-md-12 col-lg-8 col-xl-6">
                        <p class="mb-3">${firstLine}</p>
                        <a href="${item.link}" class="btn btn-secondary" target='_blank'>Read More</a>
                    </div>
                </div>
            </div>
            <div class="mb-2 mb-md-0 col-sm-10 col-md-6 col-lg-5 order-1 order-md-2">
                <img class="img-fluid" src="${item.thumbnail}">
            </div>
        </div>
        `;

        if (iteration<2){
            outputLanding += `
                <div class="row mb-5">
                    <div class="col-sm-6 mb-3 mb-md-0">
                        <img class="img-fluid" src="${item.thumbnail}">
                    </div>
                    <div class="col-sm-6">
                        <h3 class="mb-2">${pubDateSafari.toLocaleDateString("en-US", pubDateOptions)}</h3>
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
                instagramContent += '<div class="col-6 col-sm-4 col-md-3 col-lg-2 mb-1"><a href="' + data.data[x].link + '" target="_blank"><img class="img-fluid mb-3" src="' + data.data[x].images.standard_resolution.url + '"></a></div>';
            }
            var instaElement =  document.getElementById('instaFeed');
            if (typeof(instaElement) != 'undefined' && instaElement != null) {
                document.getElementById('instaFeed').innerHTML = instagramContent;
            } 
        },
        error: function(data){
            console.log(data); // send the error notifications to console
        }
    });
    

 });
