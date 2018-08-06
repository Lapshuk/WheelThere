import React, {Component} from 'react';
import { Container, Row, Collapse, Button } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";
import { NavLink } from 'reactstrap';

export default class SignUpButton extends Component {
    handleClick = () => {
        firebase.auth().signOut();
    };
    render() {
        return (
            <NavLink
                onClick={this.handleClick}>

                Sign Out
            </NavLink>
        );
    }
}

{/*<Button*/}
    {/*type="button"*/}
    {/*onClick={this.handleClick}>*/}

    {/*Sign Out*/}
{/*</Button>*/}