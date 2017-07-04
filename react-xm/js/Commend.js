$(function(){
	$('.foot_ul').on("touchend",'a',function(){
			$(this).siblings().find('li').find('i,span').removeClass('active');
			$(this).find('li').find('i,span').addClass('active');
	})
	$('.butzteClick').on("touchend",function(){
		console.log("a");
		$(".aslid_zce").css("display","block");
		$(".aslid_zce").stop(false).animate({"left":"0"},1000)
	})
	$(".span_none").on("touchend",function(){
		$(".aslid_zce").stop(false).animate({"left":"-100%"},1000,function(){		
			$(".aslid_zce").css("display","none");
		})
	})
	$(".butzte").on("touchend",function(){
		$(".aslid_zce").css("display","none");
		$(".aslid_zce").stop(false).animate({"left":"-100%"})
	})
	
	
	/*****************/
	$(".baner ul").on("touchend","li",function(){
		$(this).siblings().removeClass("baractive");
		$(this).addClass("baractive");
	})

})
