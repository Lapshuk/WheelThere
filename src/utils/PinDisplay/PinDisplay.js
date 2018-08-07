import React, {Component} from 'react';
import ReactDOM from 'react-dom';

export default class PinDisplay extends Component{
	constructor(props){
		super(props);
		this.state = {
			title: props.title,
			image: props.image,
			mapRef: props.mapRef,
			lat: props.lat,
			lon: props.lon
		}
		this.showModal = this.showModal.bind(this);
	}
	showModal(event){
		event.preventDefault();
		event.stopPropagation();
		var lon = this.state.lon;
		var lat = this.state.lat;
		this.state.mapRef.current.togglePinInfoModal(lat, lon);
	}
	render(){
		
		return (
			<div className = "display-box"> 
				<div> {this.state.title} </div>
				<a href = '/' onClick = {this.showModal}> <img onClick = {this.showModal} style={{width: '100%', height: '100%'}} src = {this.state.image}/></a>
				<br/>
			</div>
		);
	}

}