$(function(){
//    点击创建歌单

//    模态框
    $(".create").click(function(){
           $(".pop").show();
            $(".mark").show();
    })

    //取消的点击
    $(".cancel").click(function(){
        $(".pop").hide();
        $(".mark").hide();
    })
    //确认的点击
    $(".confirm").click(function(){
        var oTxt = $("#txt").val();
        console.log(oTxt);
        if(oTxt==""){
            return false;
        }
        var oLi = document.createElement("li");
        oLi = '<li><img src="../images/mu.png"/><p>'+oTxt+'</p><span class="number">0首</span><dd class="iconfont icon-caidan1 menu"></dd></li>'
        $(".list").append(oLi);
        $(".mark").hide();
        $(".pop").hide();
    })
    //菜单点击侧栏滑出
    $(".slide").click(function(){
        $(".sideSlide").stop().animate({"left":0});
        $(".mark").show();
    });

    $(".mark").click(function(){
        $(".sideSlide").stop().animate({"left":-270});
        $(".mark").hide();
        $(".left").stop().animate({
            "bottom":"-360"
        },300);
    })

//    定时选择
    var timer;
    $(".cont li").click(function(){
        clearInterval(timer);
        $(this).find("span").addClass("icon-selected").closest("li").siblings().find("span").removeClass("icon-selected");
        if($(this).find("span").hasClass("icon-selected")){
            console.log($(this).find(".num").html());
            var time = $(this).find(".num").html();
            console.log((time*60*1000));
            var time1=time*60;
            timer =   setInterval(function(){
                time1 = time1 - 1;
                var second = Math.floor(time1 % 60);             // 计算秒
                var minite = Math.floor((time1 / 60) % 60);      //计算分
                $(".close").html( minite + "分" + second + "秒");
            },1000)
            $(".setTime").stop().animate({
                "left":"320"
            })
        }
    })

//    定时点击
    $(".time").click(function(){
        $(".setTime").stop().animate({
            "left":0
        },300)
    })

//皮肤管理
    $(".bg").click(function(){
        //$("body").css({"backgroundColor":"black"});
        //$(".sideSlide").css({"background":"black"});
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



})