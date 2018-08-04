import React, {Component} from 'react';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";
import NavHeader from '../../utils/NavHeader/NavHeader';
import './Login.css'

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});

export default class SignUpForm extends Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = (event) => {
        const {
            username,
            email,
            passwordOne,
        } = this.state;

        firebase.auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
            })
            .catch(error => {
                this.setState(byPropKey('error', error));
            });

        event.preventDefault();
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <div>
                <NavHeader />
                <Row>
                    <Col>
                        <h1>Sign Up</h1>
                    </Col>
                </Row>

                    <form onSubmit={this.onSubmit}>
                        <input
                            className="fields"
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            type="text"
                            placeholder="Full Name"
                        />
                        <input
                            className="fields"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                        <input
                            className="fields"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            className="fields"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button
                            className="fields"
                            disabled={isInvalid} type="submit">
                            Sign Up
                        </button>

                        { error && <p>{error.message}</p> }
                    </form>
            </div>
        );
    }
}
