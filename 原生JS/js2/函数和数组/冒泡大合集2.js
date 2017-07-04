function getArr(arr){								
			for(var i=0;i<arr.length;i++){
				for(var j=0;j<arr.length-i;j++){
					if(arr[j]>arr[j+1]){
						var temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
							}
						}			
					}
				return arr;
				}

		//	小到大	
		
function getFunc(a, b) {
		return b - a;
						}
//	大到
function getFunc1(b, a) {
		return a - b;
						}
//	综合
		
function compte(a, b) {
			if (a > b) {
			return -1;		
			} else if (a < b)
			{
			return 1;
		} else {
			return 0;
				}			
}

