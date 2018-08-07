import React, {Component} from 'react';
import {Container, Row, Col, Button, Collapse} from 'reactstrap';
import '../../App.css';
import ImageBox from "../../utils/ImageBox/ImageBox";
import MiniPin from "../../utils/MiniPin/MiniPin";
import NavHeader from '../../utils/NavHeader/NavHeader';
import './HomePage.css';
import * as firebase from "firebase";


export default class HomePage extends Component {

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.getTrips = this.getTrips.bind(this);
    this.getCollapsable  = this.getCollapsable.bind(this);
    this.state = {
      collapse: false,
      targetId: null,
      loaded: false,
      pinsLoaded: false,
      popularTrips: null,
      restTrips: null,
      targetRate: 0,
      pins: {}
    };

    this.category = {'popular': 1, 'rest': 2};
    this.pinRef = {};
  }


  toggle(e, category) {
    let target = e.target.parentElement.parentElement.attributes["data-id"].value;
    this.getAllPins(category, target);
    this.setState({collapse: !this.state.collapse, targetId: target});
  }

  componentDidMount() {

    const db = firebase.firestore();
    let popQuery = db.collection('trips').where('stars', '==', 5);
    let restQuery = db.collection('trips').where('stars', '<', 5);
    this.pinRef = db.collection('pins');

    let tempPopTrips = {};
    let tempRestTrips = {};

    let popPromise = popQuery.get();
    let restPromise = restQuery.get();

    Promise.all([popPromise, restPromise]).then((values) => {
      values[0].forEach((doc) => {
        tempPopTrips[doc.id] = doc.data();
      })

      values[1].forEach((doc) => {
        tempRestTrips[doc.id] = doc.data();
      })
      
      this.setState({loaded: true, popularTrips: tempPopTrips, restTrips: tempRestTrips});
    })

  }

  getTrips(category) {

    let trips = [];
    switch (category) {
      case 1:
        trips = this.state.popularTrips;
        break;
      case 2:
        trips = this.state.restTrips;
        break;
    }
    return trips;
  }

  getAllPins(category, tripId) {
        let pins = this.getTrips(category)[tripId].pins;
        let rate = 0;
        for (let i = 0; i < pins.length; i++){
          this.pinRef.doc(pins[i]).get().then((rec)=>{
            let p = rec.data();
            let avgRate = (parseInt(p.transport)+ parseInt(p.fun) + parseInt(p.rollability) + parseInt(p.bathroom)) / 4;
            rate += avgRate;
            this.state.pins[rec.id] = {description: p.description, rate: avgRate, image: p.image};
            if (pins.length === Object.keys(this.state.pins).length){
              rate /= pins.length;
              this.setState({targetIdRate: true, targetRate: rate});
            }
          });
        }

    };

  getCollapsable(category) {
    return <Collapse className='map-collapse' isOpen={this.state.collapse}>
            <Row className='map-collapse-content shadow'>
              <div>{this.state.targetId ? category[this.state.targetId].name : ""}</div>
              <Container>
                <MiniPin pins={this.state.pins}/>
                <Row>
                  <Col sm='2'>
                    <Button outline color="success"><a href={"/mapview/" + this.state.targetId}> Explore </a></Button>
                  </Col>
                  <Col sm='2'>
                    <div> Ratings: {this.state.targetRate} </div>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Collapse>;
  }

  render() {

    let container = null;
    if (!this.state.loaded) {
      container = <Container><img src={require('../../imgs/loader.svg')} alt=''/></Container>
    } else {

      let collapsePop = !this.state.popularTrips[this.state.targetId] ? "" :
        this.getCollapsable(this.getTrips(this.category.popular));
      let collapseRes = !this.state.restTrips[this.state.targetId] ? "" :
        this.getCollapsable(this.getTrips(this.category.rest));

      container = <Container fluid={true}>
        <div className='category-title'> most popular</div>
        <div className='category horizontal-scroll' onClick={(e) => this.toggle(e, this.category.popular)} style={{marginBottom: '1rem'}}>
          <ImageBox trips={this.getTrips(this.category.popular)}/>
        </div>
        {collapsePop}
        <div className='category-title'> local - San Francisco</div>
        <div className='category horizontal-scroll' onClick={(e) => this.toggle(e, this.category.rest)} style={{marginBottom: '1rem'}}>
          <ImageBox trips={this.getTrips(this.category.rest)}/>
        </div>
        {collapseRes}
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