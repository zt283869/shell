
$(function(){

    // 下拉刷新、上拉加载
    var pullDown = $("#pullDown");
    var pullUp = $("#pullUp");
    var pullDownOffset = pullDown.height();
    var myScroll = new IScroll(".wrapper",{
        scrollbars: false,
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

    pullUpAction();

//    加载更多
    function pullUpAction(){
        $.ajax({
            type:"get",
            url:"../../data/onlyMusic.json",
            dataType:"json",
            success:function(data){
                console.log(data);
                for(var i=0;i<data.length;i++){
                    var oLi='<dl><dt><img src="'+data[i].picUrl+'"/></dt><dd><p>'+data[i].title+'</p><p>'+data[i].subtitle+'</p> </dd></dl>';
                    $(".list").append(oLi);
                    //    mv的创建与播放
                }
            }
        });
        setTimeout(function(){
            myScroll.refresh();
            //myScroll.scrollTo(0,myScroll.maxScrollY+80,300);
        },2000);
    }


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
