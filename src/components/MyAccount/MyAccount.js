import React, {Component} from 'react';
import '../../App.css';
import * as firebase from 'firebase'

export default class MyAccount extends Component {

  constructor() {
    super();
    this.state = {
      set: false,
      about: "",
      email: "",
      first_name: "",
      last_name: "",
      my_trips: "",
      saved_trips: "",
      password: ""
    };
  };

  componentDidMount() {
    //getting userID from the link
    var userId = this.props.match.params.userId;
    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('users');
    //filtering users by ID
    var query = usersRef.where('user_id', '==', userId);
    query.get().then(snapshot => {
      snapshot.forEach(user => {
        var data = user.data();
        //setting state with received data
        this.setState({
          about: data.about,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
          my_trips: data.maps.my_trips,
          saved_trips: data.maps.saved_trips,
          password: data.password,
          set: true
        });
      });
    });
  }

  render() {
    return (

        <div className="App">
          HELLO FROM MY ACCOUNT
          {this.state.first_name}
        </div>
    );
  }
}