import React, {Component} from 'react';
import '../../App.css';
import * as firebase from "firebase";
import {Container, Row, Collapse} from 'reactstrap';
import ImageBox from "../../utils/ImageBox/ImageBox";
import NavHeader from '../../utils/NavHeader/NavHeader';


export default class MyTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId : props.userId,
      myTrips : [],
      loaded: false,
      collapse: false,
    };
  }

  componentDidMount() {
    //db querying
    const db = firebase.firestore();
    //getting all users
    var userRef = db.collection('users');
    //getting the list of trips
    userRef.doc(this.state.userId).get().then(user => {
      this.setState({
        myTrips : user.data().my_trips,
        loaded : true
      });
    });
  };

  render() {

    // let container = null;
    // if (!this.state.loaded) {
    //   container = <Container><img src={require('../../imgs/loader.svg')} alt=''/></Container>
    // } else {
    //
    //   let collapsePop = !this.state.popularTrips[this.state.targetId] ? "" :
    //       <Collapse className='map-collapse' isOpen={this.state.collapse}>
    //         <Row className='map-collapse-content shadow'>
    //           <div>{this.state.targetId ? this.getTrips(this.category.popular)[this.state.targetId].name : ""}</div>
    //         </Row>
    //       </Collapse>;
    //
    //
    //   container = <Container fluid={true}>
    //     <div className='category-title'> most popular</div>
    //     <div className='category horizontal-scroll' onClick={(e) => this.toggle(e)} style={{marginBottom: '1rem'}}>
    //       <ImageBox trips={this.getTrips(this.category.popular)}/>
    //     </div>
    //     {collapsePop}
    //     <div className='category-title'> local - San Francisco</div>
    //     <div className='category horizontal-scroll' onClick={(e) => this.toggle(e)} style={{marginBottom: '1rem'}}>
    //       <ImageBox trips={this.getTrips(this.category.rest)}/>
    //     </div>
    //     {collapseRes}
    //   </Container>
    //
    // }
    return (
        <div id='HomePage'>
          My Trips
        </div>
    );
  }
}