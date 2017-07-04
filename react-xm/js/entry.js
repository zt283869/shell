import React from 'react';
import ReactDom from 'react-dom';
import classnames from 'classnames';
import IndexApi from './indexApi.js';
import login from './Commend.js';
import Ve_index from '../veviw/all_moudles.js';
import Ve_index2 from '../veviw/all_moudles2.js';
import Ve_index3 from '../veviw/all_moudles3.js';
import Ve_allogin from '../veviw/all_login.js';
import {Router, Route, hashHistory,IndexRoute,Link,Redirect } from 'react-router';
const vc_all = ({children})=>(
	<div className="box_divone">
		<Ve_index />
		{children}
	</div>
)
const vc_all2 = ({children})=>(
	<div className="box_divone">
		<Ve_index2 />
		{children}
	</div>
)
const vc_all3 = ({children})=>(
	<div className="box_divone">
		<Ve_index3 />
		{children}
	</div>
)
const vc_allogin = ({children})=>(
	<div className="box_divone">
		<Ve_allogin />
		{children}
	</div>
)

ReactDom.render((
		<Router history={hashHistory}>
			<Route name="head_and_body" path='/' component={vc_all}></Route>
			<Route name="head_and_body" path='/vidoe' component={vc_all2}></Route>
			<Route name="head_and_body" path='/vidoes' component={vc_all3}></Route>
			<Route name="head_and_body" path='/login' component={vc_allogin}>

			</Route>
		</Router>
	),document.getElementById('box'))
