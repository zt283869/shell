function $Id(srt){
	return document.getElementById(srt);
}
function $Class(str){
	return document.getElementById(str);
}
function getStyle(obj,attr){//获取css样式
    if(obj.currentStyle){//ie
        return obj.currentStyle[attr];
    }
    else{
        return getComputedStyle(obj,null)[attr];
    }
}
function move(obj,json,fn){  	// 属性值可以不加px 透明度是用0-1之间的数值
    clearInterval(obj.timer)	// 清除正在执行的定时器
    var iSpeed  = 0;
    obj.timer = setInterval(function(){
        var bOver = true; //假设运动完成
        for (var attr in json){  //每个属性的遍历修改
            var iCur = 0;
            var iTarget;     //   因为我们传入的透明度参数是0-1之间，而我们的初始值是乘100的，所以目标值应该也相应的乘100
            if(attr == "opacity"){	//透明度
                iCur = parseFloat(getStyle(obj,"opacity"))*100;//初始值是乘100/
                iTarget = parseInt(json[attr]*100);//目标值应该也相应的乘100
            }else{
                iCur = Math.round(parseFloat(getStyle(obj,attr)));
                iTarget = parseInt(json[attr]);//300,opacity
            }
            iSpeed = (iTarget - iCur)/5;//获取相对速度
            iSpeed = iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);//上下取整

            if(iCur != iTarget){
                bOver = false; //如果某一个属性没有完成运动
                if(attr == "opacity"){
                    obj.style.filter ='alpha(opacity:'+(iCur + iSpeed)+')';
                    obj.style.opacity =(iCur + iSpeed)/100;
                }else{
                    obj.style[attr] =iCur + iSpeed +"px";
                }
            }
        }
        if(bOver){//运动完成
            clearInterval(obj.timer);
            if(fn){
            	fn();  //如果有回调函数，执行回调函数
            }
        }

    },30)
}
//疯转的选项卡
function numImg(str,stra,stat){
	for(var i=0;i<str.length;i++){
		
		str[i].index=i;
		str[i].onclick = function(){
			
			for(var j=0;j<stra.length;j++){
				stra[j].className = "";
				
			}
			for(var j=0;j<stat.length;j++){
				stat[j].className="";
				stat[j].id = "";
			}
			stra[this.index].className = "block";
			stat[this.index].className = "block";
			stat[this.index].id = "move";						
		}
		
	}
		
	
}
//获取下边的图片的宽
var ImgWidth0 = $Id("bannerimg").getElementsByTagName("ul")[0].children[0].firstChild;
//获取下边的图片的宽
function getWidth(){
	var imgWidth = getStyle(ImgWidth0,"width");	
//	var EXP = /px/gi;
	var width=imgWidth.replace(/px/gi,"");
	return Number(width)*2;
}
//左右点击移动栏

function Amove(rightobj,leftobj,obj){
	rightobj.onclick = function(){
		move(obj,{"left":0*getWidth()});
	}
	leftobj.onclick = function(){
		move(obj,{"left":-1*getWidth()});
	}
}
//
function mouseOver(str,stst,stat,blockr,noner,id){
	str.onmouseover = function(){
		stst.style.display = blockr;
		stat.style.display = blockr;
	}
	str.onmouseout = function(){
		stst.style.display = noner;
		stat.style.display = noner;
	}
	str.onmousemove = function(event){
		var e = event||window.event;
		var _left;
		var _top;
		var w = 500;h=400;
		var ow = 250;oh=200;
		
		if(e.pageX-str.offsetLeft<ow/2){
			_left = 0;
		}else if(e.pageX-str.offsetLeft>(w-ow/2)){
			_left = w-ow;
		}else{
			_left = e.pageX-str.offsetLeft-ow/2;
		}
		if(e.pageY-str.offsetTop<oh/2){
			_top = 0;
		}else if(e.pageY-str.offsetTop>(h-oh/2)){
			_top = h-oh;
		}else{
			_top = e.pageY-str.offsetTop-oh/2;
		}
		stst.style.left = _left+"px";
		stst.style.top = _top+"px";
		$Id(id).style.left = -1*_left*2+"px";
		$Id(id).style.top= -1*_top*2+"px";
	}
}

function init(){
	var moveimgnum = $Id("moveimg").children;
	var bannerimgnum = $Id("bannerimg").getElementsByTagName("ul")[0].children;
	var bannerimgnumMove = $Id("bannerimg").getElementsByTagName("ul")[0];
	var rightimgblock = $Id("rightimg").children;
	var moverightr = $Id("moveright");
	var moveleftr = $Id("moveleft"); 
	//调取封装的显示图片	
		numImg(bannerimgnum,moveimgnum,rightimgblock);
	//调取封装的左右移动
		Amove(moveleftr,moverightr,bannerimgnumMove);
	//鼠标放在上面显示
	mouseOver($Id("moveimg"),$Id("logodiv"),$Id("rightimg"),"block","none","move");
}

