import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../navheader';
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import '../../App.css';
import firebase from "firebase"

export default class Submit extends Component {

  constructor(props) {
    super(props);


    this.state = {description: '',
                  address: '',
                  lat: 0,
                  lon: 0,
                  fun: 0,
                  bathroom: 0,
                  rollability: 0,
                  transport: 0,
                  tip: '',
                  tid: props.tid
                };


    this.postPin = this.postPin.bind(this);
  }

  postPin(event) {
    const db = firebase.firestore();
    db.collection('pins').doc()

    firebase.database().ref('pins/').set({
      description: this.state.description,
      address: this.state.address,
      lat: this.state.lat,
      lon: this.state.lon,
      fun: this.state.fun,
      bathroom: this.state.bathroom,
      rollability: this.state.rollability,
      transport: this.state.transport,
      tip: this.state.tip
    });
    event.preventDefault();
  }



  render() {
    return (

    	<div>

        <NavHeader/>

        <Row>
          <Col xs = "4"></Col>
          <Col xs = "4">
            <Form onsubmit={this.postPin}>
              <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="textarea" name="text" id="Description" value=this.state.description />
              </FormGroup>

              <FormGroup>
                <Label for="Address">Address</Label>
                <Input type="textarea" name="text" id="Address" value=this.state.address />
              </FormGroup>

              <FormGroup>
                <Label for="Lat">Lat</Label>
                <Input type="Number" name="text" id="Lat" value=this.state.lat />
              </FormGroup>

              <FormGroup>
                <Label for="Lon">Lon</Label>
                <Input type="Number" name="text" id="exampleText" value=this.state.lon />
              </FormGroup>

              <FormGroup>
                <Label for="Access">Accessability</Label>
                <Input type="Number" name="text" id="fun" placeholder="Fun" value=this.state.fun />
                <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" value=this.state.bathroom/>
                <Input type="Number" name="text" id="rollability" placeholder="Rollability" value=this.state.rollability/>
                <Input type="Number" name="text" id="transport" placeholder="Transport" value=this.state.transport/>
              </FormGroup>

              <FormGroup>
                <Input type="textarea" name="tip" id ="tip" placeholder="Any tips?" value=this.state.tip/>
              </FormGroup>

            </Form>
          </Col>
          <Col xs = "4"></Col>
        </Row>

      </div>
    );
  }
}
// <Col xs = "2">
// Left panel
// </Col>
// <Col xs = "10">
//
// </Col>

// <Col xs = "10" style = {{width:'100vw', height:'100vh'}}>
//  	 		<MapWrapper/>
// </Col>
