(function($){
	

	$(function() {
		lazyfn(".first_list img",$(".index-header"));
		lazyfn(".list-wrap img",$(".sort_page"));
		lazyfn(".first_list img",$(".topic_page"));
		

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

	})

})(jQuery)

//懒加载