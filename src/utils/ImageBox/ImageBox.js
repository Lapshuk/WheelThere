import React, {Component} from 'react';
import { Col, Row } from 'reactstrap';
import '../../App.css';
import './ImageBox.css';


export default class ImageBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this.trips = this.props.trips;
    this.overflow = this.props.overflow;
  }


  render() {

    const tripList = Object.keys(this.trips).map(key =>
      <Col sm='3' className='image-col' key={key}>
        <div className='image-container'>
          <img className='image-box' src={this.trips[key].image} alt=''/>
        </div>
        <div className='image-title'>{this.trips[key].name}</div>
      </Col>
    )

    return (
      <div id="ImageBox">
        <Row className='image-row'>
        {tripList}
        </Row>
      </div>
    );
  }
}