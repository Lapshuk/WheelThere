import React, {Component} from 'react';

export default class PinDisplay extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: props.title,
			image: props.image
		}
	}
	render(){
		console.log("returned another div");
		return (
			<div> 
				<div> {this.state.title} </div>
				<img style={{width: '100%', height: '100%'}}src = {this.state.image}/>
				<br/>
			</div>
		);
	}

}