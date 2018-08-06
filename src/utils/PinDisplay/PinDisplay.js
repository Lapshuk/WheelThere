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
		console.log("called a pin display");
		return (
			<div> 
				<img src = {this.state.image}/>
				<br/>
				<div> {this.state.title} </div>
			</div>
		);
	}

}