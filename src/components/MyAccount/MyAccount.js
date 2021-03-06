import React, {Component} from 'react';
import '../../App.css';
import './MyAccount.css';
import * as firebase from 'firebase';
import MyTrips from "../../utils/MyTrips/MyTrips.js";
import SavedTrips from "../../utils/SavedTrips/SavedTrips.js";
import {Container, Row, Col} from 'reactstrap';
import NavHeader from '../../utils/NavHeader/NavHeader';

export default class MyAccount extends Component {

  constructor(props) {
    super();
    this.state = {
      set: false,
      about: "",
      email: "",
      first_name: "",
      last_name: "",
      my_trips: "",
      saved_trips: "",
      password: "",
      userId: props.match.params.userId
    };

  };

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var userRef = db.collection('users').doc(this.state.userId);
    userRef.get().then((user) => {
      var data = user.data();
      this.setState({
        about: data.about,
        image: data.image,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        saved_trips: data.saved_trips,
        my_trips: data.my_trips,
        set: true
      });

    });
  }


  loadSavedTrips = () => {
    if (this.state.set == true) {
      return (<SavedTrips tripIds={this.state.saved_trips}/>);
    }
  };

  render() {
    return (
        <div className="App">
          <NavHeader/>
          <div className="account">

            <div>
              <img src="https://t3.ftcdn.net/jpg/00/64/67/80/240_F_64678017_zUpiZFjj04cnLri7oADnyMH0XBYyQghG.jpg"
                   className="account-picture"/>
            </div>

            <a href="">edit profile</a>
            <h3>{this.state.first_name} {this.state.last_name}</h3>


            <p>{this.state.my_trips.length} Maps</p>
            <p>{this.state.about}</p>

            <MyTrips userId={this.state.userId}/>
            {this.loadSavedTrips()}
          </div>
        </div>
    );
  }
}
