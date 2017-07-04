var code = "";
var boxpd = false;
var nameZz = /^[a-zA-Z\d]{5,10}/;
var loginL = /^([a-zA-Z]){1}\w{5,20}$/;
var passwor = /^[a-zA-Z\d]{8,}$/;
var purchaserName = /[\u4e00-\u9fa5]{3,10}/;
var contactpop = /^[\u4e00-\u9fa5]{2,5}/;
var Modphone = /^1[385]\d{9}$/;
var email = /^\d{5,12}@([q]{2}|[Q]{2})\.(com|cn)$/;
var mename = document.getElementById("mename");
var Name = document.getElementById("Name");
//封装的失去焦点
function getZE(ze,obj,span){
	if(ze.test(obj.value)){
		span.innerHTML = "√";
		boxpd = true;
	}else{
		span.innerHTML = "×";
		boxpd = false;
	}
}

mename.onblur=function(){
	getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
}

account.onblur = function(){
	getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(passwor,passwd,spasswd);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
}
passwd.onblur = function(){
	getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
}
passwdpasswd.onblur = function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
}
chasername.onblur = function(){
	getZE(purchaserName,chasername,schasername);
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
}

Modepone.onblur = function(){
	getZE(Modphone,Modepone,sModepone);
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(contactpop,contactpeo,scontactpeo);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
}

contactpeo.onblur = function(){
	getZE(contactpop,contactpeo,scontactpeo);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(contactpop,meemail,scontactpeo);
	window.getZE(email,meemail,smeemail);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);

}


meemail.onblur = function(){
	getZE(contactpop,meemail,scontactpeo);
	window.getZE(contactpop,contactpeo,scontactpeo);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(email,meemail,smeemail);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
}
meemail.onblur = function(){
	getZE(email,meemail,smeemail);
		getZE(contactpop,meemail,scontactpeo);
	window.getZE(contactpop,contactpeo,scontactpeo);
	(function(){
	if(passwd.value==""){
		spasswdpasswd.innerHTML = "×";		
		boxpd = false;
	}
	if(spasswd.innerHTML=="√"){
		if(passwd.value==passwdpasswd.value){
			spasswdpasswd.innerHTML = "√";
			boxpd=true;
		}
	}else{
		spasswdpasswd.innerHTML = "×";
		boxpd=false;
	}
})();
	window.getZE(Modphone,Modepone,sModepone);
	window.getZE(purchaserName,chasername,schasername);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(passwor,passwd,spasswd);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
	window.getZE(nameZz,mename,Name);
	window.getZE(loginL,account,saccount);
}

//全部判断

//三级联动
var pro = document.getElementById("pro");
var city = document.getElementById("city");
var area = document.getElementById("area")
	ajax("city1.json",function(res){
				var oChina = JSON.parse(res);
				// 省份
					for(var i=0;i<oChina.length;i++){
			//			oChina[i].name
						var oOption = document.createElement("option");
						oOption.value = i;
						oOption.innerHTML =  oChina[i].name;
						pro.appendChild(oOption);
					}
					
					//	城市的加载
					pro.onchange = function(){
						city.innerHTML = "<option>请选择城市</option>";
						area.innerHTML = "<option>请选择区县</option>";
						var x = pro.value;
					//	console.log(x);
						var data = oChina[x].city;
						for(var i=0;i<data.length;i++){
							var oOption = document.createElement("option");
							oOption.value = i;
							oOption.innerHTML =  data[i].name;
							city.appendChild(oOption);
						}
					}
					
					//	区县的加载
					city.onchange = function(){
						area.innerHTML = "<option>请选择区县</option>";
						var x = pro.value;
						var y = city.value;
					//	console.log(x+"-"+y);
						var data = oChina[x].city[y].area;
						for(var i=0;i<data.length;i++){
							var oOption = document.createElement("option");
//							oOption.value = i;
							oOption.innerHTML =  data[i];
							area.appendChild(oOption);
						}
					}
			});

//验证码

function verift(){
		
		var imgSrcArr = ["49.jpg","50.jpg","51.jpg"
		,"52.jpg","53.jpg","54.jpg","55.jpg","56.jpg"
		,"57.jpg","65.jpg","66.jpg","67.jpg","68.jpg"
		,"69.jpg","70.jpg","71.jpg"
		,"72.jpg","73.jpg","74.jpg","75.jpg","76.jpg"
		,"77.jpg","78.jpg","79.jpg"
		,"80.jpg","81.jpg","82.jpg","83.jpg","84.jpg"
		,"85.jpg","86.jpg","87.jpg"
		,"88.jpg","89.jpg","90.jpg","97.jpg","98.jpg"
		,"99.jpg","100.jpg","101.jpg"
		,"102.jpg","103.jpg","104.jpg","105.jpg","106.jpg"
		,"107.jpg","108.jpg","109.jpg"
		,"110.jpg","111.jpg","112.jpg","113.jpg","114.jpg"
		,"115.jpg","116.jpg","117.jpg"
		,"118.jpg","119.jpg","120.jpg","121.jpg","122.jpg"];
		var numA  = ["1","2","3"
		,"4","5","6","7","8","9"
		,"A","B","C","D"
		,"E","F","G"
		,"H","i","J","K","L"
		,"M","N","O"
		,"P","Q","R","S","T"
		,"U","V","W"
		,"X","Y","Z","a","b"
		,"c","d","e"
		,"f","g","h","I","j"
		,"k","l","m"
		,"n","o","p","q","r"
		,"s","t","u"
		,"v","w","x","y","z"];
		
		var num = 0;
		var imgSrcStr = "";
		var Theimg = imgSrcArr.length;
		for(var i=0;i<4;i++){		
			num = parseInt(Math.random()*Theimg);		 
			code+=numA[num];
			imgSrcStr+="<img src='images/"+imgSrcArr[num]+"' />";
			
		}

		document.getElementById("idation").innerHTML = imgSrcStr;
		
		
	}

dationcode.onblur = function(){
	if(dationcode.value.toUpperCase()==code.toUpperCase()){
				dationcodejudge.innerHTML = "√";				
				boxpd=true;
			}else{
			dationcodejudge.innerHTML = "×";
				code="";
				dationcode.value="";
				verift();
				boxpd=false;						
			}
	
	
}
nxet.onclick = function(){
	if(dationcode.value.toUpperCase()==code.toUpperCase()){
				dationcodejudge.innerHTML = "√";
				boxpd=true;
			}else{
			dationcodejudge.innerHTML = "×";
				code="";
				verift();
				boxpd=false;						
			}
}



verify.onclick = function(){
	if(dationcode.value==""){
			alert("请输入验证码");
			boxpd=false;
			return;
			}
	
	var userly = document.getElementById("userly")
	var mename = document.getElementById("mename")
	if(mename.value==""){
		boxpd=false;
	}
	if(boxpd==false){
		alert("请认真填写信息！")
		return;
	}
	
	if(userly.value==""){
		boxpd=false	
	}else{
		boxpd=true;
		savecookie("liuyan",userly.value,4)
		alert("你的地址已经存入cookies!");		
	}
	if(boxpd=true){
		alert("验证全部完成！即将进入主页");
		document.location = "http://www.taobao.com";
	}
}
