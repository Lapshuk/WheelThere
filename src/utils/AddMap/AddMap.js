import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import NewTrip from '../NewTrip/NewTrip';

export default class AddMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.userId,
      modal: props.modal
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  componentWillReceiveProps(newProps) {
      this.setState({modal: newProps.modal});
  }
  render() {
    return (
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Create Your Trip</ModalHeader>
        <ModalBody>
          <NewTrip userId={this.state.userId}/>
        </ModalBody>
      </Modal>
    );
  }
}
