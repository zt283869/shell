import React from 'react';
export default class Retlable extends React.Component{
	constructor() {
		super();
		this.state = {
			newobj: []
		};
	}
	componentWillMount(){
			      	var num = parseInt(Math.random()*20+1);
			      	  let title = ["头条","新闻","财经","体育","娱乐","军事","教育","科技","NBA","股票","星座","女性","健康","育儿"];
				    let titlenum = title[parseInt(Math.random()*title.length)];
							let bartext = document.getElementsByClassName("baractive");
							var data={  
								showapi_test_draft:false,
								pointId:'5572bc9b6e362e6fce4d06cf',
								pointCode:35,
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
							var url = "http://route.showapi.com/109-35?showapi_appid="+39641+"&showapi_sign=7f915b2e63fa48be90a5eae52a0bb901&pointCode="+35+"&page="+0+"&needAllList="+1+"&maxResult="+num+"&title="+titlenum+"&maxResult="+20+"";
							xhr.open("POST",url,true);
							xhr.send(JSON.stringify(data));	
							var that = this
							xhr.onreadystatechange = function(){
								if(xhr.readyState==4&&xhr.status==200){
									var obj = JSON.parse(xhr.responseText);
									that.state.newobj.unshift(obj);
									that.setState(that.state)
									var objmaxResult = obj.showapi_res_body.pagebean.contentlist.length;
									if(obj&&objmaxResult){
										mui('.aside').pullRefresh().endPulldownToRefresh();										
										$(".recommend").text("为你推荐"+objmaxResult+titlenum+"条信息")
										setTimeout(function(){$(".recommend").css("display",'block');},1000)										
										setTimeout(function(){
											$(".recommend").css("display",'none');
										},3000);
									}
								}
							}
				 }	


	
	render(){	
const {newobj} = this.state;
		const newList = newobj.length ?  
		   newobj.map((item,index) => (		 	
		   	item.showapi_res_body.pagebean.contentlist.map((itemw,index) => (
		   		<li key={index}>
		   		<a href={itemw.link}>
		   		{itemw.desc}		   		
		   		</a>
		   		<span>
		   		{itemw.pubDate}	
		   		
		   		</span>
		   		</li>
		   	))
		   )):"网络正在加载......";
		
		return (
			<ul className="fer_ul">					
				{newList}
			</ul>	
		)
	}
	
}

	      