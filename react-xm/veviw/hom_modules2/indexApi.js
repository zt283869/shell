import React from 'react';
export default class Retlable extends React.Component{
	constructor() {
		super();
		this.state = {			
			newobj2: []
		};
		
	}
	componentWillMount(){
							var xhr = new XMLHttpRequest();
							var url = "http://route.showapi.com/196-1?&showapi_appid="+39641+"&showapi_sign=7f915b2e63fa48be90a5eae52a0bb901&num="+20+"";
							xhr.open("POST",url,true);
							xhr.send();	
							var that = this
							xhr.onreadystatechange = function(){
								if(xhr.readyState==4&&xhr.status==200){
									var obj = JSON.parse(xhr.responseText);
									that.state.newobj2.unshift(obj);																		
									that.setState(that.state)
									if(obj){
										mui('.aside').pullRefresh().endPulldownToRefresh();										
										$(".recommend").text("为你推荐"+20+"条信息")
										setTimeout(function(){$(".recommend").css("display",'block');},1000)										
										setTimeout(function(){
											$(".recommend").css("display",'none');
										},3000);
									}
								}
							}
			    }
	render(){	
	const {newobj2} = this.state;
	console.log(newobj2)
	const newList = newobj2.length ?  
		   newobj2.map((item,index) => (		 	
		   	item.showapi_res_body.newslist.map((itemw,index) => (
		   		<li key={index}>
		   	
		   		{itemw.title}
		   		<a href={itemw.url}><img src={itemw.picUrl} /></a>
		   		
		   		<span>
		   		{itemw.ctime}	
		   		
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

	      