import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";


export default class MyTrips extends Component {
  constructor(props) {
    super();
    this.ownerId = props.ownerId;
  }

  componentDidMount() {

    //storage reference GETTING LINK
    var storage = firebase.storage();
    var pathRef = storage.ref('trips/1/main.jpg');
    pathRef.getDownloadURL().then(function(url) {
      console.log(url);
    });

    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('trips');
    //filtering trips that have provided owner
    var query = usersRef.where('owner_id', '==', this.ownerId);
    query.get().then(snapshot => {
      snapshot.forEach(trip => {
        //HERE WE GETTING ALL TRIPS BY THIS USER
        //DO SOMETHING WITH THEM
        var curr_trip = trip.data();

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