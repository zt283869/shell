
//功能：求一组数的和
//参数：一组数（数组）
//返回值：求和的结果（数字）
function sumArr(arr){
	var sum = 0;
	for(var i=0;i<arr.length;i++){
		sum = sum+arr[i];
	}
	return sum;
}

//功能：求一组数的平均值
//参数：一组数（数组）
//返回值：平均值的结果（数字）

function avgArr(arr){
	//1、求和
	var sum = sumArr(arr);
	
	//2、求平均值
	var avg = sum/arr.length;
	
	return avg;
}

//功能：求一组数的最大数
//参数：一组数（数组）
//返回值：最大数的结果（数字）

function maxArr(arr){
	var max = parseInt(arr[0]);

	for(var i=1;i<arr.length;i++){
		if(parseInt(arr[i])>max){
			max = arr[i];
		}
	}
	return max;
}


//功能：求一组数的最小数
//参数：一组数（数组）
//返回值：最大数的结果（数字）
function minArr(arr){
	var min = arr[0];
	for(var i=1;i<arr.length;i++){
		if(arr[i]<min){
			min = arr[i];
		}
	}
	return min;
}

//功能：求一组数的最小数下标
function minIndexArr(arr){
	var min = 0;
	for(var i=1;i<arr.length;i++){
		if(arr[i]<arr[min]){
			min = i;
		}
	}
	return min;
}


//功能：判断一个数组是不是回文数组
//参数：一组数（数组）
//返回值：true：是回文数组；false：不是回文数组；

function isBackArr(arr){	

	for(var i=0;i<parseInt(arr.length/2);i++){
		if(arr[i]!=arr[arr.length-1-i]){
			return false;
		}
	}
	return true;
	
}


//功能：请将数组元素循环右移若干位
//参数：
//1)一组数（数组）
//2)右移的位数
//返回值：右移后的数组；

function moveRightArr(arr,n){
	
	var m = n%arr.length;
	
	for(var j=0;j<m;j++){
		var temp = arr[arr.length-1];
		for(var i=arr.length-1;i>0;i--){
			arr[i] = arr[i-1];
		}
		arr[0] = temp;
	}

	return arr;
}
