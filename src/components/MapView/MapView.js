import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import NavHeader from '../../utils/NavHeader/NavHeader';
import { Container, Row, Col } from 'reactstrap';
import '../../App.css';
import PinDisplay from '../../utils/PinDisplay/PinDisplay'
import * as firebase from "firebase";


export default class MapView extends Component {
  constructor(props){
    super(props);
    this.state = {
      tripId: props.match.params.tripId,
      pin_ids: {},
      mapRef: React.createRef(),
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
      for (var i = 0; i < pins.length; i++){
        pinRef.doc(pins[i]).get().then((rec)=>{
          var p = rec.data();
          this.state.pin_ids[rec.id] = {description: p.description, image: p.image, lat: p.lat, lon:p.lon};
            if (pins.length == Object.keys(this.state.pin_ids).length){
              this.setState({
                loaded: true,
            });
            //chain async call
          }
        });
      }
    });
  }
  componentDidMount(){
    this.getAllPins();
  }
  showPins(){
    if (this.state.loaded){
      {
      var x = [];
      Object.keys(this.state.pin_ids).map((key) => {
        console.log(key);

        var image = this.state.pin_ids[key].image;
        var description = this.state.pin_ids[key].description;
        var lat = this.state.pin_ids[key].lat;
        var lon = this.state.pin_ids[key].lon;
          x.push(<PinDisplay lat={lat} lon={lon} mapRef = {this.state.mapRef} id = {'pin' + key} image = {image} title = {description}/>);
        });
        return x;
      }
    }
    else{

    }
  }
  render() {
    return (
        <div>
          <NavHeader/>
          <Row>
            <Col id='left-column' xs="2">
              <div className="maps-container">
                <h5> Pins </h5>
                  {this.showPins()}
              </div>
              <div className="drag-container">
                <div className="box-border shadow">
                  <img style={{width: '30px', height: '50px'}}
                       src="https://i.pinimg.com/originals/f2/57/78/f25778f30e29a96c44c4f72ef645aa63.png"/>
                  <p>Drag to add to the map.</p>
                </div>
              </div>
            </Col>
            <Col id="mapwrapper" xs="10" style={{width: '100vw', height: '100vh'}}>
              <MapWrapper ref = {this.state.mapRef} tripId = {this.state.tripId} />
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
