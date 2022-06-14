$(function(){
    //dropdown gift items
    $(".dropdown-gift-category .dropdown-gift-category-selection").on('click', '.gift-category-item-selected', function(e) {
        e.preventDefault();
        e.stopPropagation();
        if ($(this).hasClass('dropdown')) {
                $(this).removeClass('dropdown');
                $(this).parents(".dropdown-gift-category-selection").find('.dropdown-gift-category-selection-field').slideUp(250);
        } else {
                $(this).addClass('dropdown');
                $(this).parents(".dropdown-gift-category-selection").find('.dropdown-gift-category-selection-field').slideDown(250);
        }
    });
    $(".dropdown-gift-category .dropdown-gift-category-selection-field").on('click', 'li', function() {
            $('.gift-category-item-selected').removeClass('dropdown').html($(this).text());;
            $(this).parents(".dropdown-gift-category-selection").find('.dropdown-gift-category-selection-field').slideUp(250);
    });
    $(document).click(function(event) {
        if (!$(event.target).is(".mCSB_dragger_bar, .mCSB_draggerRail, .mCSB_draggerContainer, .mCSB_dragger, .mCustomScrollBox")) {
                $('.gift-category-item-selected').removeClass('dropdown');
                $('.dropdown-gift-category-selection-field').slideUp(250);
                $('._selected-text').removeClass('dropdown');
                $('._selection-field').slideUp(250);
        }
    });

    $('.dropdown-gift-category-selection-field li').click(function(){
        $('.gift-category-item-selected').text($(this).text());
        $('.gift-category-item, .dropdown-gift-category-selection-field li').removeClass('hide');
        $(this).addClass('hide');
        changeGiftCategory($(this));
    });
    $('.gift-category .gift-category-item').click(function(){
        $('.gift-category .gift-category-item').removeClass('active');
        $(this).addClass('active');
        changeGiftCategory($(this));
    });
    
    function changeGiftCategory(domCategory) {
        // get id of .gift-list to show
        gift_list_id = domCategory.attr('data-gift-list-id');
        if (gift_list_id.length > 0) {
            $('.news-list-items').addClass('hidden-list');
            $('.news-list-items#' + gift_list_id).removeClass('hidden-list');
			lazyLoad();
        }
    }
	
	var lazyImages = [].slice.call(document.querySelectorAll(".lazy-image"));
	var active = false;

	lazyLoad = function () {
		if (active === false) {
			active = true;

			setTimeout(function () {
				lazyImages.forEach(function (lazyImage) {
					if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
						src = lazyImage.getAttribute('data-src');
						if(src !== '') {
							lazyImage.setAttribute("style", "background-image: url(" + src + ");");
							lazyImage.classList.remove("lazy");

							lazyImages = lazyImages.filter(function (image) {
								return image !== lazyImage;
							});
						}

						if (lazyImages.length === 0) {
							document.removeEventListener("scroll", lazyLoad);
							window.removeEventListener("resize", lazyLoad);
							window.removeEventListener("orientationchange", lazyLoad);
						}
					}
				});

				active = false;
			}, 200);
		}
	};

	lazyLoad();
	document.addEventListener("scroll", lazyLoad);
	window.addEventListener("resize", lazyLoad);
	window.addEventListener("orientationchange", lazyLoad);
});

