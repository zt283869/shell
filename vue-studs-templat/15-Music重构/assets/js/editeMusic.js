$(function(){
//    全选的点击
    $(".selectAll").click(function(){
        $(".selectAll").toggleClass("active");
        if($(this).hasClass("active")){
            $(".menu").addClass("icon-selected").removeClass("icon-fuxuan01");
            $(".footer li").css({"color":"#ff6a6e"})
        }else{
            $(".menu").addClass("icon-fuxuan01").removeClass("icon-selected");
            $(".footer li").css({"color":"#999"})
        }

    })



})