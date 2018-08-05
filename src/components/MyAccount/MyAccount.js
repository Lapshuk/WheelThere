import React, {Component} from 'react';
import '../../App.css';
import * as firebase from 'firebase'
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
    };
    this.userId = props.match.params.userId;

  };

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('users').doc(this.props.match.params.userId);
    //filtering users by ID
    usersRef.get().then((user) => {
      var data = user.data();
      //setting state with received data
      this.setState({
        about: data.about,
        profile_image: data.image,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        my_trips: data.maps.my_trips,
        saved_trips: data.maps.saved_trips,
        password: data.password,
        set: true
      });
    });
  };

  loadSavedTrips = () => {
    if (this.state.set == true) {
      return (<SavedTrips tripIds={this.state.saved_trips}/>);
    }
  };

  render() {
    return (
        <div className="App">
          <NavHeader/>
          <Row>
            <Col>
              <img src="https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg"
                   style={{width: '10vw', height: '15vh', borderRadius: '50%'}}/>
            </Col>
          </Row>
          <Row>
            <Col sm={{size: 'auto', offset: 3}}>
              <a href="">edit profile</a>
            </Col>
          </Row>

          <Col>
            <h3>{this.state.first_name} {this.state.last_name}</h3>
            <p>{this.state.my_trips.length} Maps</p>
            <p>{this.state.about}</p>
          </Col>

          <Row>
            <MyTrips ownerId={this.userId}/>
          </Row>

          <Row>
            {this.loadSavedTrips()}
          </Row>
          /*Map Objects Here*/
        </div>
    );
  }
}