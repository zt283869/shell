import React from 'react';
export default class Retlable extends React.Component{
	constructor() {
		super();
		this.state = {
			newobj3: []
		};
	}
	componentWillMount(){
			      	var num = parseInt(Math.random()*10+10);
			      	  let title = [1,2,3,4,6,7,9,10,11,12,13,14,15,16,17,18,19,21,22,23,25,26,27,28,30,31,36,37,38,39,40,41,42];
				    let titlenum = title[parseInt(Math.random()*title.length)];						
							var xhr = new XMLHttpRequest();
							var url = "http://route.showapi.com/254-1?&showapi_appid="+39641+"&showapi_sign=7f915b2e63fa48be90a5eae52a0bb901&typeId="+titlenum+"&space=day";
							xhr.open("POST",url,true);
							xhr.send();	
							var that = this
							xhr.onreadystatechange = function(){
								if(xhr.readyState==4&&xhr.status==200){
									var obj = JSON.parse(xhr.responseText);
									console.log(obj)
									that.state.newobj3.unshift(obj);
									that.setState(that.state)
									var objmaxResult = obj.showapi_res_body.pagebean.contentlist[0].typeName;
									if(obj){
										mui('.aside').pullRefresh().endPulldownToRefresh();										
										$(".recommend").text("为你推荐"+objmaxResult+"信息")
										setTimeout(function(){$(".recommend").css("display",'block');},1000)										
										setTimeout(function(){
											$(".recommend").css("display",'none');
										},3000);
									}
								}
							}
				 }
	render(){	
const {newobj3} = this.state;
console.log(newobj3)
		const newList = newobj3.length ?  
		   newobj3.map((item,index) => (		 	
		   	item.showapi_res_body.pagebean.contentlist.map((itemw,index) => (
		   		<li key={index}>
		   		{itemw.desc}		   		
		   		<a href={itemw.url}>
		   		<img src={itemw.img} />
		   		</a>
		   		
		   		<span>
		   		{itemw.name}	
		   		
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

	

	      