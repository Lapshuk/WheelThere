import React, {Component} from 'react';
import { Container, Col, Row } from 'reactstrap';
import '../../App.css';
import './ImageBox.css';


export default class ImageBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this.trips = this.props.trips;
  }


  render() {

    const tripList = Object.keys(this.trips).map(key =>
      <Col xs="3" className='image-col' key={key}>
        <div className='image-container'>
          <img className='image-box' src={this.trips[key].image} alt=''/>
        </div>
        <div>{this.trips[key].name}</div>
      </Col>
    )

    return (
      <div className="App">
        <Container>
          <Row>
          {tripList}
          </Row>
        </Container>
      </div>
    );
  }
}