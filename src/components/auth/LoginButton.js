import React, {Component} from 'react';
import { Container, Row, Collapse, Button } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";
import { NavLink } from 'reactstrap';

export default class LoginButton extends Component {
    handleClick = () => {
        window.location.assign('/login');
    };

    render() {
        return (
            <NavLink
                onClick={this.handleClick}>
                Log In
            </NavLink>
        );
    }
}

{/*<Button*/}
    {/*type="button"*/}
    {/*onClick={this.handleClick}>*/}

    {/*Log In*/}
{/*</Button>*/}
