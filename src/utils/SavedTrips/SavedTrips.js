import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";

export default class SavedTrips extends Component {
  constructor(props) {

    super();
    this.savedTripsList = props.tripIds;
  }

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('trips');
    //getting all trips from the saved_trips list
    for (let tripId of this.savedTripsList) {
      var query = usersRef.where('trip_id', '==', tripId);
      query.get().then(snapshot => {
        snapshot.forEach(trip => {
          //HERE WE GETTING ALL TRIPS BY THEIR IDs
          //DO SOMETHING WITH THEM
          var curr_trip = trip.data();
          //console.log(curr_trip);
        });
      });
    }
  };

  render() {
    return (
        <div className="App">
          <p>Saved Trips</p>
          /*Map Objects Here*/
        </div>
    );
  }
}