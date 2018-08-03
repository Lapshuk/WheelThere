import React, {Component} from 'react';
import DragIcon from './DragIcon'
import MapWrapper from './MapWrapper';
import NavHeader from '../../navheader';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';

export default class MapView extends Component {

  render() {
    return (
    	<div className = "MapViewWrapper">
    		<NavHeader/>
			<Row>  
				<Col xs = "2">
					<div className = "maps-container">
						Left panel
					</div>
					<div className = "drag-container">
          				<DragIcon/>
					</div>
				</Col>  
				<Col xs = "10" style = {{width:'100vw', height:'100vh'}}>     	
         	 		<MapWrapper/>
         	 	</Col>
          	</Row>

          	<div className = "sticky-right">
          		<a href= "/"><img style={{width: '70px', height: '70px'}}src = "http://www.free-icons-download.net/images/plus-icon-27951.png"/></a>
          		<br/>
          		Testing the bottom right
          	</div>
        </div>
    );
  }
}