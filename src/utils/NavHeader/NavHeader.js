import React, {Component} from 'react';
import AddMap from '../AddMap/AddMap'
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
import AuthUserContext from '../../components/auth/AuthUserContext';
import * as firebase from "firebase";

export default class NavHeader extends Component {
  constructor() {
    super();
    this.toggleMapModal = this.toggleMapModal.bind(this);
    this.state = {
      modal: false
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
  };

    render()
    {
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

                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <NavItem>
                        <NavLink href={"/myaccount/" + authUser.uid}>Account</NavLink>
                      </NavItem>
                      : <NavItem></NavItem>
                  }
                </AuthUserContext.Consumer>


                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <NavItem>
                        {this.getUserName(authUser.uid)}
                        <NavLink>Welcome {this.state.firstName}!</NavLink>
                      </NavItem>
                      : <NavItem>
                        <NavLink href={"/login/"}>Log In</NavLink>
                      </NavItem>
                  }
                </AuthUserContext.Consumer>

                <AuthUserContext.Consumer>
                  {authUser => authUser
                      ? <div>
                        <NavItem>
                          <NavLink onClick={() => firebase.auth().signOut()}>Sign Out</NavLink>
                        </NavItem>
                      </div>
                      : <NavItem>
                        <NavLink href={"/signup/"}>Sign Up</NavLink>
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


