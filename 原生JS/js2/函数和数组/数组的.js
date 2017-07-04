//数组和
function addPush(arr){
	var num=0;
	for(var i=0;i<arr.length;i++){
		num+=i;
	}
	return num;
}
//数组和的平均数
function averAge(arr){
	var num=0;
	for(var i=0;i<arr.length;i++){
		num+=i;
	}
	return num/arr.length;
}
//坐移动一位
function getArr(arr){
				var temp = arr[arr.length-1];
				for(var i=arr.length-1;i>0;i--){
						arr[i] = arr[i-1];
				}
				arr[0] = temp;
				return arr;
			}
			
//左移动n位			
function getNetxArr(arr,num){
				for(var i=0;i<num;i++){
					var temp = arr[arr.length-1];
					for(var j=arr.length-1;j>0;j--){
						arr[j] = arr[j-1];
					}
					arr[0] = temp;
				}
				return arr;
			}			
//回文数字
function isBackArr(arr){
	for(var i=0;i<parseInt(arr.length/2);i++){
		if(arr[i]!=arr[arr.length-1]){
			return false;
		}
	}
	return true;
}

//
var code = '';
function  getArrRodom(str){
	var code = '';
	var num = document.getElementById(str);
	var arr = [1,2,3,4,5,6,7,8,9,0,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var Len = arr.length;
		for(var i=0;i<6;i++){
			var mat = parseInt(Math.random()*Len);
				code+=arr[mat];
				num.innerHTML =  '('+code+')'+'点击更换';
		}
	
}

(function getArrRodom(){
	var num = document.getElementById('p1');
	var arr = [1,2,3,4,5,6,7,8,9,0,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var Len = arr.length;
		for(var i=0;i<6;i++){
			var mat = parseInt(Math.random()*Len);
				code+=arr[mat];
				num.innerHTML = '('+code+')'+'点击更换';
		}
	
})();

function vertFy(str,stt){
	var Id = document.getElementById(str);
	var Id1 = document.getElementById(stt).value;
	var oinputCode = Id.value;
	if(Id1.length<=0){
		alert("请输入验证码");
	}else if(Id1.toUpperCase()!=code.toUpperCase()){
		alert("验证码输入有误");
	}else{
		alert("验证码正确");
	}
}

function norepeat(arr){
	var obj = {};
	var x;
	var num1 = [];
	var _arr = new Array();
	for(var i=0;i<arr.length;i++){
		var str = false;
		for(var j=0;j<_arr.length;j++){
			if(arr[i]===_arr[j]){
				str = true;				
				break;
			}
		}
		if(!str){
		_arr.push(arr[i]);	
		}
		if(str){
			if(!obj[arr[i]]){
				obj[arr[i]] = [];
			}
			obj[arr[i]].push(arr[i]);
		}
	}
	for(x in obj){
		num1.push(x);
	}
	return alert(_arr+"重复的的数字是"+num1);
}












