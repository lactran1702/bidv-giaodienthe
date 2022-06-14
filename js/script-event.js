$(document).ready(function() { 
    var lang = $(".group-languages").find(".language-checked").attr("data-lang");
    if(lang =='vn'){
      	$('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/');
    }else{
      	$('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/index_en.html');
    }
    var myEventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
    var myEventListener = window[myEventMethod];
    var myEventMessage = myEventMethod == "attachEvent" ? "onmessage" : "message";
    myEventListener(myEventMessage, function (e) {
        var ipccFrame = document.getElementById('ipccFrame');
        if(e.data == 1) {
             if($(window).width() > 768){
             	document.getElementById('ipccFrame').style.width = "541px";
                document.getElementById('ipccFrame').style.height = "523px";
             }else{
             	document.getElementById('ipccFrame').style.width = "315px"
                document.getElementById('ipccFrame').style.height = "417px";
             }   
        } else {
                document.getElementById('ipccFrame').style.width = "72px";
                document.getElementById('ipccFrame').style.height = "72px";
       }
    }, false);
    function errPopup(note){
    	var html = "<div class='modal-container'>"+
            		"<div class='modal-thumb'><img src='/wps/wcm/connect/ea384c06-d8b1-42af-a6b4-96337bb9b779/icn-warning.svg?MOD=AJPERES&cache=none' alt=''></div>"+
            		"<div class='text-center'>"+
              		"<p>"+note+"</p>"+
              		"<div class='btn-group'>"+
        			"<a href='javascript:void(0);' title='Ok' class='btn btn-white' close-modal>Ok</a>"+
              		"</div></div></div>";
        $(".popup-modal").html(html);
        $(".popup-modal").removeClass("hidden");
    }
    $(document).on('click','.btn[close-modal]', function(){
      $('.popup-modal').addClass('hidden');
    });
	//fix so luong tin thong báo
    function numberNotifi(){
    	if($(".bidv-notifi").length){
        	var list = $(".bidv-notifi").find("li");
            for(var i=0; i<list.length; i++){
            	if(i>3){
                	$(list[i]).css("display","none");
                }
            }
        }
    }
    numberNotifi();
    //doi vi tri ban lanh dao
    $(".normal-member").on('click', '.thumbnail', function(){
        var parent_class = $(this).closest(".members");
    	var name_top = $(parent_class).find(".top-member .title-2").html();
    	var position_top = $(parent_class).find(".top-member .position").html();
    	var description_top = $(parent_class).find(".top-member .description").html();
    	var avatar_top = $(parent_class).find(".top-member img").attr("src");

		var par = $(this).closest(".item-member");
    	var name_normal = $(par).find(".title-2").html();
    	var position_normal = $(par).find(".position").html();
    	var description_normal = $(par).find(".description").html();
    	var avatar_normal = $(par).find("img").attr("src");

		$(parent_class).find(".top-member .title-2").html(name_normal);
		$(parent_class).find(".top-member .position").html(position_normal);
		$(parent_class).find(".top-member .description").html(description_normal);
		$(parent_class).find(".top-member img").attr("src", avatar_normal);

    	$(par).find(".title-2").html(name_top);
    	$(par).find(".position").html(position_top);
    	$(par).find(".description").html(description_top);
    	$(par).find("img").attr("src", avatar_top);
		
		var posTop = $('.default-banner').offset().top + $('.default-banner').outerHeight();
        if($(window).width() >767){
        	$('html, body').animate({scrollTop: posTop-50}, 500);
        }else{
        	$('html, body').animate({scrollTop: posTop-70}, 500);
        }
    });
    //advertisement in bidv
    $(".adv").on('click', '.close-adv', function() {
        $(this).parent().html("");
        $(this).parent().css("display","none");
    });

    function setTimeClose() {
        if ($(".advertisement").length) {
            $(".advertisement").each(function() {
                var setTime = $(this).attr("data-close");
                var name = $(this).attr("data-name");
                if (setTime != "") {
                    var time = Number(setTime) * 1000;
                    setTimeout(function() {
                        $('.advertisement[data-name="' + name + '"]').html("");
                        $('.advertisement[data-name="' + name + '"]').css("display","none");
                    }, time);
                }
            });
        }
        if ($(".advertisement-video").length) {
            $(".advertisement-video").each(function() {
                var setTime = $(this).attr("data-close");
                var name = $(this).attr("data-name");
                if (setTime != "") {
                    var time = Number(setTime) * 1000;
                    setTimeout(function() {
                        $('.advertisement-video[data-name="' + name + '"]').html("");
                        $('.advertisement-video[data-name="' + name + '"]').css('display', 'none');
                    }, time);
                }
            });
        }
    }
    setTimeClose();
    $(".advertisement").each(function() {
       var time = $(this).attr("data-time");
       time = time * 1000;
       var slides = $(this).find(".mySlides");
       if(slides.length>0){
          setInterval(function(){showSlides(slides)},time);  
       }else{
          $(this).css("display","none");
       }
    }); 
    function showSlides(slides) {
      for (var i = 0; i < slides.length; i++) {
        if($(slides[i]).css("display") == "block" ){
          var index = i;
        }
        slides[i].style.display = "none";  
      }
      if(index == (slides.length-1)){
        slideIndex=0;
      }else{
        slideIndex=index + 1;
      }
      if(slides[slideIndex] != undefined){
      	slides[slideIndex].style.display = "block"; 
      }
    }
    //set template cart-detail premier
    function setCard() {
        if ($(".card-primier").length) {
            var name_card = $(".card-primier").find(".title-1").text();
            if (name_card.trim() == "Thẻ BIDV Visa Infinite" || name_card.trim() == "BIDV Visa Infinite") {
                $("body").addClass("bidv-cards-detail--premier");
            }
        }
    }
    setCard();
    //cut line title page
    function cutLine(e){
       var text = $(e).text();
        if(text.indexOf(" /n ") != -1){
          texts = text.split("/n");
          var title = '';
          for(var i=0; i<texts.length; i++){
            title += texts[i] + "<br/>";
          }
        }
        $(e).html(title); 
    }
    $( ".title-1, .title-2, .position").each(function() {
        cutLine(this);
    });
   
    // move "/ n" about empty space
    function cutLineEmpty(d){
       var text = $(d).text();
        if(text.indexOf(" /n ") != -1){
          texts = text.split("/n");
          var title = '';
          for(var i=0; i<texts.length; i++){
            title += texts[i] 
          }
        }
        $(d).html(title);  
        $(d).attr('title', title);
    }
    //$( ".text-medium, .download-filename,.recent-news__block dd, a, p" ).each(function() {
	$( ".text-medium, .download-filename,.recent-news__block newline, p, a" ).each(function() {
		if(this.className === "clearfix"){
			return;
		}
		
      	cutLineEmpty(this);
    });
  
    //event search key meta tag
    $(document).on('click', '.meta', function(){
        var lang = $(".group-languages").find(".language-checked").attr("data-lang");
        var key = $(this).text();
        var contentId = $(this).parent().attr("data-id");
        var url = "/ServicesBIDV/MetaTagSearchServlet?meta_tag="+key+"&content_id="+contentId;
        $.getJSON(url).done(function(data) {
            if(lang == 'vn'){
            	var note = "Bài viết liên quan";
            }else{
            	var note = "Related posts";
            }
            if(data.length > 0){
            	var html = "<div class='modal-container'>"+
                           "<div class='post-tag'>"+
						   "<div class='close-tag' title='Close'>"+note+"</div>"+
	                       "<div class='main-tag'>";
                for(var i=0; i < data.length; i++){
                   if(data[i].avatar_link != null){
                   		var avatar = data[i].avatar_link;
                   }else{
                   		var avatar = "";
                   }
                   html += "<a href='"+data[i].detail_link+"'>"+
                          "<div class='tag-item'>"+
                          "<div class='avatar'><img src='"+avatar+"' /></div>"+
                          "<div class='note'>"+
                          "<span class='pl-date'>"+data[i].publish_date+"</span>"+
                          "<div class='title'>"+data[i].title+"</div>"+
                          "<div class='discription'>"+data[i].description+"</div>"+
                          "</div></div></a>";
                }
                html += "</div></div></div>";
                $("body").append("<div class='modal popup-modal modal-tag'>"+ html +"</div>");
            }else{
                if (lang == "vn") {
                   errPopup("Không có bài viết cùng thẻ tag!");
                   //alert("Không có bài viết cùng thẻ tag!");
                } else if (lang == "en") {
                    errPopup("No posts with the tag!");
                    //alert("No posts with the tag!");
                }
            }
        });
    });
     $(document).on('click', '.close-tag', function(){
     	$(".modal-tag").css("display","none");
     });
     $(document).click(function(event) {
     	$(".modal-tag").css("display","none");
     });
    //set title page detail
    function setTitlePage(){
    	var titlePage =  $(".f-breadcrumbs").find("li > a").last().text();
		titlePage = titlePage.replace(/\/n /g,"");
		$("title").text(titlePage);
		$("meta[property='og:title']").attr('content', titlePage);
        if(titlePage == "Chi tiết" || titlePage == "Chi Tiết" ||titlePage == "Detail"){
            var title = $(".banner").find(".title-1").text();
			title = title.replace(/\/n /g," ");
        	$("title").text(title);
			$("meta[property='og:title']").attr('content', title);
            $(".f-breadcrumbs").find("li > a").last().attr("title", title);
            if(title.length > 70){
            	title = title.slice(0, 50) + "...";
            }
            $(".f-breadcrumbs").find("li > a").last().text(title);
            
        }  
    }
    setTitlePage();
    //load comment facebook
    function meta_tag() {
        if ($(".meta-tag").length) {
            var tags = $(".tags").text();
            var tag = tags.split(",");
            var html = "<span class='metaTag'>Tags:</span>"
            for (var i = 0; i < tag.length; i++) {
              html += "<span class='meta'>" + tag[i] + "</span>";
            }
            $(".meta-tag").html(html);
        }
    }
	meta_tag();
    //fix video youtube in ckediter
    function videoYoutube() {
      /*if ($(".youtube-embed").length && $(window).width() == 1349) {
                  var height = $(".youtube-embed").find("iframe").attr("height");
                  var width = $(".youtube-embed").find("iframe").attr("width");
                  var yt = document.getElementsByClassName("youtube-embed");
                  for (var i = 0; i < yt.length; i++) {
                      if ($(".youtube-embed:eq(" + i + ")").html() != "&nbsp;") {
                          $(".youtube-embed:eq(" + i + ")").css("height", height);
                          $(".youtube-embed:eq(" + i + ")").css("width", width);
                      }
                  }
              }*/
    }
    videoYoutube();
    function getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    };
    function checkContact(){
      var chat = getUrlParameter('chat');
      if(chat == "open"){
      	var lang = $(".group-languages").find(".language-checked").attr("data-lang");
        if(lang =='vn'){
            $('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/?open=true');
        }else{
            $('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/index_en.html?open=true');
        }
        if($(window).width() > 540){
          document.getElementById('ipccFrame').style.width = "541px";
          document.getElementById('ipccFrame').style.height = "523px";
        }else{
          document.getElementById('ipccFrame').style.width = "315px"
          document.getElementById('ipccFrame').style.height = "417px";
        } 
      }
    }
    checkContact();
    $('#support-tab>.filter-panel>div').click(function(event) {
      var posTop = $('#support-tab').offset().top + $('#support-tab').outerHeight();
      if($('.anchor-link').length){
        $('html, body').animate({scrollTop: posTop-70}, 500);
      }else{
      	$('html, body').animate({scrollTop: posTop-20}, 500);
      }
      if($(this).hasClass('chat-open')){
      	var lang = $(".group-languages").find(".language-checked").attr("data-lang");
        if(lang =='vn'){
            $('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/?open=true');
			
        }else{
            $('#ipccFrame').attr('src', 'https://ebank.bidv.com.vn:9445/webchat/index_en.html?open=true');
        }
        if($(window).width() > 540){
          document.getElementById('ipccFrame').style.width = "541px";
          document.getElementById('ipccFrame').style.height = "523px";
        }else{
          document.getElementById('ipccFrame').style.width = "315px"
          document.getElementById('ipccFrame').style.height = "417px";
        } 
      }
    });
    /*history about BIDV*/
    $(".section-group .caption").each(function() {
        var lang = $(".group-languages").find(".language-checked").attr("data-lang");
        if(lang =='vn'){
        	var html = "<span class='full-content'> ...<a class='full-history'>Xem chi tiết</a></span>";
        }else{
        	var html = "<span class='full-content'> ...<a class='full-history'>See more</a></span>";
        }
        if($(this).find("p").first().text().length < 100){
            if($(this).find("p").length > 2){
            	$(this).find("p:nth-child(2)").append(html);
                var lang = $(".group-languages").find(".language-checked").attr("data-lang");
                if(lang == "vn"){
                	var html = "<p class='close-history'>Thu gọn</p>";
                }else{
                	var html = "<p class='close-history'>See less</p>"
                }
                $(this).append(html);
                $(this).find("p:not(:first)").css("display","none");
                $(this).find("p:nth-child(2)").css("display","block");
            }
        }
        else{
        	$(this).find("p").first().append(html);
            if(lang == "vn"){
              $(this).append("<p class='close-history'>Thu gọn</p>");
            }else{
              $(this).append("<p class='close-history'>See less</p>");
            }
            $(this).find("p:not(:first)").css("display","none").addClass('hiden-his');
        }
    }); 
    $(document).on('click', '.full-history', function() {
      	$(this).closest(".caption").find("p").css("display","block");
        $(this).closest(".full-content").css("display","none"); 
    });
    $(document).on('click', '.close-history', function() {
        var cap = $(this).closest(".caption");
        if($(cap).find("p").first().text().length < 100){
            if($(cap).find("p").length > 2){
                $(cap).find("p:not(:first)").css("display","none");
                $(cap).find("p:nth-child(2)").css("display","block");
            }
        }
        else{
            $(cap).find("p:not(:first)").css("display","none");
        }
        $(this).closest(".caption").find(".full-content").css("display","inline-block"); 
    });
	//**********************
	$("#credit-ratings .section-download-list").each(function() {
        var lang = $(".group-languages").find(".language-checked").attr("data-lang");
        if(lang =='vn'){
        	var html = "<span class='full-content'><a class='full-cre'>Xem thêm</a></span>";
        }else{
        	var html = "<span class='full-content'><a class='full-cre'>See more</a></span>";
        }
        if($(this).find("li").length > 5){
			$(this).find("li:nth-child(5)").append(html);
			var lang = $(".group-languages").find(".language-checked").attr("data-lang");
			if(lang == "vn"){
				var html = "<p class='close-cre' style='display:none;'>Thu gọn</p>";
			}else{
				var html = "<p class='close-cre' style='display:none;>See less</p>"
			}
			$(this).append(html);
			$(this).find("li:not(:first)").css("display","none");
			$(this).find("li:nth-child(2)").css("display","block");
			$(this).find("li:nth-child(3)").css("display","block");
			$(this).find("li:nth-child(4)").css("display","block");
			$(this).find("li:nth-child(5)").css("display","block");
        }
    }); 
    $(document).on('click', '.full-cre', function() {
      	$(this).closest(".section-download-list").find("li").css("display","block");
        $(this).closest(".full-content").css("display","none");
        $(this).closest(".section-download-list").find(".close-cre").css("display","block"); 
    });
    $(document).on('click', '.close-cre', function() {
        var cap = $(this).closest(".section-download-list");
        if($(cap).find("li").length > 5){
            $(cap).find("li:not(:first)").css("display","none");
            $(cap).find("li:nth-child(2)").css("display","block");
			$(cap).find("li:nth-child(3)").css("display","block");
			$(cap).find("li:nth-child(4)").css("display","block");
			$(cap).find("li:nth-child(5)").css("display","block");
        }
        $(this).closest(".section-download-list").find(".full-content").css("display","block"); 
        $(this).closest(".section-download-list").find(".close-cre").css("display","none"); 
    });
    //event open first tab in product-detai
    $('.accordion-wrap').each(function(){
    	var acc_block = $(this).find('.accordion-block').first();
        var title = $(acc_block).find('._title');
        if(!$(title).hasClass('dropdown')){
          $(title).addClass('dropdown');
          $(title).closest('.accordion-block').find('.accordion-hidden-content').stop().slideDown();
        }
    });
	if($('.data-info-bidv').length){
        $(".num").each(function() {
            $(this).html('0');
        });
        $(window).scroll(function() {
            if($('.data-info-bidv').length){
            	if ($(window).scrollTop() >= $('.data-info-bidv').offset().top-70) {
                   $('#bidv-brand-info').removeClass('data-info-bidv');
                   $(".num").each(function() {
                      $(this).data('count', parseInt($(this).attr('data-num').replace(/\./g,'').replace(/\,/g,''), 10));
                      count($(this))
                   });
                }
            }
        });
		function count($this) {
            var num = parseInt($this.attr('data-num').replace(/\./g,'').replace(/\,/g,''));
            /*if(10000< num){var s = 0.000000000001
            }else if(num <10){var s = 500
            }else{var s = 50}*/
            if(num > 40000){var s = 1; var c = 90;
            }else if(20000 < num && num <= 40000){var s = 5; var c = 45;
            }else if(10000 < num && num <= 20000){var s = 5; var c = 25;
            }else if(800 < num && num<=10000){var s = 50; var c = 10;
            }else if(10 < num && num<=800){var s = 50; var c = 5;
            }else{var s = 500; var c = 1;}
            var lang = $(".group-languages").find(".language-checked").attr("data-lang");
			var current = parseInt($this.html().replace(/\./g,'').replace(/\,/g,''), 10);
          
			current = current + c;
            ++current
            if(lang == "vn"){
                $this.html(current.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
            }else{
                $this.html(current.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
            }
			if (current > $this.data('count')) {
                if(lang == "vn"){
                    $this.html($this.data('count').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1."));
                }else{
                    $this.html($this.data('count').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
                }
			} else {
				setTimeout(function() {
					count($this)
				}, s ) // Tốc độ đếm số, số 1 là nhanh nhất
			}
		}
	} 
    if($(window).width() >= 650 && $(window).width() < 1140){
        $(".card-info__slider").each(function() {
            if($(this).find('.item-slider').length == 3){
                $(this).find('.item-slider').removeClass('slick-current slick-center');
                $(this).find('.item-slider:eq(1)').addClass('slick-current slick-center');
            }
        });
    }
    if($('.bidv-notifi').length){
    	$(".bidv-notifi").each(function() {
            if($(this).find('li').length == 0){
               $(this).closest('.wrapper').css('display','none');
               if($(".anchor-url-list").length){
                 var _id = $(this).closest('.wrapper').attr("id");
                 $(".anchor-url-list").find('a[data-anchor-link = '+_id+']').parent().css('display','none');
               }
            }
        });
    }
    
	

	/*if($('.slick-track').length){
    	$(".slick-track").each(function() {
            if($(this).find('.slick-slide').length == 0){
               $(this).closest('div[data-anchor = has-anchor]').css('display','none');
               if($(".anchor-url-list").length){
                 var _id = $(this).closest('div[data-anchor = has-anchor]').attr("id");
                 $(".anchor-url-list").find('a[data-anchor-link = '+_id+']').parent().css('display','none');
               }
            }
        });
    }*/
    // ẩn slide khuyến mại
    $(window).on("load", function() {
        if($('.slider-one-way').length){
            $(".slider-one-way").each(function() {
                if($(this).find('.col').length == 0){
                   $(this).closest('.wrapper').find('div').css('display','none');
                   if($(".anchor-url-list").length){
                      var _id = $(this).closest('.wrapper').attr("id");
                      $(".anchor-url-list").find('a[data-anchor-link = '+_id+']').parent().css('display','none');
                   }
                }
            });
        }
    });
    if($('.recent-news__block').length){
    	$(".recent-news__block").each(function() {
            if($(this).find('dl').length == 0){
               $(this).parent().remove();
            }
        });
    }
  	$(".anchor-url-list li").each(function() {
       var _id = $(this).find("a").attr("data-anchor-link");
       if(!$("#"+_id).length){
       	   $(this).css('display','none');
       }
    });
    $(".page-navigation").each(function() {
      var count = $(this).find("a");
      if($(count).length == 1){
        $(this).css("display","none");
      }
    });
    if($('.filter-list').hasClass('slick-slider')){
        var _height = $('.filter-list').height();
        $('.filter-list').find('li').css('height', _height);
    }
    
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
});