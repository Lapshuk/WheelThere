import React, {Component} from 'react';
import { Container, Row, Col, Form, Button, Input, Alert} from 'reactstrap';
import '../../App.css';
import * as firebase from "firebase";
import NavHeader from '../../utils/NavHeader/NavHeader';
import './Login.css'
import SignOutButton from '../auth/SignOut';


const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: false,
    errorMessage: null
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

        firebase.auth().createUserWithEmailAndPassword(email, passwordOne).then(function(data) {
            console.log(data);
            console.log('Signed Up!');
            console.log(firebase.User);
            window.location.assign('/');
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          
          this.setState({error: true});
          this.setState({errorMessage: errorMessage});
        }.bind(this));

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

                <Row>
                  <Col xs = "4" />
                  <Col xs = "4" className="form">
                    <Form onSubmit={this.onSubmit}>
                        <Input
                            className="field"
                            value={username}
                            onChange={event => this.setState(byPropKey('username', event.target.value))}
                            type="text"
                            placeholder="Username"
                        />
                        <Input
                            className="field"
                            value={email}
                            onChange={event => this.setState(byPropKey('email', event.target.value))}
                            type="text"
                            placeholder="Email Address"
                        />
                        <Input
                            className="field"
                            value={passwordOne}
                            onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                            type="password"
                            placeholder="Password"
                        />
                        <Input
                            className="field"
                            value={passwordTwo}
                            onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                            type="password"
                            placeholder="Confirm Password"
                        />

                        <Button
                            disabled={isInvalid} type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    {
                      this.state.error
                        ? <Alert color="danger" className="field">{this.state.errorMessage}</Alert>
                        : null
                    }
                  </Col>
                  <Col xs = "4" />
                </Row>

                <Row>
                    <Col>
                        <p>
                            Have an account? <a href="/login/">Login</a>
                        </p>
                    </Col>
                </Row>
            </div>
        );
    }
}
