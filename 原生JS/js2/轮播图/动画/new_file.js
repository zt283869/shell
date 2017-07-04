function getId(str){
	return document.getElementById(str);
}
//封装移动
function Tmove(obj,josn){
	clearInterval(obj.time)//清除正在执行的定时器
	var iSpeed = 0;
	obj.time=setInterval(function(){
		var Bover = true;//假设运动完成
		for(var attr in josn){//每个属性的遍历修改
			var iCur = 0;
			var iTager = 0;
			 iCur = Math.round(parseInt(getStyle(obj,attr)));//拿到dom的left
			 
			iTager = parseInt(josn[attr]);//拿到json的left
			iSpeed = (iTager-iCur)/5;//json-dom获得相对速度
			if(iTager!=iCur){
				Bover = false;
				obj.style.left = iCur+iSpeed+"px";
			}
		}
		if(Bover){
			clearInterval(obj.time)
		}
	},30)
}


//获取样式
function getStyle(obj,arr){
	if(obj.currentStyle){
		return obj.cuurentStyle[arr];
	}else{
		return getComputedStyle(obj,null)[arr];
	}
}

//运动
var num=0;
var timer=null;
var box = document.getElementById("box");
	var box_ul = document.getElementById("modmg");
	var box_ul_li = box_ul.getElementsByTagName("li");
	var ball = document.getElementById("ball");
	var ball_li = ball.getElementsByTagName("li");
	var box_Width = parseInt(getStyle(box,"width"));
	var a1 = document.getElementById("a1");
	var a2 = document.getElementById("a2");
	//运动
function setInterLB(){
	timer = setInterval(function(){
		num++;
		if(num==ball_li.length+1){
			box_ul.style.left = "0";
			num=1;
		}
		for(var i=0;i<ball_li.length;i++){
			ball_li[i].className="";
		}
		ball_li[num%ball_li.length].className="active";
		Tmove(box_ul,{"left":(-1)*num*box_Width});
	},1000);
}
//banll事件
for(var k=0;k<ball_li.length;k++){
	ball_li[k].index = k;
	ball_li[k].onmouseover = function(){
		for(var j=0;j<ball_li.length;j++){
			ball_li[j].className="";
		}
	num = this.index;
	this.className='active';
	Tmove(box_ul,{"left":(-1)*num*box_Width});
	}
}


//鼠标事件
setInterLB();
box.onmouseover = function(){
	clearInterval(timer);
}
box.onmouseout = function(){
	setInterLB();
}

a1.onclick = function(){
	num--;
	if(num==-1){
		
		num=ball_li.length-1;
		box_ul.style.left = -1*(ball_li.length*box_Width)+"px";
	}
	Tmove(box_ul,{"left":(-1)*num*box_Width});
	for(var j=0;j<ball_li.length;j++){
			ball_li[j].className="";
		}
	ball_li[num%ball_li.length].className="active";
	
}

a2.onclick = function(){
	num++;
	if(num==ball_li.length+1){
		box_ul.style.left = "0";
			num=1;
	}
	for(var i=0;i<ball_li.length;i++){
			ball_li[i].className="";
		}
		ball_li[num%ball_li.length].className="active";
		Tmove(box_ul,{"left":(-1)*num*box_Width});
}
