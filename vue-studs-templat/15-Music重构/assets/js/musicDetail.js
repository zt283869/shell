$(function(){
    var con = $(".content");
    $(".bg").height($(document).height());
    $(".middle").height(con.height());
    $(".left").height(con.height()-40);
    $(".right").height(con.height()-60);
    var mx = new Swiper(".con",{
        pagination:".swiper-pagination"
    })

    var mx1 = new Swiper(".con1",{
        effect: 'flip',
        loop:true,
        nested:true
    })

//    音乐播放
    var myAudio = $("#myAudio")[0];
    var myaudio = $("#myAudio");
    var timer;
    var loopType = 0;  //播放方式，0循环 1 单曲 2 随机
    $(".play").click(function(){
       if(myAudio.paused){
           myAudio.play();
           $(this).removeClass("icon-play-o").addClass("icon-zanting");
           audio(".init",".end",".wid1",".btn1");
       }else{
           $(this).removeClass("icon-zanting").addClass("icon-play-o");
           myAudio.pause();
       }

    });


    //判断播放方式
    $(".bottom .single").click(function(){
        loopType++;
            if(loopType>2){
                //循环
                loopType=0;
            }
            if(loopType==1){
                //单曲
                $(this).removeClass("icon-xunhuan").addClass("icon-danquxunhuan1");
                single(".songList li");
            }else if(loopType==2){
            //   随机播放/
                $(this).removeClass("icon-danquxunhuan1").addClass("icon-suiji2");
                random(".songList li");
                console.log($(".songList li").attr("data-src"));
            }else if(loopType==0){
                $(this).removeClass("icon-suiji2").addClass("icon-xunhuan");
                circle(".songList li");
                console.log($(".songList li").attr("data-src"));
            }
    })





    var srcArr=[];  //放置图片的url地址
    getData();
    function getData(){
        $.get("../../data/list.json",function(data){
           // console.log(data);
            for(var i=0;i<data.length;i++){
                //console.log(data.length);
                var oLi =' <li data-src="'+data[i].musicUrl+'"><p>'+data[i].title+'</p><i>'+data[i].singer+'</i> <span class="iconfont icon-guanbi"></span></li>';
                $(".songList").append(oLi);
                srcArr.push(data[i].picUrl);
            }

            //列表点击播放
            var a=0; //图片、背景改变
            $(".songList li").on("click",function(){
                //console.log(srcArr);
                //a自增，改变背景、图片的src
                a++;
                $(".bg img").attr("src",srcArr[a]);
                $(".pic img").attr("src",srcArr[a]);
                //console.log(1);
                $(this).find("p").addClass("active").parent().siblings().find("p").removeClass("active");
                $(this).find("i").addClass("active").parent().siblings().find("i").removeClass("active");
                $(".play").removeClass("icon-play-o").addClass("icon-zanting");
                $(".page-title").html($(this).find("p").html());
                $(".singer").html($(this).find("i").html());
                $("#myAudio").attr("src",$(this).attr("data-src"));
                $("#myAudio")[0].play();
                audio(".init",".end",".wid1",".btn1");
            })


            //上一首
            var len = $(".songList>li").length;
            $(".prev").click(function(){
                var index;
                $(".songList>li").each(function(i){
                    if($(this).find("p").hasClass("active")){
                        index =i;
                        //console.log(i);
                    }
                })
                if(index==0){
                    $(".songList>li").eq(len-1).trigger("click");
                }else{
                    $(".songList>li").eq(index-1).trigger("click");
                }
            })
            //下一首
            $(".next").click(function(){
                var index;
                $(".songList>li").each(function(i){
                 //   console.log(i);
                    if($(this).find("p").hasClass("active")){
                        index =i;
                  //      console.log(index);
                    }
                })
                if(index==len-1){
                    $(".songList>li").eq(0).trigger("click");
                }else{
                    $(".songList>li").eq(index+1).trigger("click");
                }
            })
        })
    }


    //播放进度条
    function audio(start,end,processbar,processbar1){
        clearInterval(timer);
           timer = setInterval(function(){
               var endtime = parseInt(parseInt(myAudio.duration)/60)+":"+(parseInt(myAudio.duration)%60<10?"0"+parseInt(myAudio.duration)%60:parseInt(myAudio.duration)%60);
               var nowtime = parseInt(parseInt(myAudio.currentTime)/60)+":"+(parseInt(myAudio.currentTime)%60<10?"0"+parseInt(myAudio.currentTime)%60:parseInt(myAudio.currentTime)%60);
               var lineWidth = Math.round(myAudio.currentTime)/Math.round(myAudio.duration)*200;
               //歌词
               var time1=(myAudio.currentTime).toString();
               var time2=time1.substring(0,time1.indexOf("."));
               //var time=(myAudio.currentTime/60).toString().substring(0,(myAudio.currentTime/60).toString().indexOf(".")+3);
               // console.log("截取时间"+time2);
               //console.log("当前时间"+time1);
               // console.log(time);
               $(".lrcItem").each(function(i,ele){
                   //console.log($(ele).attr("data-time"));
                   if($(ele).attr("data-time")==time2){
                       $(ele).addClass("active").siblings().removeClass("active");
                       $(".ly").html($(ele).html());
                   }
               })

               //歌词高度同步
               if(time2==50){
                   console.log($(".lyric").css("top"));
                   $(".middle .lrc .songCon .lyric").css({"top":-286});
               }else if(time2==100){
                   $(".middle .lrc .songCon .lyric").css({"top":-572});
               }else if(time2==144){
                   $(".middle .lrc .songCon .lyric").css({"top":-858});
               }
               $(start).html(nowtime);
               $(end).html(endtime);
               $(processbar).css({"width":lineWidth});
               $(processbar1).css({"left":lineWidth-6});
           },1)
        }


    //循环播放
    function circle(obj){
        var index=0;
        var len=$(obj).length;
        if(len!==0){
            myaudio.attr("src",$(obj).attr("data-src"));
            myAudio.play();
            audio(".init",".end",".wid1",".btn1");
            setInterval(function(){
                if(myAudio.ended){
                    index++;
                    if(index==len){
                        index=0;
                    }
                    myaudio.attr("src",$(obj).attr("data-src"));
                    myAudio.play();
                }
            },60)
        }else{
            myAudio.pause();
        };
        if(myAudio.paused){
            $(".play").removeClass("icon-zanting").addClass("icon-play-o");
        }else{
            $(".play").removeClass("icon-play-o").addClass("icon-zanting");
        }
    }
    //随机播放
    function random(obj){
        var n=Math.round(Math.random()*7);
        var m ;
        var len=$(obj).length;
        if(len!==0){
            myaudio.attr("src",$(obj).attr("data-src"));
            myAudio.play();
            audio(".init",".end",".wid1",".btn1");
            setInterval(function(){
                if(myAudio.ended){
                    m=Math.round(Math.random()*10);
                    myaudio.attr("src",$(obj).attr("data-src"));
                    myAudio.play();
                }
            },30)
        }else{
            myAudio.pause();
        };
        if(myAudio.paused){
            $(".play").removeClass("icon-zanting").addClass("icon-play-o");
        }else{
            $(".play").removeClass("icon-play-o").addClass("icon-zanting");
        }
    }
    //单曲循环
    function single(obj){
        myAudio.play();
        audio(".init",".end",".wid1",".btn1");
        setInterval(function(){
            if(myAudio.ended){
                myaudio.attr("src",$(obj).attr("data-src"));
                myAudio.play();
            }
        },30);
        if(myAudio.paused){
            $(".play").removeClass("icon-zanting").addClass("icon-play-o");
        }else{
            $(".play").removeClass("icon-play-o").addClass("icon-zanting");
        }
    }



//    图片歌词切换
    $(".middle .mid").click(function(){
        var index = $(this).index();
        $(this).eq(index).addClass("on").siblings().removeClass("on");
    })


//    触摸事件 、拖动播放
    /**
     * google不能播放，在火狐下可以
     * touchStart 触摸开始事件
     * touchMove  移动端移动事件
     * touchend  移动端触摸结束
     * e.originalEvent.changedTouches[0].clientX  移动端获取横纵坐标
     * @type {*|jQuery}
     */
    var btnLeft = $(".btn1").offset().left;
    var totalWidth = $(".wid").width();
    console.log(btnLeft);
    console.log(totalWidth);
    $(".btn1").on("touchstart",function(e){
        e.preventDefault();
        clearInterval(timer);
        console.log("start.....");
        var hasSrc = myaudio.attr("src");


    })
    $(".btn1").on("touchmove",function(e){
        e.preventDefault(); //阻止默认事件
        console.log("move.....");
        $("#myAudio")[0].pause(); //拖动音乐暂停
        var l = e.originalEvent.changedTouches[0].clientX-btnLeft;
        console.log(l);
        var Radio = Math.abs(l/totalWidth);
        console.log(Radio);
        var now;//记录当前时间
        now =parseInt( Radio*parseInt(myAudio.duration));
        //判断是否到达最大宽度
        if(l>totalWidth){
            l=totalWidth;
            now = totalWidth;
        }
        $(".wid1").css({"width":now});
        $(this).css({"left":now});
        $(".init").html(current(now));
        myAudio.currentTime=now;
        console.log(myAudio.currentTime);

    })

    $(".btn1").on("touchend",function(e){
        e.preventDefault();
        $("#myAudio")[0].play();
        console.log("end.....");
        audio(".init",".end",".wid1",".btn1");
        //e.preventDefault(); //阻止默认事件
    })
//    时间函数
    function current(num){
        var min = num/60 > 10 ? "00" : "0"+ num/60 ;
        var sec = num%60 < 10 ? "0" + num%60 : num%60;
        return ( parseInt(min) +":"+ parseInt(sec));
    }
})