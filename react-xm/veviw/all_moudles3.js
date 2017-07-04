import React from 'react';
import Header from './hom_modules3/header.js';
import Loaded from './hom_modules3/Loaded.js';
import Aside from './hom_modules3/aside.js';
export default class haeder extends React.Component{
	render(){
		return(
			<div className="box_div">
			<Header />
			<Loaded />
			<Aside />
			</div>
	)
	}
	
}
