import Loginjs from  '../../js/Commend.js';
import jq from '../../js/jquery-1.8.3.min.js';
import React from 'react';
export default class asider extends React.Component{
	constructor(props){
		super(props);

	}

    componentDidMount(){
        document.body.addEventListener('click',function(){
          $('.aslid_zce').css({
			  "left":0,
			  "display":"block"
		  })

        }, false);
    }
    componentWillUnmount(){
        document.body.removeEventListener('click',function(){

		}, false);
    }
	render(){
		return(
				<aside className="aside">
					<div className="aside_name">
						<input type="text" className="username" placeholder="用户名"/>
						<input type="text" className="userpass" placeholder="密码"/>
						<input type="button" className="but" value="进入头条"/>
						<span></span>
						<input type="button" className="butzteClick" onClick={this.clickFun} value="注册头条账号"/>
					</div>
				</aside>
		)
	}
}