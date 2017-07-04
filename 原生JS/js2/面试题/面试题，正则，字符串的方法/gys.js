//最大公约数
function getComonNum(v,m){
	var temp = 0;
	while(v!=0){
		temp = m%v;
		m=v;
		v=temp;
	}
	return m;
}
//排序
function getString(num){
	var obj = {};
	var num2 = 0;
	var value ='';
	for(var i=0;i<num.length;i++){
		if(!obj[num[i]]){
			obj[num[i]] = [];
		}
		obj[num[i]].push(num[i]);
	}
	for(var num in obj){
		if(num2<obj[num].length){
			num2 = obj[num].length;
			value = obj[num][0];
		}
	}
	return '做多的字符是'+value+'出现了'+num2+'次';
}

//正则排序
function getArray(arr){
	var num = 0;
	var value = 0;
	var str = arr.split("");
		str.sort();
		arr = str.join("");
//		alert(arr);
		var re = /(\w)\1+/g;
		arr.replace(re,function($0,$1){
			alert($1);
		if(num<$0.length){
			num = $0.length;
			value = $1;
		}
		
		});
		return '做多的字符是'+value+'出现了'+num+'次';
}


//千分符
function getMark(str){
	var iNum = str.length%3;
	var pren = '';
	var arr = [];
	var iNow = 0;
	var tmp = '';
	if(iNum!=0){
		pren = str.substring(0,iNum);
		arr.push(pren);
	}
	str = str.substring(iNum);
	for(var i=0;i<str.length;i++){
		iNow++;
		tmp+=str[i];
		if(iNow==3&&tmp){
			arr.push(tmp);
			tmp = '';
			iNow = 0;
			
		}
	}
	return arr.join(',')
}










