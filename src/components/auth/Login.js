import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";
// import { SignUpLink } from './SignUp';
import '../../App.css';
import {Container, Row, Col} from 'reactstrap';


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

export default class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            email,
            password,
        } = this.state;

        firebase.auth.doSignInWithEmailAndPassword(email, password)
            .then( () => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error,
        } = this.state;

        const isInvalid =
            password === '' ||
            email === '';

        return (
            <div>
                <h1>Log In</h1>
                <form onSubmit={this.onSubmit}>
                    <input
                        value={email}
                        onChange={event => this.setState(byPropKey('email', event.target.value))}
                        type="text"
                        placeholder="Email Address"
                    />
                    <input
                        value={password}
                        onChange={event => this.setState(byPropKey('password', event.target.value))}
                        type="password"
                        placeholder="Password"
                    />
                    <button disabled={isInvalid} type="submit">
                        Sign In
                    </button>

                    { error && <p>{error.message}</p> }
                </form>
            </div>
        );
    }
}
