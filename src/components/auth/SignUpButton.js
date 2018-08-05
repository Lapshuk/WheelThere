import React, {Component} from 'react';
import { Container, Row, Collapse, Button } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";

export default class SignUpButton extends Component {
    handleClick = () => {
        window.location.assign('/signup');
    };
    render() {
        return (
            <Button
                type="button"
                onClick={this.handleClick}>

                Sign Up
            </Button>
        );
    }
}
