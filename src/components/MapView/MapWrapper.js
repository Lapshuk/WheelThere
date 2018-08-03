import React, { Component } from 'react';
import {ReactDOM} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: {
        lat: 10.0,
        lng: 10.0
      }
    }
  }




  componentDidMount() {
    console.log("called");
    this.loadMap();
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available

      const {google} = this.props;
      const maps = google.maps;
      const mapRef = this.refs.map;
      //const node = ReactDOM.findDOMNode(mapRef);
    }
    // ...
  }
  render() {
    const style = {
      width: '100%',
      height: '100%',
      position: 'relative'
    }

    return (
      <Map
          google={this.props.google}
          style={style}
          initialCenter={{
            lat: 40.854885,
            lng: -88.081807
          }}
          zoom={15}
          onClick={this.onMapClicked}
      >
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
              </div>
          </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyD3bt6opXtgKxFUYVtlkjymkQTjxXZRWic'
})(MapWrapper)
