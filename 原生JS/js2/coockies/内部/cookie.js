//cookie存时间
function changedate(n){
	var d = new Date();
	d.setDate(d.getDate()+n);
	return d; 
}
//保存cookie
function savecookie(key,value,n){
	document.cookie = encodeURIComponent(key)+"="+encodeURIComponent(value)+";expires="+changedate(n);
}

//删除cookie
function deletecookie(key){
	savecookie(key,"",-1);
}
//获取Cookie
function getCookie(key){
	var dater = decodeURIComponent(document.cookie).replace(/\s/g,"").split(";");
	for(var i=0;i<dater.length;i++){
		if(dater[i].split("=")[0]==key){
			return dater[i].split("=")[1];
		}
	}
}

