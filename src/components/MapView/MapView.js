import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../utils/NavHeader/NavHeader';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';
import PinDisplay from '../../utils/PinDisplay/PinDisplay'
import * as firebase from "firebase";


export default class MapView extends Component {
  constructor(props) {
    super(props);
    console.log(props);


  }


  constructor(props){
    super(props);
    this.state = {
      tripId: props.match.params.tripId,
      pin_ids: {}
    }
    this.getAllPins= this.getAllPins.bind(this);
    this.showPins = this.showPins.bind(this);
  }
  getAllPins() {
    const db = firebase.firestore();
    var tripRef = db.collection('trips').doc(this.state.tripId);
    var pinRef = db.collection('pins');
    
    tripRef.get().then((trip) => {
      var pins = trip.data().pins;
      console.log(pins);
      for (var i = 0; i < pins.length; i++){
        pinRef.doc(pins[i]).get().then((rec)=>{
          var p = rec.data();
          this.state.pin_ids[rec.id] = {description: p.description, image: p.image};
        });
      }
    });
  }
  componentDidMount(){
    this.getAllPins();
  }
  showPins(){
    for(var key in this.state.pin_ids){
      console.log("inside the dictionary");
      var image = this.state.pin_ids[key].image;
      var description = this.state.pin_ids[key].description;
      return <PinDisplay id = {'pin' + key} image = {image} title = {description}/>
    }
  }
  render() {
    return (
        <div>
          <NavHeader/>
          <Row>
            <Col id='left-column' xs="2">
              <div className="maps-container">
                Left panel
                {this.showPins()}
              </div>
              <div className="drag-container">
                <div className="box-border">
                  <img style={{width: '30px', height: '50px'}}
                       src="https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"/>
                  <p>Drag to add to the map.</p>
                </div>
              </div>
            </Col>
            <Col id="mapwrapper" xs="10" style={{width: '100vw', height: '100vh'}}>
              <MapWrapper tripId = {this.state.tripId} />
            </Col>

          </Row>

          <div className="sticky-right">
            <a href="/"><img style={{width: '70px', height: '70px'}}
                             src="http://www.free-icons-download.net/images/plus-icon-27951.png"/></a>
            <br/>
            Testing the bottom right
          </div>
        </div>
    );
  }
}
