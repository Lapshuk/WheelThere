import React, {Component} from 'react';

import NavHeader from '../../utils/NavHeader/NavHeader';
import {Container, Row, Col} from 'reactstrap';
import {Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

import '../../App.css';
import * as firebase from "firebase";


export default class NewTrip extends Component {

  constructor(props) {
    super(props);
    this.state = {
      upVotes: 0,
      name: "",
      pins: [],
      image: null,
      stars: 0,
      userId : props.match.params.userId
    };

  };

  postTrip = () => {
    //referencing trips database
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    var tripsRef = db.collection('trips');
    tripsRef.add({
      name: this.state.name,
      owner_id: this.state.userId,
      pins: [],
      stars: this.state.stars,
    }).then(function (trip) {
      //TODO this returns the the new trip. This info is needed when creating pins for this trip.
      //updating my_trips for the user
      var userRef = db.collection('users').doc(this.state.userId);
      userRef.get().then(user => {
        //getting the current list
        var tripsList = user.data().my_trips;
        tripsList.push(trip.id);
        //updating the list of my_trips
        userRef.update({
          my_trips : tripsList
        });
      });
    });
  };


  render() {
    return (
        <div>
          AFTER (name, owner_id) FIELDS set in state call postTrip() to push trip to DB
        </div>
    );
  }


}
