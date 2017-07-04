import React from 'react';
import jq from '../js/jquery-1.8.3.min.js';
import Header from './hom_login/header.js';
import Aside from './hom_login/aside.js';
import Clikjs from './hom_login/clikjs.js';
import {Router, Route, hashHistory,IndexRoute,Link,Redirect } from 'react-router';
export default class haeder extends React.Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        document.body.addEventListener('mousedown',function(){
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
			<div className="box_div">
			<Header />
			<Aside />
			<Clikjs />
			</div>
	)
	}
	
}
