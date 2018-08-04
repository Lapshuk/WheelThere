import React, {Component} from 'react';
import { Container, Row, Collapse } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";

const SignOutButton = () =>
    <button
        type="button"
        onClick={firebase.auth.doSignOut}>

        Sign Out
    </button>

export default SignOutButton;