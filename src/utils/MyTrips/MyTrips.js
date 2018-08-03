import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";

export default class MyTrips extends Component {
  constructor(){
    super();

  }

  componentDidMount() {
    this.ownerId = this.props.ownerId;

    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('trips');
    //filtering users by ID
    var query = usersRef.where('owner_id', '==', 1);
    query.get().then(snapshot => {
      snapshot.forEach(trip => {
        //HERE WE GETTING ALL TRIPS BY THIS USER
        //DO SOMETHING WITH THEM
        var curr_trip = trip.data();
        console.log(curr_trip);
      });
    });
  };
    render() {
        return (
            <div className="App">
                <p>My Trips</p>
                /*Map Objects Here*/
            </div>
        );
    }
}