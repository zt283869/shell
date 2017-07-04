
$(function(){
    //吸顶效果
    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
         console.log(scrollTop);
        if(scrollTop>200){
            $(".menu1").addClass("fixed");
        }else{
            $(".menu1").removeClass("fixed");
        }
    })


    $(".mark").height($(document).height());

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
        $(".left").stop().animate({
            "bottom":"-360"
        },300);
        $(".mark").hide();
    })

//    点击播放
    var myAudio = $("#myAudio")[0];
    var myaudio = $("#myAudio");
    $(".play").removeClass("icon-play-o").addClass("icon-zanting");
    audio(".scrollBar");
    var i=0;
    var musicList = ["../music/合家欢.mp3","../music/lftc.mp3","../music/ssqy1.mp3","../music/yyin.mp3"];
    $(".play").click(function(){
            if(myAudio.paused){
                myAudio.play();
                $(this).removeClass("icon-play-o").addClass("icon-zanting");
                audio(".scrollBar");
                if(myAudio.ended){
                    i++;
                    if(i==musicList.length){
                        i=0;
                    }
                    myaudio.attr("src",musicList[i]);
                }
            }else{
                myAudio.pause();
                $(this).removeClass("icon-zanting").addClass("icon-play-o");
            }
    })

    //判断播放方式
var loopType=0;
    $(".single").click(function(){
        loopType++;
        if(loopType>2){
            //循环
            loopType=0;
        }
        if(loopType==1){
            //单曲
            $(this).removeClass("icon-xunhuan").addClass("icon-danquxunhuan1");
        }else if(loopType==2){
            //   随机播放/
            $(this).removeClass("icon-danquxunhuan1").addClass("icon-suiji2");
        }else if(loopType==0){
            $(this).removeClass("icon-suiji2").addClass("icon-xunhuan");
        }
    })

    //播放进度条
    function audio(processbar){
       setInterval(function(){
            var lineWidth = Math.round(myAudio.currentTime)/Math.round(myAudio.duration)*320;
            $(processbar).css({"width":lineWidth});
        },1)
    }
    getData();
    function getData(){
        $.get("../../data/list1.json",function(data){
            console.log(data);
            for(var i=0;i<data.length;i++){
                console.log(data.length);
                var oLi =' <li data-src="'+data[i].musicUrl+'" class="border"><p>'+data[i].title+'</p><i>'+data[i].singer+'</i> <span class="iconfont icon-guanbi"></span></li>';
                $(".songList").append(oLi);
            }
            //列表点击播放  事件委托
            $(".songList li").on("click",function(){
                var index = $(this).index();
                console.log(1);
                $(this).find("p").addClass("active").parent().siblings().find("p").removeClass("active");
                $(this).find("i").addClass("active").parent().siblings().find("i").removeClass("active");
                $(".play").removeClass("icon-play-o").addClass("icon-zanting");
                myaudio.attr("src",$(this).attr("data-src"));
                myAudio.play();
                $(".muicLeft img").attr("src",data[index].picUrl);
                $(".muicLeft .tt").html(data[index].title);
                $(".muicLeft .zi").html(data[index].singer);
                audio(".scrollBar");
                $(".left").stop().animate({
                    "bottom":"-360"
                },300);
                $(".mark").hide();
            })
            //清空的点击
            $(".clear").click(function(){
                $(".songList").html("");
            })
            var len = $(".songList>li").length;
            //下一首  有问题
            var index;
            $(".next").click(function(){
                $(".newList>dl").each(function(i){
                    //console.log(i);

                })

            })
        })
    }

    //history
    $(".lishi").click(function(){
        $(".left").stop().animate({
            "bottom":0
        },300);
        $(".mark").show();
    })

//    newslist
    $(".newList dl").click(function(){
        myaudio.attr("src",$(this).attr("data-src"));
        myAudio.play();
    })


})


