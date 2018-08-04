import React, {Component} from 'react';
import { Container, Row, Collapse } from 'reactstrap';
import '../../App.css';
import ImageBox from "../../utils/ImageBox/ImageBox";
import NavHeader from '../../utils/NavHeader/NavHeader';
import './HomePage.css';
import * as firebase from "firebase";


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getTrips = this.getTrips.bind(this);
    this.state = {
      collapse: false,
      targetId: null,
      loaded: false,
      popularTrips: null,
      restTrips: null
    };

    this.category = {'popular': 1, 'rest': 2};
  }




  toggle(e) {
    let target =  e.target.parentElement.parentElement.attributes["data-id"].value;
    this.setState({ collapse: !this.state.collapse, targetId: target });
  }

  componentDidMount() {

    const db = firebase.firestore();
    let popQuery = db.collection('trips').where('stars', '==', 5);
    let restQuery = db.collection('trips').where('stars', '<', 5);

    let tempPopTrips = [];
    let tempRestTrips = [];

    let popPromise = popQuery.get();
    let restPromise = restQuery.get();

    Promise.all([popPromise, restPromise]).then( (values) => {
      values[0].forEach( (doc) => {
        tempPopTrips.push(doc.data());
      })

      values[1].forEach( (doc) => {
        tempRestTrips.push(doc.data());
      })

      this.setState({loaded: true, popularTrips: tempPopTrips, restTrips: tempRestTrips});
    })

  }

   getTrips(category) {

     let trips = [];
     switch(category) {

       case 1:
         trips = this.state.popularTrips;
         break;
       case 2:
         trips = this.state.restTrips;
         break;
     }

     return trips;

    }


  render() {

    let container = null;
    if(!this.state.loaded) {
      container = <Container><img src={require('../../imgs/loader.svg')} alt=''/></Container>
    } else {
      container = <Container fluid={true}>
                    <div className='category-title'> most popular </div>
                    <div className='category horizontal-scroll' onClick={ (e) => this.toggle(e)} style={{ marginBottom: '1rem' }}>
                      <ImageBox trips={this.getTrips(this.category.popular)}/>
                    </div>
                    <Collapse className='map-collapse' isOpen={this.state.collapse}>
                      <Row className='map-collapse-content shadow'>
                        <div>{this.state.targetId ? this.getTrips(this.category.popular)[this.state.targetId].name : ""}</div>
                      </Row>
                    </Collapse>

                    <div className='category-title'> local - San Francisco </div>
                    <div className='category horizontal-scroll' onClick={ (e) => this.toggle(e)} style={{ marginBottom: '1rem' }}>
                      <ImageBox trips={this.getTrips(this.category.rest)}/>
                    </div>
                    <Collapse className='map-collapse' isOpen={this.state.collapse}>
                      <Row className='map-collapse-content shadow'>
                        <div>{this.state.targetId ? this.getTrips(this.category.rest)[this.state.targetId].name : ""}</div>
                      </Row>
                    </Collapse>
                  </Container>
    }

    return (
      <div id='HomePage'>
        <NavHeader/>
        {container}
      </div>
    );
  }
}