import React, {Component} from 'react';
import AddMap from '../AddMap/AddMap';
import * as firebase from 'firebase';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

import {Input} from 'reactstrap';
import {FaBeer, FaAccessibleIcon, FaGooglePlusSquare} from 'react-icons/fa';

import $ from 'jquery';
import LoginButton from "../../components/auth/LoginButton";
import SignUpButton from "../../components/auth/SignUpButton";
import AuthUserContext from '../../components/auth/AuthUserContext';
import SignOutButton from "../../components/auth/SignOutButton";

export default class NavHeader extends Component {
  constructor() {
    super();
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.state = {
      modal: false,
      currentUser: "",
      firstName: ""
    }
  }

  toggleMapModal(e) {
    e.preventDefault();
    this.setState({
      modal: true
    });
  }

  getUserName = (curUserId) => {
    const db = firebase.firestore();
    const userRef = db.collection('users').doc(curUserId);
    userRef.get().then((user) => {
      this.setState({
        firstName: user.data().first_name
      });
    });

    //
    //const userRef = db.collection('users').doc()
  };

  render() {
    return (
        <div>
          <Navbar className="drop-shadow" color="light" light expand="md">
            <NavbarBrand href="/" className="mr-auto">
              <img style={{width: '30px', height: '30px'}}
                   src="https://s3-us-west-2.amazonaws.com/badhorserecords/WheelthereIcon2.png"/>
              wheelthere
            </NavbarBrand>
            <Nav navbar>
              <NavItem>
                <Input className="searchBar" type="search" name="searc" id="searchBar" placeholder="search"/>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleMapModal}>Add map</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Messages</NavLink>
              </NavItem>
              <NavItem>
                <NavLink>Account</NavLink>
              </NavItem>

              <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <NavItem>
                      {this.getUserName(authUser.uid)}
                      <NavLink>Welcome {this.state.firstName}!</NavLink>
                    </NavItem>
                    : <NavItem>
                      <LoginButton/>
                    </NavItem>
                }
              </AuthUserContext.Consumer>

              <AuthUserContext.Consumer>
                {authUser => authUser
                    ? <SignOutButton/>
                    : <NavItem>
                      <SignUpButton/>
                    </NavItem>
                }
              </AuthUserContext.Consumer>

              <AddMap modal={this.state.modal} ref="addMap"/>
            </Nav>
          </Navbar>
        </div>

    );
  }
}