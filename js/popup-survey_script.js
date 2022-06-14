$(function(){
    setTimeout(function() {
        $('.popup-bottom').addClass('in');
    }, 10000);
    setTimeout(function() {
        $('.popup-bottom:not(.keep)').removeClass('in');
    }, 40000);
    $('.popup-bottom').on('mouseover touchmove touchstart', function(){
        $('.popup-bottom').addClass('keep');
    });
    $('.popup-bottom .close').on('click', function(){
        $('.popup-bottom').removeClass('in');
    });
});

