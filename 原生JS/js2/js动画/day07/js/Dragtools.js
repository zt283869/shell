function bindDrag(obj){
	var isDown;
	obj.onmousedown = function(e){
		isDown = true;
		var evt = e||window.event;
		if(evt.preventDefault){  //非IE  阻止默认事件
			evt.preventDefault();
		}else{   //IE
			evt.returnValue = false;
		}
		_left = evt.clientX - obj.offsetLeft;  //evt.offsetX 计算初始相对位置
		_top = evt.clientY - obj.offsetTop;
		obj.style.cursor = "move";
	}

	document.onmousemove = function(e){
		var evt = e||window.event;
		if(isDown){
			obj.style.left = evt.clientX-_left+"px";
			obj.style.top = evt.clientY-_top+"px";
		}
	}

	obj.onmouseup = function(){
		isDown = false;
		
	}
}


