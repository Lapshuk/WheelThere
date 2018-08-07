import React, {Component} from 'react';

import NavHeader from '../NavHeader/NavHeader';
import {Container, Row, Col} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";
import {Redirect} from 'react-router-dom'


export default class NewTrip extends Component {

  constructor(props) {
    super(props);
    console.log(props.userId);
    this.state = {
      upVotes: 0,
      name: "",
      pins: [],
      image: null,
      image_file: null,
      stars: 0,
      ownerId: props.userId
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    // 0ry0EHh62ST3HpyeoJem9xb2yyK2
  };

  handleFileChange = (event) => {
    this.setState({image_file: event.target.files[0]});
  };

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  //post image to the cloud
  //sets the state.image to have url
  postImageToCloud = (tripId, image) => {
    // Create a root reference to push trip image to cloud storage
    var storageRef = firebase.storage().ref();
    var imgRefPath = 'trips/' + tripId + "/" + "main" + ".jpg";
    var dbImageRef = storageRef.child(imgRefPath);
    dbImageRef.put(image).then(rec => {
      rec.ref.getDownloadURL().then(url => {
        this.setState({
          image: url
        });
      });
    });

  };

  //set the image url for the trip in DB
  setImageInTripDb = (tripId) => {
    const db = firebase.firestore();
    var tripRef = db.collection('trips').doc(tripId);
    tripRef.update({
      image: this.state.image
    });
  };

  //post trip to the storage
  postTrip = (event) => {
    event.preventDefault();
    event.stopPropagation();

    //referencing trips database
    const db = firebase.firestore();
    var tripsRef = db.collection('trips');
    var _this = this;
    tripsRef.add({
      name: this.state.name,
      owner_id: this.state.ownerId,
      pins: [],
      stars: this.state.stars,
    }).then(function (trip) {
      //setting tripId and call back function is to push image to cloud
      _this.postImageToCloud(trip.id, _this.state.image_file, () => _this.setImageInTripDb(trip.id));
      _this.setState({
        tripId: trip.id
      });

      //updating my_trips list for the user
      var userRef = db.collection('users').doc(_this.state.ownerId);
      userRef.get().then(user => {
        //getting the current list
        var tripsList = user.data().my_trips;
        tripsList.push(trip.id);
        //updating the list of my_trips
        userRef.update({
          my_trips: tripsList
        });
      });

    }).then(() => {
      window.location.assign('/mapview/' + _this.state.tripId);
    });
  };


  render() {
    return (
        <Form onSubmit={this.postTrip}>
          <FormGroup>
            <Label for="tripName">Trip Name</Label>
            <Input type="name" name="name" id="tripName" onChange={this.handleNameChange}/>
          </FormGroup>
          <FormGroup>
            <Label for="file">File</Label>
            <Input type="file" name="file" id="file" onChange={this.handleFileChange}/>
          </FormGroup>
          <Button>Submit</Button>
        </Form>

    );
  }


}
