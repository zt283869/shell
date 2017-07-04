function game(){
	var num = 0;
	for(var i=0;i<100;i++){
		
		if(i>2){
			
			if(i%3==0 && i%5==0){
			document.write("FlioSlio"+",");
			num++;
			
			if(num==5){
				num=0;
				document.write("<br />")
			}
			continue;
		}
			
			if(i%3==0){
			document.write("Flio"+",");
			num++;
			
			if(num==5){
				num=0;
				document.write("<br />")
			}
			continue;
			
		}if(i%5==0){
			document.write("Slio"+",");
			num++;
			if(num==5){
				num=0;
				document.write("<br />")
			}
			continue;
		}
		}
		
	document.write(i+",");
	num++;
	if(num==5){
		document.write("<br />")
		num = 0;
	}
	}
	
}
//5位以内的数
function numBer(num,num2,num3,num4,num5,num6,num7){
	var _num = document.getElementById(num);
	var _num2 = document.getElementById(num2);
	var _num3 = document.getElementById(num3);
	var _num4 = document.getElementById(num4);
	var _num5 = document.getElementById(num5);
	var _num6 = document.getElementById(num6);
	var _num7 = document.getElementById(num7);
	var arr = [1,2,3,4,5,6,7,8,9,0];
	var Len = arr.length;
	var str = '';
	for(var i=0;i<5;i++){
		var comb = parseInt(Math.random()*Len);
		str+=arr[comb];
		_num.innerHTML = str;
	}
	_num2.value = "共"+str.length+"位";
	_num3.value = parseInt(str%10);
	_num4.value = parseInt((str/10)%10);
	_num5.value = parseInt((str/100)%10);
	_num6.value = parseInt((str/1000)%10);
	_num7.value = parseInt((str/10000)%10);
}

(function numBer(){
	var _num = document.getElementById("sp1");
	var _num2 = document.getElementById("text1");
	var _num3 = document.getElementById('text2');
	var _num4 = document.getElementById('text3');
	var _num5 = document.getElementById('text4');
	var _num6 = document.getElementById('text5');
	var _num7 = document.getElementById('text6');
	var arr = [1,2,3,4,5,6,7,8,9,0];
	var Len = arr.length;
	var str = '';
	for(var i=0;i<5;i++){
		var comb = parseInt(Math.random()*Len);
		str+=arr[comb];
		_num.innerHTML = str;
	}
	_num2.value = "共"+str.length+"位";
	_num3.value = parseInt(str%10);
	_num4.value = parseInt((str/10)%10);
	_num5.value = parseInt((str/100)%10);
	_num6.value = parseInt((str/1000)%10);
	_num7.value = parseInt((str/10000)%10);
	
})();













