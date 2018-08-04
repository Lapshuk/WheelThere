import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";
import {Container, Row, Col} from 'reactstrap';
import NavHeader from '../../utils/NavHeader/NavHeader';
import './Login.css'


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
                <NavHeader />
                <Row>
                    <Col>
                        <h1>Log In</h1>
                    </Col>
                </Row>

                <form onSubmit={this.onSubmit}>
                        <input
                            className="fields"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            className="fields"
                            value={password}
                            onChange={event => this.setState(byPropKey('password', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                        <button
                            className="fields"
                            disabled={isInvalid} type="submit">
                            Sign In
                        </button>

                    { error && <p>{error.message}</p> }
                </form>

                <Row>
                    <Col>
                        <p>
                            Don't have an account? <a href=''>Sign Up</a>
                        </p>
                    </Col>
                </Row>

            </div>
        );
    }
}
