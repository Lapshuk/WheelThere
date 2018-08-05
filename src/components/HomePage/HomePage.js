import React, {Component} from 'react';
import { Container, Row, Collapse, Col } from 'reactstrap';
import '../../App.css';

import AuthUserContext from '../auth/AuthUserContext';
import SignOutButton from '../auth/SignOut';
import LoginButton from '../auth/LoginButton';
import SignUpButton from '../auth/SignUpButton';

import ImageBox from "../../utils/ImageBox/ImageBox";
import NavHeader from '../../utils/NavHeader/NavHeader';
import './HomePage.css';
import * as firebase from "firebase";


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      targetId: null
    };


  }

  toggle(e) {
    let target =  e.target.parentElement.parentElement.attributes["data-id"].value;
    this.setState({ collapse: !this.state.collapse, targetId: target });
  }

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var tripsRef = db.collection('trips');
    tripsRef.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.data());
      });
    });
  }

  render() {

    const trips =  {
      1: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'Machu Pichu',
        'pins' : []
      },
      2: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'The Great Whistler',
        'pins' : []
      },
      3: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'Gimme Italy',
        'pins' : []
      },
      4: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'YellowStone',
        'pins' : []
      },
      5: {
        'image' : 'https://i.imgur.com/fszDZJi.jpg',
        'name' : 'YellowStone',
        'pins' : []
      },
    };
      // {authUser => authUser
      //     ? <p> {authUser.email} </p>
      //     : null
      // }
    return (
      <div id='HomePage'>
      <NavHeader/>

      <AuthUserContext.Consumer>
          {authUser => authUser
              ? <SignOutButton />
              : <div><LoginButton /> <SignUpButton /></div>
          }
      </AuthUserContext.Consumer>

        <Container fluid={true}>
          <div className='category-title'> most popular </div>
          <div className='category horizontal-scroll' onClick={ (e) => this.toggle(e)} style={{ marginBottom: '1rem' }}>
            <ImageBox trips={trips}/>
          </div>
          <Collapse className='map-collapse' isOpen={this.state.collapse}>
            <Row className='map-collapse-content shadow'>
              <div>{this.state.targetId ? trips[this.state.targetId].name : ""}</div>
            </Row>
          </Collapse>

          <div className='category-title'> local - San Francisco </div>
          <div className='category horizontal-scroll'>
            <ImageBox trips={trips}/>
          </div>

          <div className='category-title'> Some Other Category </div>
          <div className='category horizontal-scroll'>
            <ImageBox trips={trips} />
          </div>

        </Container>
      </div>
    );
  }
}
