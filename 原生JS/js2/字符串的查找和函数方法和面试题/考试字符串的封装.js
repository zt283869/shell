	

//  1.分割成数组
//     功能:将字符串按特定字符分割成数组
//     参数:str-一个字符串,sub-指定的分割符;
//     返回值:生成的新数组

//		思路
//		1.查找指定分隔符第一次出现的位子
//		2.截取之前的字符放入数组
//		3.之后的继续查找
//		4.(先找出总共出现的次数);

      function toArray(str,sub){
	        var index = 0;
	        var arr = [];
	        var reg = new RegExp(sub,"g");
	        var countArr = str.match(reg);
	        var count = countArr.length;
	        for(var i=0;i<count;i++){
	           index = str.indexOf(sub);
	           var liStr = str.substring(0,index);
	           arr.push(liStr);
	           str = str.replace(liStr+sub,"");
	        }
	        arr.push(str);
	        return arr;
      }
	
	
	function toArray(str,sub){
		var index = 0;
		var arr = [];
		var reg = new RegExp(sub,"g");
		var countArr = str.match(reg);
		var count = countArr.length;
		for(var i=0;i<count;i++){
			index = str.indexOf(sub);
			var liStr = str.substring(0,index);
			arr.push(liStr);
			str = str.replace(liStr+sub,"");
		}
		arr.push(str);
		return arr;
	}
	
	
		
//      2.数组去重
//		功能:数组去重
//		参数:有重复元素的数组
//		返回值:新数组
		function removeRepeat(arr){
			var arrNew = [];
			
			for(var i=0;i<arr.length;i++){
				for(var k=0;k<arr.length;k++){
					if(i==k){
						continue;
					}
					if(arr[i] == arr[k]){
						arr[k] = "";
						break;
					}
				}
			}
			
			for(var i in arr){
				if(arr[i]==""){
					continue;
				}
				arrNew.push(arr[i]);
			}
			return arrNew;
		}
		


//  3.分割字符串
     function mySubString(str,starSub,endSub){
     	var res ="";
     	for(i = parseInt(starSub);i < parseInt(endSub);i++){
     		res = res + str.charAt(i);
     	}
     	return res;
     }
     
     
     
//4.创建节点
     function $create(str){
     	var star = str.charAt(0);
     	var end = str.charAt(str.length-1);
     	if(star=="<" && end==">"){
     		str = str.replace("<","");
     		str = str.replace(">","");
          return document.createElement(str);
     	}else{
     	  return document.createTextNode(str);
     	}
     }
