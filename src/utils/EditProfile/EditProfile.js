import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";
import {Container, Row, Col, Form, Input, Button, Alert} from 'reactstrap';
import NavHeader from '../../utils/NavHeader/NavHeader';
import '../../components/auth/Login.css'


const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
});


export default class EditProfile extends Component {
    constructor(props) {
        super();
        this.state = {
            set: false,
            about: "",
            email: "",
            first_name: "",
            last_name: "",
            my_trips: "",
            saved_trips: "",
            password: "",
        };
        this.userId = props.match.params.userId;

    };

    componentDidMount() {
        //db querying
        const db = firebase.firestore();
        //getting all users
        var usersRef = db.collection('users');
        //filtering users by ID
        var query = usersRef.where('user_id', '==', this.props.match.params.userId);
        query.get().then(snapshot => {
            snapshot.forEach(user => {
                var data = user.data();
                //setting state with received data
                this.setState({
                    about: data.about,
                    image: data.image,
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    my_trips: data.maps.my_trips,
                    saved_trips: data.maps.saved_trips,
                    password: data.password,
                    set: true
                });
            });
        });
    };


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
                        <h1>Edit Profile</h1>
                    </Col>
                </Row>
                <Row>
                    <Col xs = "4" />
                    <Col xs = "4">
                        <Form onSubmit={this.onSubmit}>
                            <Input
                                className="field"
                                onChange={event => this.setState(byPropKey('first_name', event.target.value))}
                                type="text"
                                placeholder="First Name"
                            />
                            <Input
                                className="field"
                                onChange={event => this.setState(byPropKey('last_name', event.target.value))}
                                type="text"
                                placeholder="Last Name"
                            />

                            <textarea
                                className="field"
                                style = {{height: '100px'}}
                                onChange={event => this.setState(byPropKey('about', event.target.value))}
                                type="text"
                                placeholder="About"
                            />
                            <Button
                                className="field"
                                disabled={isInvalid} type="submit">
                                Sign In
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
            </div>
        );
    }
}