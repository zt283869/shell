angular.module("com.xm.xiaomi.directives", [])
	
	//index组件
	.directive("footerTpl", function() {
		return {
			templateUrl: "templates/footer-tpl.html",
			restrict: "AE",
			link: function(scope, element, attr) {
				$('.footer_nav a').on("click", function() {
					var n = $(this).index();
					console.log(n)
					active(n);
				})

				function active(n) {
					$('.nav_list').eq(n).addClass('active').end().not($('.nav_list').eq(n)).removeClass('active');
					$('.nav_list').eq(n).siblings().css({
						'color': '#FF5722'
					})
					$('.nav_list').not($('.nav_list').eq(n)).siblings().css({
						'color': '#999'
					})
				}
			}
		}
	})
	.directive("headerTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/header-tpl.html",
			link: function(scope, element, attr) {
				var opacity = null;
				scroll();
				function scroll() {
					$(window).scroll(function() {

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
							$('.topic_page #logo_1').attr('src', "imgs/topic/icon_back_n.png");
							$('.topic_page #imgs_1').attr('src', "imgs/topic/cart_ae7d5a3.png");
							$('.topic_page .search_bar').css('border', '1px solid rgb(227, 227, 227)');
						} else {
							$('.topic_page #logo_1').attr('src', "imgs/topic/back2_085f04b.png");
							$('.topic_page #imgs_1').attr('src', "imgs/topic/cart_white_35b9dc4.png");
							$('.topic_page .search_bar').css('border', 'none');
						}
						//						console.log("2="+opacity)
						var o1 = 'rgba(229, 131, 53, ' + opacity + ')';
						var o = 'rgba(255,255,255, ' + opacity + ')';
						//						console.log("o="+o)
						$('.index-header .header').css("backgroundColor", o1);
						$('.topic_page .header').css("backgroundColor", o);
					})
				}
			}
		}
	})
	.directive("swiperpicTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/swiperpic-tpl.html",
			link: function(scope, element, attr) {
				var mySwiper = new Swiper('.swiper-container', {
					loop: true,
					speed: 600,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					pagination: ".swiper-pagination",
				})
			}
		}
	})
	.directive("firstList", function() {
		return {
			restrict: "AE",
			template: '<div class="first_list"><div ng-transclude></div>',
			replace: false,
			transclude: true,
		}
	})

	.directive("smallnewsTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/smallnews-tpl.html",
		
		}
	})
	.directive("topicTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/topic-tpl.html",

		}
	})
	.directive("indexlistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/index_list-tpl.html",
		}
	})
	.directive("foottopTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/foottop_tpl.html",
		}
	})
	.directive("topTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/topTo-tpl.html",
			link: function(scope, element, attr, ctrl) {
				$('.topTo').click(function() {
					topTo();
				})

				function topTo() {
					$(window).scrollTop(0)
				}
			}
		}
	})

	//sort
	.directive("header1Tpl", function() {
		return {
			scope: {
				text: '@'
			},
			restrict: 'AE',
			templateUrl: "templates/header_1-tpl.html"

		}
	})
	.directive("sortlistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/sort_list-tpl.html",
			link: function(scope, element, attr) {
				scrollTop();
				listClick();
				s();

				function scrollTop() {
					$(window).scroll(function() {
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
					$('.list-navbar .navbar li').each(function(index, item) {

						$(item).attr('data-left', $(this).position().left);
					})
					$('.list-navbar .navbar li').click(function() {

						var n1 = $(this).index();
						//console.log('n1=' + n1)
						$(this).addClass('active').siblings().removeClass('active');

						var t = $('.list-wrap .list-wrap_1').eq(n1).offset().top;

						$(window).scrollTop(t);

					});
				}

				function s() {
					//console.log(1);
					$(window).scroll(function() {
						//console.log(2);
						var $t = $(this).scrollTop();
						//console.log('$t=' + $t);
						var $index = null;
						//console.log( $t);
						var $obj = $(".list-wrap .list-wrap_1");
						$obj.each(function() {
							$index = $(this).index();
							//console.log($index);
							//							var $height = $obj.eq($index).attr('data-top');
							var $height = $obj.eq($index).offset().top;
							//console.log("$height=" + $height);
							if($t <= $height) {
								$(".list-navbar .navbar li").eq($index).addClass("active").siblings().removeClass("active");
								var s1 = $(".list-navbar .navbar li").eq($index).attr('data-left');
								//console.log("s=" + (s1));
								$(".list-navbar").scrollLeft(s1);

								return false;
							}

						});

					})
				}
			}
		}
	})

	//cart
	.directive("gologinTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/gologin-tpl.html",
		}
	})
	.directive("nullcartTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/nullcart-tpl.html",
		}
	})
	.directive("cartlistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/cart_list-tpl.html",
		}
	})

	//my
	.directive("myheaderTpl", function() {
		return {
			
			restrict: "AE",
			templateUrl: "templates/my_header-tpl.html",
			link: function(scope, element, attr, ctrl) {
				$.post("/mys", function(username) {
				console.log(username);
				//console.log(goods.img);
				if(!username) {
					$("#name").html('<a href="#/login">登录/</a><a href="#/register">注册</a>');
				} else {
					$("#name").html('<span style="font-size: 0.12rem;">' + username + '</span>' + '<a id="logouts" href="#/login">注销</a>');
				}
			})
			//注销
			$('#name').on("click","#logouts",function(){
				
				console.log(1);
				$.post("/logouts", function(data) {
					console.log(data);
					if(data.indexOf("0") > -1) {
						console.log('注销成功');
					} else {
						console.log('注销失败');
					}

				})
			})
		}
		}
	})
	.directive("orderTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/order-tpl.html",
		}
	})
	.directive("mylistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/my_list-tpl.html",
		}
	})
	//list
	.directive("listlistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/list_list-tpl.html",
		}
	})

	//detail
	.directive("detailheaderTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/detail_header-tpl.html",
		}
	})
	.directive("detailfoodTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/detail_food-tpl.html",
		}
	})
	.directive("detaillistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/detail_list-tpl.html",
		}
	})
	.directive("detailfooterTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/detail_footer-tpl.html",
		}
	})
	.directive("shareTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/share-tpl.html",
			link: function(scope, element, attr, ctrl) {

			}
		}
	})

	//search
	.directive("searchTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/search-tpl.html",
		}
	})
	.directive("searchhotTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/search_hot-tpl.html",
		}
	})

	//login
	.directive("loginTpl", function() {
		return {
			scope: {
				l: '@',
				l2: '@',
				go: "&",
				b: "&",
				p: "&"
			},
			restrict: 'AE',
			templateUrl: "templates/login-tpl.html",
		}
	})
	.directive("logintypeTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/login_type-tpl.html",
		}
	})
	.directive("loginregisterTpl", function() {
		return {
			scope: {
				l3: '@',
			},
			restrict: 'AE',
			templateUrl: "templates/login_register-tpl.html",
		}
	})
	.directive("loginfootTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/login_foot-tpl.html",
		}
	})
	.directive("codeloginTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/codelogin-tpl.html"
		}
	})
	.directive("topicheaderTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/topic_header-tpl.html",
			link: function(scope, element, attr, ctrl) {
				var mySwiper1 = new Swiper('.swiper-container', {
					loop: true,
					speed: 600,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					pagination: ".swiper-pagination",
				})
			}
		}
	})
	.directive("topiclistTpl", function() {
		return {
			restrict: "AE",
			templateUrl: "templates/topic_list-tpl.html",

		}
	})