import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../utils/NavHeader/NavHeader';
import {Container, Row, Col} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

import '../../App.css';
import * as firebase from "firebase";


export default class Submit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      description: '',
      address: '',
      lat: 0,
      lon: 0,
      fun: 0,
      bathroom: 0,
      rollability: 0,
      transport: 0,
      tip: '',
      image: null,
      img_url: ''
    };
    this.tripId = props.match.params.tripId;

    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleLatChange = this.handleLatChange.bind(this);
    this.handleLonChange = this.handleLonChange.bind(this);
    this.handleFunChange = this.handleFunChange.bind(this);
    this.handleBathroomChange = this.handleBathroomChange.bind(this);
    this.handleRollabilityChange = this.handleRollabilityChange.bind(this);
    this.handleTransportChange = this.handleTransportChange.bind(this);
    this.handleTipChange = this.handleTipChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.postPin = this.postPin.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.pushPinToStorage = this.pushPinToStorage.bind(this);
    this.updatePinsList = this.updatePinsList.bind(this);

  }

  handleDescriptionChange(event) {
    this.setState({description: event.target.value});
  }

  handleAddressChange(event) {
    this.setState({address: event.target.value});
  }

  handleLatChange(event) {
    this.setState({lat: event.target.value});
  }

  handleLonChange(event) {
    this.setState({lon: event.target.value});
  }

  handleFunChange(event) {
    this.setState({fun: event.target.value});
  }

  handleBathroomChange(event) {
    this.setState({bathroom: event.target.value});
  }

  handleRollabilityChange(event) {
    this.setState({rollability: event.target.value});
  }

  handleTransportChange(event) {
    this.setState({transport: event.target.value});
  }

  handleTipChange(event) {
    this.setState({tip: event.target.value});
  }

  handleFileChange(event) {
    this.setState({image: event.target.files[0]});
  }

  updatePinsList(tripRef, pins) {
    //updating trip in db
    tripRef.update({
      "pins": pins
    });
  }

  pushPinToStorage(imgPath, pin_ref) {
    var storageRef = firebase.storage().ref();
    //this should be bound
    var self_ref = this;
    //get public link for image
    storageRef.child(imgPath).getDownloadURL().then(function (url) {
      self_ref.setState({img_url: url});
      //push pin to firestore
      pin_ref.add({
        description: self_ref.state.description,
        address: self_ref.state.address,
        lat: self_ref.state.lat,
        lon: self_ref.state.lon,
        fun: self_ref.state.fun,
        bathroom: self_ref.state.bathroom,
        rollability: self_ref.state.rollability,
        transport: self_ref.state.transport,
        tip: self_ref.state.tip,
        image: self_ref.state.img_url
      }).then(function (docRef) {
        //gets the ID of newly created doc
        //add the pin id to the trip
        const db = firebase.firestore();
        var tripRef = db.collection('trips').doc(self_ref.tripId);
        var pins = [];
        tripRef.get().then(function (trip) {
          //getting current list of pins and pushing newly created pin
          pins = trip.data().pins;
          pins.push(docRef.id);
          //TODO might not need to force to run next line right after the previous function done. Works for now
          self_ref.updatePinsList(tripRef, pins)
        });
      });
    });
  };


  postPin(event) {
    //referencing pins database
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    var pin_ref = db.collection('pins');


    //referencing the trip to update pins list
    // var trip_ref = db.collection('trips');
    // var query = usersRef.where('user_id', '==', this.props.match.params.userId);

    // Create a root reference to push pin to cloud storage
    var storageRef = firebase.storage().ref();
    var imgRefPath = 'trips/' + this.tripId + "/pins/" + "1" + ".jpg";
    var dbImageRef = storageRef.child(imgRefPath);
    event.preventDefault();

    var self_ = this;
    dbImageRef.put(this.state.image).then(function (snapshot) {
      if (snapshot.state == "success") {
        self_.pushPinToStorage(imgRefPath, pin_ref);
      }
    });
  }


  render() {
    return (

        <div>

          <NavHeader/>

          <Row>
            <Col xs="4"></Col>
            <Col xs="4">
              <Form onSubmit={this.postPin}>
                <FormGroup>
                  <Label for="Description">Description</Label>
                  <Input type="textarea" name="text" id="Description" value={this.state.description}
                         onChange={this.handleDescriptionChange}/>
                </FormGroup>

                <FormGroup>
                  <Label for="Address">Address</Label>
                  <Input type="textarea" name="text" id="Address" value={this.state.address}
                         onChange={this.handleAddressChange}/>
                </FormGroup>

                <FormGroup>
                  <Label for="Lat">Lat</Label>
                  <Input type="Number" name="text" id="Lat" value={this.state.lat} onChange={this.handleLatChange}/>
                </FormGroup>

                <FormGroup>
                  <Label for="Lon">Lon</Label>
                  <Input type="Number" name="text" id="exampleText" value={this.state.lon}
                         onChange={this.handleLonChange}/>
                </FormGroup>

                <FormGroup>
                  <Label for="Access">Accessibility</Label>
                  <Input type="Number" name="text" id="fun" placeholder="Fun" value={this.state.fun}
                         onChange={this.handleFunChange}/>
                  <Input type="Number" name="text" id="bathroom" placeholder="Bathroom" value={this.state.bathroom}
                         onChange={this.handleBathroomChange}/>
                  <Input type="Number" name="text" id="rollability" placeholder="Rollability"
                         value={this.state.rollability} onChange={this.handleRollabilityChange}/>
                  <Input type="Number" name="text" id="transport" placeholder="Transport" value={this.state.transport}
                         onChange={this.handleTransportChange}/>
                </FormGroup>

                <FormGroup>
                  <Input type="textarea" name="tip" id="tip" placeholder="Any tips?" value={this.state.tip}
                         onChange={this.handleTipChange}/>
                </FormGroup>

                <FormGroup>
                  <Input type="file" name="picture" id="picture" onChange={this.handleFileChange}/>
                </FormGroup>
                <Button type="submit" color="secondary">Submit</Button>
              </Form>
            </Col>
            <Col xs="4"></Col>
          </Row>

        </div>
    );
  }
}
