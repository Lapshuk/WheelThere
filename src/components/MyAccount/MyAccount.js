import React, {Component} from 'react';
import '../../App.css';
import MyTrips from "./MyTrips.js";
import { Container, Row, Col } from 'reactstrap';
import NavHeader from '../../navheader';

export default class MyAccount extends Component {

  render() {
    return (
            <div className="App">
                <NavHeader/>
                <Row>
                    <Col sm={{ size: 'auto', offset: 5 }}>
                        <img src="https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg" style = {{width:'10vw', height:'15vh', borderRadius: '50%'}}/>
                    </Col>
                    <Col sm={{ size: 'auto', offset: 3 }}>
                        <a href="">edit profile</a>
                    </Col>
                </Row>

                <Col>
                    <h3>Belli Libroni</h3>
                    <p>6 Maps</p>
                    <p>I love finding the perfect beach to just chill, have a drink, and get a tan! I love heading to anywhere tropical with water.</p>
                </Col>

                <Row>
                    <MyTrips />
                </Row>

                <Row>
                    <p>Saved Maps</p>
                </Row>
                /*Map Objects Here*/
            </div>
    );
  }
}