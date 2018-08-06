import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../utils/NavHeader/NavHeader';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";


export default class MapView extends Component {
  constructor(props) {
    super(props);
    console.log(props);


  }


  render() {
    return (
    	<div>
    		<NavHeader/>
			<Row>
        <Col id = 'left-column' xs = "2">
					<div className = "maps-container">
						Left panel
					</div>
					<div className = "drag-container">
		     	 	    <div className = "box-border">
				          <img style = {{width: '30px', height: '50px'}} src = "https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"/>
				          <p>Drag to add to the map.</p>
				        </div>
					</div>
				</Col>
				<Col id = "mapwrapper" xs = "10" style = {{width:'100vw', height:'100vh'}}>
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
