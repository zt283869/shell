//获得样式
function getStyle(obj,arrt){
	if(obj.currentStyle){
		return obj.currentStyle[arrt];
	}else{
		return getComputedStyle(obj,null)[arrt];
	}
}

//渐变
function Jmove(obj,json){
	clearInterval(obj.time);
	var iSpend = 0;
	obj.time = setInterval(function(){
		var over = true;
		for(var att in json){
			var iCun = 0;
			var itge = 0;
			iCun = parseFloat(getStyle(obj,"opacity"))*100;
			itge = parseInt(json[att]*100);
			iSpend = (itge - iCun)/5;
			iSpend = iSpend>0?Math.ceil(iSpend):Math.floor(iSpend);//上下取整是Ie用的
			if(iCun!=itge){
				over=false;
				obj.style.filter = 'alpha(opacity:'+(iCun+iSpend)+')'
				obj.style.opacity = (iCun+iSpend)/100;
			}
		}
		if(over){
			clearInterval(obj.time)
		}
	},60)
}
//获取Dom节点
	var box;
	var banner;
	var banner_li;
	var ball;
	var ball_li;
	var a1;
	var a2;
	var timer;
	var num;
	var speed;
function variable(){
	 box = document.getElementById("box");
	 banner = document.getElementById("banner");
	 banner_li = banner.getElementsByTagName("li");
	 ball = document.getElementById("ball");
	 ball_li = ball.getElementsByTagName("li");
	a1 = document.getElementById("a1");
	 a2 = document.getElementById("a2");
	 timer = null;
	 num = 0;
	 speed = 2000;
}
//自动播放
function getJB(){
	timer = setInterval(function(){
		for(var i=0;i<banner_li.length;i++){
			banner_li[i].style.display = "none";
		}
		num++;
		if(num==banner_li.length){
			num=0;
		}
		banner_li[num].style.display="block";
		banner_li[num].getElementsByTagName("img")[0].style.opacity = 0;
		Jmove(banner_li[num].getElementsByTagName("img")[0],{"opacity":'1'})
		for(var i=0;i<banner_li.length;i++){
			ball_li[i].className = "";
		}
		ball_li[num].className="active";
		
	},speed)
}

//鼠标放到上面和出来
function Mouse(){
	box.onmouseover = function(){
	(clearInterval(timer));
	a1.style.display = "block"
	a2.style.display = "block"
}
box.onmouseout = function(){
	a1.style.display = "none"
	a2.style.display = "none"
	getJB();
}
}

//放到球球上图片变化
function Ballr(){
	for(var i=0;i<ball_li.length;i++){
	ball_li[i].index = i;
	ball_li[i].onmouseover = function(){
		for(var j=0;j<ball_li.length;j++){
		ball_li[j].className = "";
		banner_li[j].style.display = "none"
	}
		this.className = "active";
		num = this.index;
		banner_li[num].style.display = "block"
		banner_li[num].getElementsByTagName("img")[0].style.opacity = "0";
		Jmove(banner_li[num].getElementsByTagName("img")[0],{"opacity":'1'})
	}
	
}
}

//左右点击切换图片
function OnclikImg(){
	a1.onclick = function(){
	num--;
	if(num==-1){
		num = banner_li.length-1;
	}
	for(var i=0;i<ball_li.length;i++){
		ball_li[i].className = "";
		banner_li[i].style.display = "none";
	}
	ball_li[num].className = "active";
	banner_li[num].style.display = "block";
	banner_li[num].getElementsByTagName("img")[0].style.opacity = "0";
	Jmove(banner_li[num].getElementsByTagName("img")[0],{"opacity":'1'})
}
a2.onclick = function(){
	num++;
	if(num==banner_li.length){
		num = 0;
	}
	for(var i=0;i<ball_li.length;i++){
		ball_li[i].className = "";
		banner_li[i].style.display = "none";
	}
	ball_li[num].className = "active";
	banner_li[num].style.display = "block";
	banner_li[num].getElementsByTagName("img")[0].style.opacity = "0";
	Jmove(banner_li[num].getElementsByTagName("img")[0],{"opacity":'1'})
}

}

//页面加载完成
window.onload = function(){
	variable();
	Ballr();
	getJB();	
	OnclikImg();
}
