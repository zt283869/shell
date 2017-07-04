$(function() {

	lazyfn(".first_list img", $(".index-header"));	

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
	var mySwiper = new Swiper('.swiper-container', {
		loop: true,
		speed: 600,
		autoplay: 3000,
		autoplayDisableOnInteraction: false,
		pagination: ".swiper-pagination",
	})

	$.post("/indexs", function(username) {
		console.log(username);
		//console.log(goods.img);
		if(!username) {
			$("#login_1").show();
			$('#imgs_1').hide();
		} else {
			$("#login_1").hide();
			$('#imgs_1').show();
		}
	})

	var i = 0;
	var n = null;
	var opacity = null;
	scroll();
	
	var timer = null;
	timer = setInterval(show, 2000);
	function show() {
		i++;
		if(i > 2) {
			i = 0;
		}
		console.log(i)
		$('.sc_title li').eq(i).show().siblings().hide();
	}

	$('.topTo').click(function() {
		topTo();
	})

	function topTo() {
		$(".index-header ").animate({
			scrollTop: 0
		})
	}
	$('.footer_nav a').find('li').click(function() {

		n = $(this).index();
		console.log(n)
		active();
	})



	function scroll() {
		$(".index-header ").scroll(function() {

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
			}
			//						console.log("2="+opacity)
			var o = 'rgba(229, 131, 53, ' + opacity + ')';
			//						console.log("o="+o)
			$('.header').css("backgroundColor", o);
		})
	}

	function active() {
		$('.nav_list').eq(n).addClass('active').end().not($('.nav_list').eq(n)).removeClass('active');
		$('.nav_list').eq(n).siblings().css({
			'color': '#FF5722'
		})
		$('.nav_list').not($('.nav_list').eq(n)).siblings().css({
			'color': '#999'
		})
	}

})