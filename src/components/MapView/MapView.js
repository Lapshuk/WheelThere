import React, {Component} from 'react';
import MapWrapper from './MapWrapper';
import '../../App.css';

export default class MapView extends Component {

  render() {
    return (
        <div className="App">
          HELLO FROM MAP VIEW
          {console.log(this.props.match.params.tripId)}
          <MapWrapper/>
        </div>
    );
  }
}