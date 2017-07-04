
$(function(){
//    swiper实现轮播图
//    mySwiper.activeIndex
    //返回当前活动块的索引。loop模式下注意该值会被加上复制的slide数。
    var swiper = new Swiper(".content",{
        onSlideChangeEnd:function(){
            $("nav li").eq(swiper.activeIndex).addClass("active").siblings().removeClass("active");
        },
        onTouchMove:function(){
            if(swiper.activeIndex==0){
                if(swiper.touches.diff>100){
                    $(".sideSlide").stop().animate({"left":0});
                    $(".mark").show();
                }
            }
        }
    });
    //菜单点击侧栏滑出
    $(".slide").click(function(){
        $(".sideSlide").stop().animate({"left":0});
        $(".mark").show();
    });
    var swiper1 = new Swiper(".con",{
        loop:true,
        autoplay:2000,
        nested:true, //选择内部swiper时，阻止外部运行
        pagination:".swiper-pagination"
    })
//    下拉刷新、上拉加载
    var pullDown = $("#pullDown");
    var pullUp = $("#pullUp");
    var pullDownOffset = pullDown.height();
    var myScroll = new IScroll(".wrapper",{
        scrollbars:false,
        probeType:1,
        mouseWheel: true,
        startY:-pullDown.height()
    })
//下拉开始
    myScroll.on("scrollStart",function(){
        console.log("start");
        if(pullDown.hasClass('loading')){
            pullDown.attr('class','');
        }else if(pullUp.hasClass('loading')){
            pullUp.attr('class','');
        }
    })
//scrollmove
    myScroll.on("scroll",function(){
        console.log("scroll");
        console.log(this.directionY);
        if(this.y > 5 && !pullDown.hasClass('flip')) {
            pullDown.addClass('flip');
            pullDown.find('.pullDownLabel').html('松开刷新...');
        } else if(this.y<5 && pullDown.hasClass('flip')){
            pullDown.attr('class','');
            pullDown.find('.pullDownLabel').html('下拉刷新...');
        } else if(this.y < (this.maxScrollY-5)&&!pullUp.hasClass('flip')){
            pullUp.addClass('flip');
            pullUp.find('.pullUpLabel').html('松开加载...');
        }else if(this.y > (this.maxScrollY+5) && pullUp.hasClass('flip')){
            pullDown.attr('class','');
            pullUp.find('.pullUpLabel').html('上拉加载更多...');
        }
    })
//scroll end
    myScroll.on("scrollEnd",function(){
        console.log("end");
        if(pullDown.hasClass('flip')){
            pullDown.addClass('loading');
            pullDown.find('.pullDownLabel').html('刷新中...');
            setTimeout(function () {
                myScroll.refresh();
                myScroll.scrollTo(0,-pullDownOffset,500);
            }, 1000);
        }else if(pullUp.hasClass('flip')){
            pullUp.addClass('loading')
            pullUp.find('.pullUpLabel').html('努力加载中...');
            pullUpAction();
        }
    })

//上拉加载更多。。。。
    function pullUpAction(){
        $.ajax({
            type:"get",
            url:"data/music.json",
            dataType:"json",
            success:function(data){
                console.log(data);
                for(var i=0;i<data.length;i++){
                    var oLi='<dl><dt><img src="'+data[i].imgUrl+'"/><div class="num"><span class="iconfont icon-tingyinle"></span>'+data[i].clickNum+'</div></dt> <dd><p>'+data[i].title+'</p><p><img src="assets/images/b.png"/>'+data[i].singer+'</p> </dd></dl>'
                    $(".MucList").append(oLi);
                }
            }
        });
        setTimeout(function(){
            myScroll.refresh();
        },2000);
    }


//    最新，最热切换
    $(".top .fenlei li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".border li").click(function(){
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        swiper.slideTo(index);
    })

//    电台
    $(".dianLeft li").click(function(){
        $(".feature").html("");
        var index = $(this).index();
        var name = $(this).html();
        $(".te").html(name);
        $(this).addClass("active").siblings().removeClass("active");
        $.ajax({
            type:"get",
            url:"data/fm.json",
            dataType:"json",
            success:function(data){
                console.log(data[index]);
                console.log(name);
                console.log(data[index].pic.length);
                if(data[index].name==name){
                    console.log(data[index].pic.length);
                    for(var i=0;i<data[index].pic.length;i++){
                            var oLi='<dl><dt><img src="'+data[index].pic[i].imgUrl+'"/><div class="num"><span class="iconfont icon-tingyinle"></span>'+data[index].pic[i].num+'</div></dt> <dd><p>'+data[index].pic[i].title+'</p></dd></dl>';
                            $(".feature").append(oLi);
                        }
                }
            }
        })
    })

//    share
    $(".menu").click(function(){
        $(".share").stop().animate({
            "bottom":"0"
        },500);
        $(".mark").show();
    })
    $(".mark").click(function(){
        $(".share").stop().animate({
            "bottom":"-408"
        },500);
        $(".sideSlide").stop().animate({"left":-270});
        $(".mark").hide();
    })


//   音乐详情页面
    $(".footer").click(function(){
       location.href="assets/html/musicDetail.html";
    })
})