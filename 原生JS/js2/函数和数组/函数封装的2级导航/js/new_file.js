
function getId(str){
	return document.getElementById(str);
}

function appear(num1){
	var m = 0;
	var _num1 = getId(num1);
//	console.log(_num1);
	var vari = _num1.getElementsByTagName("li");
			for(var i = 0;i<vari.length;i++){				
				vari[i].style.cssText = "opacity: 1;transform: none;transition-delay: "+m+"ms";
				m+=50;
			}
	}
function mover(str){
	var m = 400;
	var _num1 = getId(str);
//	console.log(_num1);
	var vari = _num1.getElementsByTagName("li");
			for(var i=0;i<vari.length;i++){
				vari[i].style.cssText = "transition-delay: "+m+"ms";
				m-=50;
			}	
}
