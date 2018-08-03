import React, {Component} from 'react';
import '../../App.css';
import MyMaps from "./MyMaps.js";
import { Container, Row, Col } from 'reactstrap';
import NavHeader from '../../navheader';

export default class MyAccount extends Component {

  render() {
    return (
            <div className="App">
                <NavHeader/>
                <Row>
                    <Col>
                        <img src="https://i.ytimg.com/vi/YCaGYUIfdy4/maxresdefault.jpg" style = {{width:'10vw', height:'15vh', borderRadius: '50%'}}/>
                    </Col>
                        <a href="">edit profile</a>
                </Row>

                <Col>
                    <h3>Belli Libroni</h3>
                    <p>6 Maps</p>
                    <p>I love finding the perfect beach to just chill, have a drink, and get a tan! I love heading to anywhere tropical with water.</p>
                </Col>

                <Row>
                    <MyMaps />
                </Row>

                <Row>
                    <p>Saved Maps</p>
                </Row>
                /*Map Objects Here*/
            </div>
    );
  }
}