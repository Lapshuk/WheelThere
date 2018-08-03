import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../utils/NavHeader/NavHeader';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';

export default class MapView extends Component {

  render() {
    return (
    	<div>
    		<NavHeader/>
			<Row>  
				<Col>
				Left panel
				</Col>  
				<Col style = {{width:'100vw', height:'50vh'}}>     	
         	 		<MapWrapper/>
         	 	</Col>
          	</Row>
          	<Row>
          		<Col> Where is my content?</Col>
          	</Row>
        </div>
    );
  }
}