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
                "left":"-100%",
                "display":"none"
            })
        }, false)
    }
    componentWillUnmount(){
        document.body.removeEventListener('click',function(){

        }, false);
    }
    render(){
        return(
            <div className="aslid_zce">
                <div className="ace_neno">
                    <span className="span_none">×</span>
                </div>
                <span className="ce_text">登录你的头条,精彩永不丢失</span>
                <span className="herheig"></span>
                <input type="text" className="username" placeholder="用户名"/>
                <input type="text" className="userpass" placeholder="密码"/>
                <input type="button" className="but" value="注册头条"/>
                <span className="herheig"></span>
                <input type="button" className="butzte"  onClick={this.clickFun} value="返回账号登录"/>
            </div>
        )
    }
}
