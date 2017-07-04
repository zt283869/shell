$(function(){
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
        $(".mark").hide();
    })

//   选择
    $(".link").click(function(){
        location.href="editeMusic.html";
    })

    //    newslist
    $(".musicList dl").click(function(){
        myaudio.attr("src",$(this).attr("data-src"));
        myAudio.play();
        $(this).addClass("active").siblings().removeClass("active");
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
    //播放进度条
    function audio(processbar){
        setInterval(function(){
            var lineWidth = Math.round(myAudio.currentTime)/Math.round(myAudio.duration)*320;
            $(processbar).css({"width":lineWidth});
        },1)
    }
})