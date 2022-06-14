$(function(){
    $(".dropdown-history .dropdown-history-selection").on('click', '.history-item-selected', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass('dropdown')) {
                $(this).removeClass('dropdown');
                $(this).parents(".dropdown-history-selection").find('.dropdown-history-selection-field').slideUp(250);
        } else {
                $(this).addClass('dropdown');
                $(this).parents(".dropdown-history-selection").find('.dropdown-history-selection-field').slideDown(250);
        }
    });
    $(".dropdown-history .dropdown-history-selection-field").on('click', 'li', function() {
            $('.history-item-selected').removeClass('dropdown').html($(this).text());;
            $(this).parents(".dropdown-history-selection").find('.dropdown-history-selection-field').slideUp(250);
    });
    
    $('.dropdown-history-selection-field li, .history-tabs li.history-tab').click(function(){
        history_list_id = $(this).attr('data-history-id');
        if (history_list_id.length > 0) {
            $('.history-item-selected').text($(this).text());
            $('.history-headers ul li').removeClass('active');
            $(".history-headers ul").find("[data-history-id='" + history_list_id + "']").addClass('active');
            $('.history-tree').addClass('hidden-list');
            $('.history-tree#' + history_list_id).removeClass('hidden-list');
        }
    });
    
    var changeBanner = function(){
        if($(window).width() < 440){
            $(".bidv-about-awards .banner .item").each(function() {
                var banner_mobile = $(this).data("banner-mobile");
                if(banner_mobile !== ""){
                    parent_banner = $(this).parent(".banner.default-banner");
                    parent_banner.removeClass('default-banner');
                    parent_banner.addClass('main-banner');
                    $(this).css('background-image',"url("+banner_mobile+")");
                    $(this).addClass("banner-mobile");
                }
            });
        } else {
            $(".bidv-about-awards .banner .item").each(function() {
                var banner_desktop = $(this).data("banner-desktop");
                if(banner_desktop !== ""){
                    parent_banner = $(this).parent(".banner.main-banner");
                    parent_banner.removeClass('main-banner');
                    parent_banner.addClass('default-banner');
                    $(this).css('background-image',"url("+banner_desktop+")");
                    $(this).removeClass("banner-mobile");
                }
            });
        }
    };
    changeBanner();
    $(window).on('resize orientationchange', function() {
        changeBanner();
    });
});

