import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class PinInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: props.modal,
      //TODO: add in the next properties for rendering
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
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
            
        </ModalBody>
      </Modal>
    );
  }
}
