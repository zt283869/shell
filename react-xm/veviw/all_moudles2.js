import React from 'react';
import Aside from './hom_modules2/aside.js';
import Loaded from './hom_modules/Loaded.js';
export default class haeder extends React.Component{
	render(){
		return(
			<div className="box_div">
			<Loaded />
			<Aside />
			</div>
	)
	}
	
}
