import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import * as firebase from "firebase";
import { Container, Row, Col } from 'reactstrap';

export default class PinInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      //TODO: add in the next properties for rendering
    };
    this.toggle = this.toggle.bind(this);
    this.getPinInfo = this.getPinInfo.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  getPinInfo(pid, modal) {
    const db = firebase.firestore();
    var pinRef = db.collection('pins');
    pinRef.doc(pid).get().then((rec)=>{
      //assumes get doesn't shit itself
      var pind = rec.data();
      this.setState({
        description: pind.description,
        address: pind.address,
        image: pind.image,
        bathroom: pind.bathroom,
        rollability: pind.rollability,
        transport: pind.transport,
        tip: pind.tip,
        fun: pind.fun,
        modal: modal, //if the modal should be on or not
        pid: pid,
      });
    });
  }
  componentWillReceiveProps(newProps) {
    //fucking jank ass code, newProps.modal = should be on?
    if (newProps.pid){
      //sigh
      this.getPinInfo(newProps.pid, newProps.modal);
    }
  }
  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Location info</ModalHeader>

        <ModalBody>
          <Row>
            <Col>
              <img style={{width: '80%', height:'80%'}}src = {this.state.image}/>
            </Col>
          </Row>
          <h4> <b>Description: </b>{this.state.description}</h4>
          <br/>
          <h4> <b>Address: </b>{this.state.address}</h4>
          <br/>
          <h4><b>Rollability:</b> {this.state.rollability}</h4>
          <br/>
          <h4><b>Transport: </b> {this.state.transport}</h4>
          <br/>
          <h4><b>Fun: </b> {this.state.fun}</h4>
          <br/>
          <h4>Tip: {this.state.tip}</h4>
        </ModalBody>
      </Modal>
    );
  }
}
