$(function() {
	//lazyfn(".first_list img",$(".index-header"));
		lazyfn(".list-wrap img",$(".sort_page"));
//		lazyfn(".first_list img",$(".topic_page"));
		

		function lazyfn(m,n) {
			$(m).each(function() {
				$(this).addClass("lazy").attr("data-original", $(this).attr("src"));
			})
			$("img.lazy").lazyload({
				effect: "fadeIn",
				container: n,
				threshold: 1
			})
		}
	
	
				scrollTop();
				listClick();
			s();
				$('.footer_nav a li').click(function() {
					
					n = $(this).index();
					console.log(n)
					active();
				})
				
				function active() {
					$('.nav_list').eq(n).addClass('active').end().not($('.nav_list').eq(n)).removeClass('active');
					$('.nav_list').eq(n).siblings().css({'color':'#FF5722'})
					$('.nav_list').not($('.nav_list').eq(n)).siblings().css({'color':'#999'})
				}
				function scrollTop() {
					$(".sort_page").scroll(function() {
						var top = $(this).scrollTop();
						var h = $('.header').height();
						if(top > h) {
							$('.list-navbar').addClass('fixed');
						} else {
							$('.list-navbar').removeClass('fixed');
						}

					})
				}

				function listClick() {
					$('.list-wrap .list-wrap_1').each(function(index, item) {

						$(item).attr('data-top', $(this).position().top);

					})
					$('.list-navbar .navbar li').each(function(index, item) {

						$(item).attr('data-left', $(this).position().left);																		
					})																									
					$('.list-navbar .navbar li').click(function() {

						var n1 = $(this).index();
						$(this).addClass('active').siblings().removeClass('active');

						var t = $('.list-wrap .list-wrap_1').eq(n1).attr('data-top');

						$(".sort_page").animate({
							scrollTop: t
						});

					});					
				}
																	
				function s() {									
					$(".sort_page").scroll(function() {							
						var $t = $(this).scrollTop();
						var $index = null; 
						//console.log( $t);
						var $obj = $(".list-wrap .list-wrap_1");
						$obj.each(function() {
							$index = $(this).index();
							//console.log($index);
							var $height = $obj.eq($index).attr('data-top');
							if($t <= $height) {
								$(".list-navbar .navbar li").eq($index).addClass("active").siblings().removeClass("active");
								var s1 = $(".list-navbar .navbar li").eq($index).attr('data-left');
								console.log("s="+(s1));
								$(".list-navbar").scrollLeft(s1);
									
																				
																	
								return false;
							}													
							
						});	
						
					})						
				}	
			})