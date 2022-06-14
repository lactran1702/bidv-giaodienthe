// PC login menu
$(function(){
	// Mobile login menu 
	// We can place it in js/script.js from line 22682, because there is same function

	$('.mobile-header').on('click', '.mobile-primary-menu .expand > a', function (e) {
		var ul = $(this).closest(".expand").find(">ul");
		var _text = $(this).find('>a').text();
		if (ul.length) {
			$('.mobile-header').addClass('show-expanded-mobile');
			var submenu = $(this).closest('.menu-expand');
			$('.mobile-back-menu', ul).remove();
			$('.mobile-primary-menu ul,.mobile-primary-menu li').removeClass('current');
			$(this).parents('.menu-expand li').addClass('current');
			$(this).closest("li").removeClass('hide-menu').siblings().addClass('hide-menu');


			ul.addClass('current').prepend('<li class="mobile-back-menu"><a>' + $(this).text() + '</a></li>');
			$('.mobile-primary-menu').css('height', ul.height());
			// back button
			$('.mobile-back-menu').click(function () {
				var level = submenu.attr('data-level') - 1;
				submenu.attr('data-level', level);
				$('.mobile-primary-menu ul').removeClass('current');
				$(this).closest('li.expand').closest('ul').addClass('current').find('li').removeClass('hide-menu');
				$('.mobile-primary-menu').css('height', $('.mobile-primary-menu ul.current').height());
				if (level == 0) {
					$('.mobile-header').removeClass('show-expanded-mobile');
					$('.mobile-primary-menu').css('height', 'auto');
				}
				return false;
			});
			var level = $(this).parents('.menu-expand .expand').length;
			submenu.attr('data-level', level);
			return false;
		}
	});
	$(".mobile-header").on("click", ".mobile-primary-menu .expand > a", function (t) {
		t.stopPropagation();
	});
	
	
	// change height of parent menu when mouse enter 
	$('.has-sub-options').on('mouseenter', function(){
		if($(this).parents('.has-options').length) {
			has_option = $(this).parents('.has-options');
			num_children = $(this).find('.sub-options > ul > li').length;
			if(num_children > 0) {
				li_height = $(this).find('.sub-options > ul > li:first-child').outerHeight();
				current_height = has_option.children('.options').height();
				has_option.children('.options').css('max-height', current_height + li_height * num_children);
				has_option.children('.options').css('height', current_height + li_height * num_children);
				$(this).children('.sub-options').css('max-height', li_height * num_children);
			}
		}
	});
	
	// change height of parent menu when mouse leave 
	$('.has-sub-options').on('mouseleave', function(){
		if($(this).parents('.has-options').length) {
			var has_option = $(this).parents('.has-options');
			num_children = has_option.find('.options > ul > li').length;
			if(num_children > 0) {
				has_option.children('.options').css('max-height', current_height - li_height * num_children);
				li_height = has_option.find('.options > ul > li:first-child').outerHeight();
				has_option.children('.options').css('max-height', li_height * num_children);
				has_option.children('.options').css('height', li_height * num_children);
				$(this).children('.sub-options').css('max-height', '0');
			}
		}
	});
	
	// remove css when leave login parts
	$('.has-options').on('mouseleave', function(){
		$(this).children('.options').css('max-height', '');
		$(this).children('.options').css('height', '');
	});
  
  $('.secondary-menu #secondary-login').click(function(){
		$('.primary-menu li#primary-login.expand').css('display','block');
		$('.primary-menu li#primary-login.expand > a').trigger('click');
	});
	

// Added Part
	var lang = $(".group-languages").find(".language-checked").attr("data-lang");
    if(lang =='vn'){
    	$('.popup-special-days img').attr('src', 'images/popup_vn.gif');
    }else{
    	$('.popup-special-days img').attr('src', 'images/popup_en.gif');
    }

	$('#header:not(".is-sticky.compact") .popup-special-days').show();
	if($('html').scrollTop() <= $(window).height() * 1/2){
		$('.popup-special-days').show(1000);
	}
	if($('#header:not(".is-sticky.compact")').length > 0){
		$('.popup-special-days').show();
	}
	$(window).scroll(function(){
		if($('#header.is-sticky.compact').length > 0) {
			$('.popup-special-days').hide();
		}
		if($('#header.is-sticky.compact').length == 0) {
			$('.popup-special-days').show();
		}
		if($(this).scrollTop() > $(window).height() * 1/2) {
			$('.popup-special-days').hide();
		}

		if($(this).scrollTop() <= $(window).height() * 1/2) {
			$('.popup-special-days').show();
		}
	});
	$('.gif-close').on('click', function() {
		console.log('sss')
		$('.popup-special-days').addClass('hidden');
	})
});
// End Added Part

