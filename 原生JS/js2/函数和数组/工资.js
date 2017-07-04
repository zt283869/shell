//工资
function getendMoney(baseSalary,zhangfu,joyear){
	var endMoney = baseSalary;
	for(var i = 0;i<joyear;i++){
		endMoney = baseSalary*(1+zhangfu);
	}
	return endMoney;
}
//一年的那一天
				function getDage(yearr,monthr,dater){
					var result;
					switch (Number(monthr)){
						case 1:
						result = dater;
						break;
					case 2:
						result = 31 + dater;
						break;

					case 3:
						result = 31 + 28 + Number(dater);
						break;

					case 4:
						result = 31 + 28 + 31 + dater;
						break;

					case 5:
						result = 31 + 28 + 31 + 28 + dater;
						break;

					case 6:
						result = 31 + 28 + 31 + 28 + 31 + dater;
						break;

					case 7:
						result = 31 + 28 + 31 + 28 + 31 + 28 + dater;
						break;

					case 8:
						result = 31 + 28 + 31 + 28 + 31 + 28 + 31 + dater;
						break;

					case 9:
						result = 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + dater;
						break;

					case 10:
						result = 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + 31 + dater;
						break;

					case 11:
						result = 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + dater;
						break;

					case 12:
						result = 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + 31 + 28 + 31 +dater;
						break;
				
					
					
					}
					if(monthr>2){
						if(yearr%400==0||(yearr%4==0&&yearr%100!==0)){
							alert("是润年的第" + result + "天。");
						}else{
							alert("是本年的第" + result + "天。");
						}
					}
				
}
				
function isDate(year,month,dater){
		if(year<1977||year>2029){
			return false;
		}
		if(month<1||month>12){
			return false;
		}
		if(dater<1||dater>31){
			return false;
		}
		if(Number(month)==4||Number(month)==6||Number(month)==9||Number(month)==11){
			if(Number(dater)>30){
				return false;
			}
		}else if(Number(month)==2){
			
				if(Number(dater)>29){
					return false;
				}
			}
		
		return true;
}




//






















