
//1、对象：轮播图

function Banner(obj){
	//一、属性
	this.boxId = obj.boxId;//轮播图所在容器的id
	this.imgArr = obj.imgArr;//图片数组,这里面存放着每张图片的路径
	////当前透明度（1-0）
	this.currOpacity=1;
	//当前图片序号（淡入）
	this.currInOrd = 1;
	//当前图片序号（淡出）
	this.currOutOrd=1;
	//轮播图的宽和高
	this.width = obj.width;
	this.height = obj.height;
	
	//淡入淡出过程需要的时间；
	this.fadeInOutTime = obj.fadeInOutTime;
	this.stepCount = 20;//透明度从1-0需要多少次，20
	
	//停顿时间；
	this.pauseTime = obj.pauseTime;
	
	
	//按钮的颜色（原始颜色，高亮颜色）；
	this.btnColor = obj.btnColor;
	this.btnHighColor = obj.btnHighColor;
	this.btnWidth = obj.btnWidth;
	this.btnHeight = obj.btnHeight;
	this.btnLeft = obj.btnLeft;
	this.btnTop = obj.btnTop;
	//按钮的间隔
	this.btnSpace = obj.btnSpace;
	//按钮上是否有序号
	this.btnHasOrd = obj.btnHasOrd;

	//淡入淡出的定时器：
	this.myTimer = null;
	//轮播的定时器;
	this.bannerTimer=null;
	
	//二、方法
	//一、自动播放图片的代码
	//顺序走一步
	this.goStep=function(){
		//1、改变淡入的图片序号和淡出图片序号
		this.changeInOutOrdSeq();	
		//2、改变图片（淡入淡出效果）
		this.fadeInOutAll();
		//3、改变按钮背景颜色；
		this.changeBtnBgColor(this.currInOrd);	
	}
	
	//改变淡入淡出的图片序号（顺序）
	this.changeInOutOrdSeq = function(){
		//1.1 改变淡入的图片序号
		this.currInOrd++;
		if(this.currInOrd>this.imgArr.length){
			this.currInOrd = 1;
		}
		//1.2 求出淡出的图片序号
		this.currOutOrd = this.currInOrd-1;
		if(this.currOutOrd<=0){
			this.currOutOrd=this.imgArr.length;
		}	
	}
	
	this.fadeInOutAll=function(){
		//2.1淡入淡出前的初始化
		this.fadeInOutInit();//淡入淡出的初始化
		//2.2淡入淡出
		var that = this;
		this.myTimer=setInterval(function(){
			that.fadeInOut();
		},this.fadeInOutTime/this.stepCount);//淡入淡出的间隔；（已知总时间this.fadeInOutTime;明确次数（透明度从1-0需要多少次，20）；）	
	}
			
	this.fadeInOutInit=function(){
		//1、恢复透明度的初始值
		this.currOpacity = 1;
		
		//2、让淡入图片定位到盒子里，其它图片放在盒子外。
		for(let i=0;i<this.imgArr.length;i++){
			$(this.boxId).children[i].style.left = "-10000px";
		}			
		$(this.boxId).children[this.currInOrd-1].style.left = "0px";
		$(this.boxId).children[this.currOutOrd-1].style.left = "0px";
	}

	//淡入淡出
	//已知淡入图片序号，和淡出图片序号，完成淡入淡出的过程。
	this.fadeInOut=function(){
		//改变透明度的值
		this.currOpacity=this.currOpacity-1/this.stepCount;		
		//透明度不能越界
		if(this.currOpacity<1/this.stepCount){//切换完成（淡入淡出）
			clearInterval(this.myTimer);
			return;
		}
		//改变图片的透明度
		$(this.boxId).children[this.currOutOrd-1].style.opacity = this.currOpacity;  //1  2	
		$(this.boxId).children[this.currInOrd-1].style.opacity = 1-this.currOpacity;//2   3	
	}

	this.changeBtnBgColor=function(ord){
		//得到ul
		let ulObj = $(this.boxId).children[this.imgArr.length];
		//循环ul中li，把每个li的背景颜色重置为原始元素
		for(var i=0;i<this.imgArr.length;i++){
			ulObj.children[i].style.backgroundColor=this.btnColor;	
		}
		//把当前图片对应的li的背景颜色改为高亮
		ulObj.children[ord-1].style.backgroundColor=this.btnHighColor;	
	}
	
	//跳转到指定的图片；
	this.goImg=function(ord){
		//1、确定淡入的图片序号，和淡出的图片序号修改淡入的图片序号
		//1.1修改淡出图片的序号
		this.currOutOrd = this.currInOrd;//把淡入的图片序号赋给淡出的序号。	
		//1.2 修改淡入的图片序号
		this.currInOrd=ord;
		if(this.currInOrd>this.imgArr.length){
			this.currInOrd = 1;
		}	
		
		//2、改变图片（淡入淡出效果）
		this.fadeInOutAll();	
		//3、改变按钮背景颜色；
		this.changeBtnBgColor(this.currInOrd);
	}
	
	//初始化界面
	this.initUI = function(){
		//1、动态创建图片，放入容器中。
		for(let i=0;i<this.imgArr.length;i++){
			let imgObj = document.createElement("img");
			imgObj.src = this.imgArr[i];
			//imgObj.id = "img0"+(i+1);
			imgObj.style.cssText = "position:absolute;left:-10000px;top:0px;width:"+this.width+"px;height:"+this.height+"px;opacity:0";
			$(this.boxId).appendChild(imgObj);
		}
		//2、把前两张图片放在容器的可视区域，第一张图片的透明度为1.
		$(this.boxId).children[0].style.left = "0px";
		$(this.boxId).children[1].style.left = "0px";
		$(this.boxId).children[0].style.opacity = 1;
		
		
		//3、动态创建按钮
		let ulObj = document.createElement("ul");		
		ulObj.style.cssText = "position:absolute;left:"+this.btnLeft+"px;top:"+this.btnTop+"px;";		
		$(this.boxId).appendChild(ulObj);
		
		for(let i=0;i<this.imgArr.length;i++){
			let liObj = document.createElement("li");
			liObj.style.cssText = "list-style:none;float:left;margin-left:"+this.btnSpace+"px;width:"+this.btnWidth+"px;height:"+this.btnHeight+"px;background-color:"+this.btnColor+";border-radius:50%;text-align:center;";
			if(this.btnHasOrd){
				liObj.innerHTML = i+1;
			}
			ulObj.appendChild(liObj);
		}
		ulObj.children[0].style.backgroundColor=this.btnHighColor;	
	}
	
	this.addEvent = function(){
	/*
		$(this.boxId).onmouseover = function(){
			window.clearInterval(this.bannerTimer);
		}
		*/
		
		var that = this;
		//给轮播图的容器添加onmouseover事件（事件监听器写法，防止覆盖调用者本来的onmouseover事件）；
		addEvent1701($(this.boxId),"mouseover",function(){
						window.clearInterval(that.bannerTimer);
					},false);
		
		//给轮播图的容器添加onmouseout事件（事件监听器写法，防止覆盖调用者本来的onmouseout事件）；
		addEvent1701($(this.boxId),"mouseout",function(){
						that.bannerTimer = setInterval(function(){
							that.goStep();
						},that.fadeInOutTime+that.pauseTime);
					},false);
		
		//给每个按钮（li），添加onmouseDown事件，这个不用事件监听器，是因为，li是对象内部创建的。
		let liObjs = $(this.boxId).children[this.imgArr.length].children;		
		for(let i=0;i<liObjs.length;i++){
			liObjs[i].ord = i+1;//ord是li的自定义属性。
			liObjs[i].onmousedown = function(){
				that.goImg(this.ord);
			}
		}
	}
	
	this.startBanner = function(){
		var that = this;
		this.bannerTimer = setInterval(function(){
			that.goStep();
		},this.fadeInOutTime+this.pauseTime);
	}
	
	this.initUI();
	this.addEvent();
	this.startBanner();

}