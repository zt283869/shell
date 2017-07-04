function getClass(str){
	return document.getElementsByClassName(str);
}
var oGoods = getClass("goods")[0];
var oPop =  getClass("pop")[0];
var oBig = getClass("bigPic")[0];
var oBigPic = oBig.getElementsByTagName("img")[0];
var w = 320,h = 504;
var oW = 160,oH = 252;
var bigW = 640,bigH = 1008;
oGoods .onmouseover = function(){
	oPop.style.display = "block";
	oBig.style.display = "block";
}
oGoods.onmouseout = function(){
	oPop.style.display = "none";
	oBig.style.display = "none";
}
oGoods.onmousemove = function(event){
	var e = event||window.event;
	var l;
	var t;
	if(e.pageX-oGoods.offsetLeft<oW/2){//左边界
		l=0;
	}else if(e.pageX-oGoods.offsetLeft>(w-oW/2)){//右边界
		l = w-oW;//保留在最右边的位置
	}else{
		l = e.pageX-oGoods.offsetLeft-oW/2;
	}
	if(e.pageY-oGoods.offsetTop<oH/2){//上边界
		t=0;
	}else if(e.pageY-oGoods.offsetTop>(h-oH/2)){//下边界
		t = h-oH;
	}else{
		t = e.pageY-oGoods.offsetTop-oH/2;
	}
	oPop.style.left = l+"px";
	oPop.style.top = t+"px";
	oBigPic.style.left = -1*l*bigW/w+"px";
	oBigPic.style.top = -1*t*bigH/h+"px";
}















