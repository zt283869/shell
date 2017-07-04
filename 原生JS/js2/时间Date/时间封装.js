function showTimer(d){
	var y1 = d.getFullYear();
	var m1 = d.getMonth()+1;
	var d1 = d.getDate();
	
	var week = d.getDay();
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	mm = mm<10?'0'+mm:mm;
	ss = ss<10?'0'+ss:ss;
	return y1+'年'+m1+'月'+d1+'日'+' '+hh+':'+mm+':'+ss+' '+toweek(week);
}

function timer(d){
	var hh = d.getHours();
	var mm = d.getMinutes();
	var ss = d.getSeconds();
	mm = mm<10?'0'+mm:mm;
	ss = ss<10?'0'+ss:ss;
	return hh+"小时"+mm+"分"+ss+"秒";
}
function toweek(num){
	var result;
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






