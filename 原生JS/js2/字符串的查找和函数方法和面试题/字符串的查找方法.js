//正则去前后空格
function deleBlank(str){
	var Text1 = document.getElementById(str);
	var met = /(^\s*)|(\s*\$)/;
	var mat = Text1.value.replace(met,'');
		Text1.value = mat;
	
}



function getStr(str){
	var Text2 = document.getElementById(str).value;
	var isnum1 = 0;
	var isnum2 = 0;
	var smallLen = 0;
	var smallJoin = '';
	var bijLen = 0;
	var bijJoin = '';
	var arr = Text2.split("");
	for(var i=0;i<Text2.length;i++){
		if (/^[a-z]+$/.test( Text2[i] )){
			isnum1++;			
		}
		if(/^[A-Z]+$/.test( Text2[i] )){
			isnum2++;
			}	
	  	if(isnum1!=0&&isnum2==0){
	  		var met = /[a-z]/g;
			var small = Text2.match(met);
			var smallLen = small.length; 
			var smallJoin = small.join('|');
	  	}
			
		if(isnum1==0&&isnum2!=0){
			var met1 = /[A-Z]/g;
			var bij = Text2.match(met1);
			var bijLen = bij.length;
			var bijJoin = bij.join('|');	
		}
		if(isnum1!=0&&isnum2!=0){
			var met = /[a-z]/g;
			var small = Text2.match(met);
			var smallLen = small.length; 
			var smallJoin = small.join('|');
			var met1 = /[A-Z]/g;
			var bij = Text2.match(met1);
			var bijLen = bij.length;
			var bijJoin = bij.join('|');	
		}
	}
		
		
	return alert("小写字母是"+smallJoin+"共"+smallLen+"位   "+"大写字母是"+bijJoin+"共"+bijLen+"位");
}


//勾股定理
function getBig(x,y){
	var num = 0;
	var _x = document.getElementById(x).value;
	var _y = document.getElementById(y).value;
		num = _x*_x+_y*_y;
	return alert("三角形的斜边是"+num+"m");
}

function registered(){
	var w = true;
	var yhm = document.getElementById("t1").value;
	var mim = document.getElementById("t2").value;
	var zmim = document.getElementById("t3").value;
	var nc = document.getElementById("t4").value;
	var tj = document.getElementById("t5");
	if(yhm==''){
		alert("用户名不能为空");
		return;
	}
	if(Number(yhm.charAt(0))>='0'&&Number(yhm.charAt(0))<='9'){
		alert('不能以数字开头！');
		var w = false;
		return;
	}
	if(Number(yhm.length<6)||Number(yhm.length>20)){
		alert('请输入6-20之间的字符');
		var w = false;
		return;
	}
	var mat = /[A-Z_0-9a-z_0-9A-Z_0-9_a-zA-Z_0-9a-z_]/g;
	if(mat.test(yhm)){
		alert("用户名可以使用")
		
	}
	
	}
	
//字符串的压缩
function Strcomprs(str){
	var _str = document.getElementById(str);
	var surrChar = _str.value.charAt(0);
	var num = 1;//保存当前的重复次数
	var rarStr = '';//定义一个字符串保存最终的变量
	for(var i=1;i<_str.length;i++){
		//取出字符串中的字符
		//判断是否和surrChar相等，如果相等num++;
		if(_str.charAt(i)==surrChar){
			num++;
		}else{//如果不相等就把num和surrChar拼接到rarStr,还需要给surrChar重新赋值，num重新设置成1
			rarStr = rarStr+surrChar+num;
			surrChar = _str.charAt(i);
			num = 1;
		}
	}
	rarStr = rarStr+surrChar+num;
	_str.value = rarStr;
	
}




























