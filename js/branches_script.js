$(function(){
    $(".branches .service-container").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        arrows: true,
        infinite: false,
        nextArrow: '.button-service.btn.btn-blue.next',
        prevArrow: '.button-service.btn.btn-blue.prev'
    });

    $(window).on('resize orientationchange', function() {
        $('.branches .service-container').slick('resize');
    });


    $(".branches .banner.main-banner .item").each(function() { 
        $background = $(this).data('background');
        if($background) {
            $(this).css('background-image', "url('"+ $background + "')");   
        }
    });

    var $is_event = true;
    var $is_bottom = false;
    var $is_top = false;
    
    var ts = false;
    var startTime = false;
    $('.container').on('touchstart', function (e){
        if(e.originalEvent.touches.length >= 2) {
            ts = false;
            return false;
        }
        e.preventDefault();
        ts = e.originalEvent.touches[0].clientY; 
    });
    

    $('.container').on('mousewheel DOMMouseScroll touchend', function(event) {
        var distance = 0;

        if(typeof event.originalEvent.changedTouches != 'undefined') {
            event.cancelable = true;
            var te = event.originalEvent.changedTouches[0].clientY;
            
            if(ts !== false && ts > te+30){
                distance = -1; 
            }else if(ts !== false && ts < te-30){
                distance = 1;
            } else if(ts !== false &&  ts == te) {
                var event_click = new Event('click');
                event.target.dispatchEvent(event_click);
            }
        } 
        event.preventDefault();
        

        
        
        delta = event.originalEvent.wheelDelta || -event.originalEvent.deltaY || distance;
        if($is_event == false) {
            return false;
        }

        $is_event = false;
        // setTimeout(function(){$is_event = true}, 3000);
        var $current = $('.branches .banner.main-banner.current');
        var current_dom = document.querySelector('.branches .banner.main-banner.current');
        

        if($('.branches .banner.main-banner.current .caption').hasClass('service-container')) {
            active_container = $('.branches .banner.main-banner.current  .inner-container.slick-active');
            var current_content = document.querySelector('.branches .banner.main-banner.current .inner-container.slick-active');
        } else {
            active_container = $('.branches .banner.main-banner.current  .inner-container');
            var current_content = document.querySelector('.branches .banner.main-banner.current .inner-container');
        }
        var bounding = current_dom.getBoundingClientRect();
        var bounding_content = current_content.getBoundingClientRect();

        $viewport_height = $(window).height();
        $header_height = $('#header').height();
        $menu_height = $('.button-category').outerHeight() + parseInt($('.button-category').css('bottom').split('px')[0]) ;

        $visible_height = $viewport_height - $header_height - $menu_height;

        
        padding_top = parseInt(active_container.css('padding-top'));
        padding_bottom = parseInt(active_container.css('padding-bottom'));

        if (delta > 0) {
            if((bounding_content.top + ($viewport_height - $visible_height)) <=  $header_height) { 
                current_top = parseInt(active_container.css('top'));
                active_container.animate({
                    top: current_top + ($viewport_height - $visible_height)
                }, 500, function(){
                    $is_top = false;
                    $is_event = true;
                    return;
                });
            } else {
                $prev = $current.prev('.branches .banner.main-banner');
                if ($prev.length) {
                    $is_top = false;
                    scrollToSection($prev);
                } else {
                    $is_top = true;
                    $is_event = true;
                    return false;
                }
            }
            
        } else if(delta < 0) {
            if((bounding_content.bottom + $menu_height - padding_top - padding_bottom) >  $viewport_height) {
                current_top = parseInt(active_container.css('top'));
                active_container.animate({
                    top: current_top - ($viewport_height - $visible_height)
                }, 500, function(){
                    $is_bottom = false;
                    $is_event = true;
                    return;
                });
            } else {
                $next = $current.next('.branches .banner.main-banner');
                if ($next.length) {
                    $is_bottom = false;
                    scrollToSection($next);
                } else if($is_bottom == true){
                    $('html, body').animate({
                      scrollTop: $('.container').next().offset().top
                    }, 1000, function(){
                        $is_event = true;
                        // window.location.hash = 'scroll-index-' + $index;
                    });
                } else {
                    $is_bottom = true;
                    $is_event = true;
                    return false;
                }
            }
        } else {
            $is_event = true; 
        }
    });

    var scrollToSection = function(section){
        $id = section.attr('id');
        if($id) {
            $index = $id.split('scroll-index-')[1];
            $('.button-category .country-flag.active').removeClass('active');
            $('.button-category #scroll-category-' + $index).addClass('active');
            if(parseInt($('.branches .banner.main-banner.current .inner-container').css('top'))) {
                $('.branches .banner.main-banner.current .inner-container').css('top', 'unset');
            }
            $('html, body').animate({
              scrollTop: section.offset().top
            }, 1000, function(){
                $is_event = true;
                window.location.hash = 'scroll-index-' + $index;

            });
            $('.branches .banner.main-banner.current').removeClass('current');
            section.addClass('current');
        }
        
    };
    if(window.location.hash !== '') {
        scrollToSection($(window.location.hash));
        $(window).on('resize orientationchange', function() {
            scrollToSection($(window.location.hash));
            $('.branches .service-container').slick('resize');
        });
    };
       
    $('.button-service').on('click', function(){
        var caption = $(this).parents('.caption');
        var item    = $(this).parents('.item')
        background_blur = item.data('background-blur');
        if(background_blur) {
            item.css('background-image', "url('"+ background_blur +"')");
        }
        
        caption.find('.inner-container:not(.slick-active)').css('top','unset');
    });


    $('.button-category .country-flag .category-img').on('click', function(){
        $is_event = false;
        var $current = $('.branches .banner.main-banner.current');
        $id = $(this).parent('.country-flag').attr('id');
        if($id) {
            $index = $id.split('scroll-category-')[1];
            sectionToScroll = $('.branches .banner.main-banner#scroll-index-' + $index);
            if(sectionToScroll.length) {
                scrollToSection(sectionToScroll);
            } else {
                $is_event = true;
            }
        }
    });
    $('.button-category .country-flag').on('click', function(){
        $is_event = false;
        var $current = $('.branches .banner.main-banner.current');
        $id = $(this).attr('id');
        if($id) {
            $index = $id.split('scroll-category-')[1];
            sectionToScroll = $('.branches .banner.main-banner#scroll-index-' + $index);
            if(sectionToScroll.length) {
                scrollToSection(sectionToScroll);
            } else {
                $is_event = true;
            }
        }
    });

    $('.inner-container.service .button-service').on('click', function(){
        var caption = $(this).parents('.caption');
        var item    = $(this).parents('.item')
        background = item.data('background');
        if(background) {
            item.css('background-image', "url('"+ background +"')");
        }
        caption.find('.inner-container:not(.slick-active)').css('top','unset');
    });

});    

