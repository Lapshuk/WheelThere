import React, {Component} from 'react';
import { Container, Row, Collapse, Button } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";

export default class SignUpButton extends Component {
    handleClick = () => {
        firebase.auth().signOut();
    };
    render() {
        return (
            <Button
                type="button"
                onClick={this.handleClick}>

                Sign Out
            </Button>
        );
    }
}
