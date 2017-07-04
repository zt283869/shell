//封装一个$函数，$函数能够获得DOM元素

//如果传入的参数是#box;即表示获取 id是box的元素
//如果传入的参数是.box;即表示获取 class是box的所有元素
//如果传入的参数是 div;即表示获取 标签是div的所有元素
//如果传入的参数是 name=box;即表示获取 标签属性name的值是box的所有元素

function $(str){
	if(str.substring(0,1)=="#"){
		return document.getElementById(str.substring(1));
	}else if(str.substring(0,1)=="."){
		return document.getElementsByClassName(str.substring(1));		
	}else if(str.indexOf("name=")==0){
		return document.getElementsByName(str.substring(5));
	}else{
		return document.getElementsByTagName(str);
	}
}

//封装一个$create函数，用来创建dom节点；
//如果传入的是<div> ，即表示创建div标签节点
//如果传入的是abc ，即表示创建文本节点
//createElement
//createTextNode

function $create(str){
	if(str.substring(0,1)=="<" && str.substring(str.length-1)==">"){
		return document.createElement(str.substring(1,str.length-1));
	}else{
		return document.createTextNode(str);
	}	
}