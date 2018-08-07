import React, {Component} from 'react';
import { Col, Row } from 'reactstrap';
import '../../App.css';
import './MiniPin.css';


export default class ImageBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };

    this.pins = this.props.pins;
  }

  render() {

    const pinList = Object.keys(this.pins).map(key =>
      <Col sm='3' className='pin-col' key={key} data-id={key}>
        <img className='pin-box' src={this.pins[key].image} alt=''/>
      </Col>
    );

    return (
      <Row id="MiniPin">
        {pinList}
      </Row>
    );
  }
}
