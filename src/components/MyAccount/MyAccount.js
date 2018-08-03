import React, {Component} from 'react';
import '../../App.css';
import * as firebase from 'firebase'
import MyTrips from "../../utils/MyTrips/MyTrips.js";
import {Container, Row, Col} from 'reactstrap';
import NavHeader from '../../navheader';

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

    this.userId = this.props.match.params.userId;
    //db querying
    const db = firebase.firestore();
    //getting all users
    var usersRef = db.collection('users');
    //filtering users by ID
    var query = usersRef.where('user_id', '==', this.userId);
    query.get().then(snapshot => {
      snapshot.forEach(user => {
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
    });
  };

  render() {
    return (
        <div className="App">
          <NavHeader/>
          <Row>
            <Col>
                {this.state.profile_image}
            </Col>
          </Row>

          <Col>
            <h3>{this.state.first_name} {this.state.last_name}</h3>
            <p>{this.state.my_trips.length} Maps</p>
            <p>{this.state.about}</p>
          </Col>

          <Row>
              <Col>
                  <a href="">edit profile</a>
              </Col>
          </Row>

          <Row>
            <Col>
              <MyTrips ownerId={this.userId}/>
            </Col>
          </Row>

          <Row>
            <Col>
              <h6>Saved Maps</h6>
            </Col>
          </Row>
          /*Map Objects Here*/
        </div>
    );
  }
}