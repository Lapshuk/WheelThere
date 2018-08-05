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
      stars : 0
    };
    this.userId = props.match.params.userId;
  };

  postTrip = () => {
    //referencing trips database
    const db = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    db.settings(settings);
    var tripsRef = db.collection('trips');
    tripsRef.add({
      name : this.state.name,
      owner_id : this.userId,
      pins : [],
      stars : this.state.stars,
      upVotes: this.state.upVotes,
    }).then(function (docRef){
      //TODO this prints the id of the new trip. This info is needed when creating pins for this trip
      console.log(docRef.id);
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
