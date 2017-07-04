
function showTime(d){
	
	var y1 = d.getFullYear();
	var m1 = d.getMonth()+1;//0-11
	var d1 = d.getDate();
	
	
	var week = d.getDay();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	
	mm = mm<10?"0"+mm:mm;
	ss = ss<10?"0"+ss:ss;
	
	return y1+"年"+m1+"月"+d1+"日"+" "+hh+":"+mm+":"+ss+" "+toWeek(week);
	
}


//将日期格式化输出 “2015-08-24”

function formatDate(d){
	
	var y1 = d.getFullYear();
	var m1 = d.getMonth()+1;//0-11
	var d1 = d.getDate();
	
	m1 = m1<10?"0"+m1:m1;
	
	//return y1+"-"+m1+"-"+d1;
	return formatDateByArr([y1,m1,d1]);	
}

//formatDateByArr(["2017","03","22"]);

function formatDateByArr(arr){	
	return arr.join("-");
}

//获得某个月份的天数
//参数：
//年
//月
//返回值：天数

//

/*
2017-5-22   2017-4-22  差30天

2017-4-1   2017-3-1  差31天

2017-3-22   2017-2-22  差28天；


2017,3

2017-4-1 
2017-3-1 
*/
 
function getDayCountByMonth(year,month){
	var d1count = Date.parse(year+"-"+month+"-1");
	
	var str = "";
	if(month==12){
		str = (year+1)+"-1-1";
	}else{
		year+"-"+(month+1)+"-1"		
	}
	
	var d2count = Date.parse(str);	
	
	return parseInt((d2count-d1count)/(24*3600*1000));
}


function toWeek(num){			
	var result ;
	
	//2、根据用户是输入进行数据处理（逻辑判断）
	switch(num){
		case 0:result = "礼拜天";break;
		case 1:result = "礼拜一";break;
		case 2:result = "礼拜二";break;
		case 3:result = "礼拜三";break;
		case 4:result = "礼拜四";break;
		case 5:result = "礼拜五";break;
		case 6:result = "礼拜六";break;
		default:result = "请，您的输入有误，请输入0-6之间的数字";break;			
	}
	
	return result;
	
}