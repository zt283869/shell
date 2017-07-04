
//1、添加事件监听器
//参数：
//domObj,
//eventType:没有on；
//fun,
//isBubble
//返回值：

function addEvent1701(domObj,eventType,fun,isCatch){
	var isIE = (navigator.userAgent.indexOf("MSIE")>-1);
	if(isIE){
		domObj.attachEvent("on"+eventType,fun);
	}else{
		domObj.addEventListener(eventType,fun,isCatch);
		
	}
}


//2、删除事件监听器