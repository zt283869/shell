$(function() {

	lazyfn(".first_list img", $(".topic_page"));

	function lazyfn(m, n) {
		$(m).each(function() {
			$(this).addClass("lazy").attr("data-original", $(this).attr("src"));
		})
		$("img.lazy").lazyload({
			effect: "fadeIn",
			container: n,
			threshold: 1
		})
	}
	//banner轮播图
	var mySwiper1 = new Swiper('.swiper-container', {
		loop: true,
		speed: 600,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		pagination: ".swiper-pagination",
	})

	var opacity = null;
	$('.topTo').click(function() {
		topTo();
	})

	function topTo() {
		$(".topic_page").animate({
			scrollTop: 0
		})
	}
	scroll2();

	function scroll2() {
		$(".topic_page ").scroll(function() {

			var top = $(this).scrollTop();
			if(top > 100) {
				$('.topTo').fadeIn();
			} else {
				$('.topTo').fadeOut();
			}
			//						console.log("top="+top)
			opacity = top / 250;
			//						console.log("1="+opacity)
			if(top > 250) {
				opacity = 1;
				$('#logo_1').attr('src', "imgs/topic/icon_back_n.png");
				$('#imgs_1').attr('src', "imgs/topic/cart_ae7d5a3.png");
				$('.search_bar').css('border', '1px solid rgb(227, 227, 227)');
			} else {
				$('#logo_1').attr('src', "imgs/topic/back2_085f04b.png");
				$('#imgs_1').attr('src', "imgs/topic/cart_white_35b9dc4.png");
				$('.search_bar').css('border', 'none');
			}
			//						console.log("2="+opacity)
			var o = 'rgba(255,255,255, ' + opacity + ')';
			//						console.log("o="+o)
			$('.header').css("backgroundColor", o);
		})
	}

})