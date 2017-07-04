document.addEventListener('plusready', function(){
   			//console.log("所有plus api都应该在此事件发生后调用，否则会出现plus is undefined。"
   			
   		});


	      mui.init({				
			  pullRefresh : {
			    container:".aside",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
			    down : {
			      height:50,//可选,默认50.触发下拉刷新拖动距离, 
			      auto: false,//可选,默认false.自动下拉刷新一次
			      callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；			      
			      	var num = parseInt(Math.random()*10+10)
					
							var data={  
								showapi_test_draft:false,
								pointId:'5572bc9b6e362e6fce4d06cf',
								pointCode:35,
//								showapi_appid:'39641',
								showapi_sign:'7f915b2e63fa48be90a5eae52a0bb901'	,	
								channelId:"",
								channelName:"",
								title:"",
								page:1,
								needContent:0,
								needHtml:0,
								needAllList:1,
								maxResult:20
							}
							var xhr = new XMLHttpRequest();
							var url = "http://route.showapi.com/109-35?showapi_appid="+39641+"&showapi_sign=7f915b2e63fa48be90a5eae52a0bb901&pointCode="+35+"&page="+0+"&needAllList="+1+"&maxResult="+num+"";
							xhr.open("POST",url,true);
							xhr.send(JSON.stringify(data));	
							xhr.onreadystatechange = function(){
								if(xhr.readyState==4&&xhr.status==200){
									var obj = JSON.parse(xhr.responseText);
									console.log(obj);
									var objmaxResult = obj.showapi_res_body.pagebean.maxResult;
									if(obj&&objmaxResult){
										mui('.aside').pullRefresh().endPulldownToRefresh();										
										$(".recommend").text("为你推荐"+objmaxResult+"条信息")
										setTimeout(function(){$(".recommend").css("display",'block');},1000)										
										setTimeout(function(){
											$(".recommend").css("display",'none');
										},3000);
									}
								}
							}
												
						
			     }      
			    },	
			      up : {
				      height:5,//可选.默认50.触发上拉加载拖动距离
				      auto:false,//可选,默认false.自动上拉加载一次
				      contentrefresh : "拉进来",//可选，正在加载状态时，上拉加载控件上显示的标题内容
				      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
				    callback :function(){//必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；			      
			      	let num = parseInt(Math.random()*10+10)
						
							let data={  
								showapi_test_draft:false,
								pointId:'5572bc9b6e362e6fce4d06cf',
								pointCode:35,
//								showapi_appid:'39641',
								showapi_sign:'7f915b2e63fa48be90a5eae52a0bb901'	,	
								channelId:"",
								channelName:"",
								title:"",
								page:1,
								needContent:0,
								needHtml:0,
								needAllList:1,
								maxResult:20
							}
							let xhr = new XMLHttpRequest();
							let url = "http://route.showapi.com/109-35?showapi_appid="+39641+"&showapi_sign=7f915b2e63fa48be90a5eae52a0bb901&pointCode="+35+"&page="+0+"&needAllList="+1+"&maxResult="+num+"";
							xhr.open("POST",url,true);
							xhr.send(JSON.stringify(data));	
							xhr.onreadystatechange = function(){
								if(xhr.readyState==4&&xhr.status==200){
									let obj = JSON.parse(xhr.responseText);
									console.log(obj);
									let objmaxResult = obj.showapi_res_body.pagebean.maxResult;
									if(obj&&objmaxResult){
										mui('.aside').pullRefresh().endPullupToRefresh(false);				
										$(".recommend").text("为你推荐"+objmaxResult+"条信息")
										setTimeout(function(){$(".recommend").css("display",'block');},1000)										
										setTimeout(function(){
											$(".recommend").css("display",'none');
										},3000);
									}
								}
							}
												
							
			     } 
				    }	
			  }
			});