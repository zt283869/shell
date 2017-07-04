import React from 'react';
import Header from './hom_modules/header.js';
import Banner from './hom_modules/banner.js';
import Loaded from './hom_modules/Loaded.js';
import Aside from './hom_modules/aside.js';
export default class haeder extends React.Component{
	render(){
		return(
			<div className="box_div">
			<Header />
			<Banner />
			<Loaded />
			<Aside />
			</div>
	)
	}
	
}
