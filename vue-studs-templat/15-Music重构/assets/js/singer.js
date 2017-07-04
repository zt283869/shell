$(function(){
    var list = $(".singer");
    var title = $(".singer h3"); //分类名称
    var singerList = $(".singer ul"); //分类列表
    var icon = $(".singer .iconfont"); //icon切换
    var flag=true; //标记，列表是否打开
    var index; //下标
    for(var i=0;i<title.length;i++){
        title[i].index=i;
        title[i].onclick=function(){
            if(index!=this.index){
                flag=true;
            }
            if(flag){
                for(var i=0;i<title.length;i++){
                    singerList[i].style.display="none";
                }
                singerList[this.index].style.display="block";
                var tit =  title[this.index].innerHTML;   //分类名称
                console.log(tit);
                //ajax请求歌手列表数据
                $.get("../../data/singer.json",function(data){
                    for(var j=0;j<data.length;j++){
                        console.log(data[j].type);
                        if(tit==data[j].type){
                            $(".sing").html("");  //每次点击时sing的内容置空
                            for(var k=0;k<data[j].singer.length;k++){
                                //console.log(data[j].singer[k].name);
                                var oLi = '<li class="border"><img src="'+data[j].singer[k].pic+'"/> '+data[j].singer[k].name+'</li>';
                                $(".sing").append(oLi);
                            }
                        }
                    }
                })
                $(this).next().next().removeClass("icon-11").addClass("icon-xiala");
            }else{
                singerList[this.index].style.display="none";
                $(this).next().next().removeClass("icon-xiala").addClass("icon-11");
            }
            flag=!flag;
            index=this.index;
        }
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
})