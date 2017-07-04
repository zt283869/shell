function disPlay(){
document.getElementById("suspension").onclick = function(){
	document.getElementById("box").style.display = 'block';
}
document.getElementById("cancel").onclick = function(){
	document.getElementById("box").style.display = 'none';
}
	
}

function TAB(){
	var Ul1 = document.getElementById("u1").getElementsByTagName("li");
	var Ul2 = document.getElementById("u2").getElementsByTagName("li");
	for(var i=0;i<Ul1.length;i++){
		Ul1[i].index = i;
		Ul1[i].onmouseover = function(){
			for(var j=0;j<Ul2.length;j++){
				Ul2[j].className = '';
			}
			Ul2[this.index].className = 'opi';
			
		}
	}	
}

function lookdy(){
//	var kh = document.getElementsByClassName("kh")[0];
//	var kh2 = document.getElementById("kh");
		document.getElementsByClassName("kh")[0].onclick = function(){
			if(document.getElementById("kh").style.display=="none"){
		document.getElementById("kh").style.display="block";	
		}else{
			
			document.getElementById("kh").style.display="none";
		}
		}
		
		
	document.getElementsByClassName("xj")[0].onclick = function(){
			if(document.getElementById("xj").style.display=="none"){
		document.getElementById("xj").style.display="block";	
		}else{
			
			document.getElementById("xj").style.display="none";
		}
		}	
		
	document.getElementsByClassName("kb")[0].onclick = function(){
			if(document.getElementById("kb").style.display=="none"){
		document.getElementById("kb").style.display="block";	
		}else{
			
			document.getElementById("kb").style.display="none";
		}
		}	
		
		
		
	document.getElementsByClassName("zz")[0].onclick = function(){
			if(document.getElementById("zz").style.display=="none"){
		document.getElementById("zz").style.display="block";	
		}else{
			
			document.getElementById("zz").style.display="none";
		}
		}	
		
		
		
		
		
}
	
		
		















