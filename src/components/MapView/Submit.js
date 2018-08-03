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




                };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
                // <Input type="Number" name="text" id="fun" placeholder="Fun" />
                // <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" />
                // <Input type="Number" name="text" id="rollability" placeholder="Rollability" />
                // <Input type="Number" name="text" id="transport" placeholder="Transport"/>

  postPin(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }



  render() {
    return (

    	<div>

        <NavHeader/>

        <Row>
          <Col xs = "4"></Col>
          <Col xs = "4">
            <Form>

              <FormGroup>
                <Label for="Description">Description</Label>
                <Input type="textarea" name="text" id="Description" value=this.state.description />
              </FormGroup>

              <FormGroup>
                <Label for="Address">Address</Label>
                <Input type="textarea" name="text" id="Address" value=this.state. />
              </FormGroup>

              <FormGroup>
                <Label for="Lat">Lat</Label>
                <Input type="Number" name="text" id="Lat" />
              </FormGroup>

              <FormGroup>
                <Label for="Lon">Lon</Label>
                <Input type="Number" name="text" id="exampleText" />
              </FormGroup>

              <FormGroup>
                <Label for="Access">Accessability</Label>
                <Input type="Number" name="text" id="fun" placeholder="Fun" />
                <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" />
                <Input type="Number" name="text" id="rollability" placeholder="Rollability" />
                <Input type="Number" name="text" id="transport" placeholder="Transport"/>
              </FormGroup>

              <FormGroup>
                <Input type="textarea" name="tip" id ="tip" placeholder="Any tips?"/>
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
