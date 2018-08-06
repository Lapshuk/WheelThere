import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";


export default class MyTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : props.userId,
      myTrips : []
    };
  }

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var userRef = db.collection('users');
    //getting the list of trips
    userRef.doc(this.state.userId).get().then(user => {
      this.setState({
        myTrips : user.data().my_trips
      });
    });
  };

  render() {
    return (
        <div className="App">
          <p>My Trips</p>
          /*Map Objects Here*/
          {this.state.myTrips}
        </div>
    );
  }
}