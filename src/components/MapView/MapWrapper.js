import React, { Component } from 'react';
import {ReactDOM} from 'react';
import AddPin from '../../utils/AddPin/AddPin';
import PinInfo from '../../utils/PinInfo/PinInfo';
import $ from 'jquery';

//asynchronous loading magic
function loadJS(src) {
    var ref = window.document.getElementsByTagName("script")[0];
    var script = window.document.createElement("script");
    script.src = src;
    script.async = true;
    ref.parentNode.insertBefore(script, ref);
}
var EIFFEL_TOWER_POSITION = {
  lat: 48.858608,
  lng: 2.294471
};
var map; //global name space, because react is stupid as f

export default class MapWrapper extends Component {
    constructor(props){
      super(props);
      this.togglePinAddModal = this.togglePinAddModal.bind(this);
      this.togglePinInfoModal = this.togglePinInfoModal.bind(this);
      this.setActiveLatLng = this.setActiveLatLng.bind(this);

      this.state={
        tripId: props.tripId,
        pinAddModal: false,
        pinInfoModal: false,
        lat: EIFFEL_TOWER_POSITION.lat,
        lon: EIFFEL_TOWER_POSITION.lon,
      }
    }
    setActiveLatLng(lat, lng){
      this.setState({
        lat: lat,
        lon: lng
      });
    }
    togglePinAddModal(){
      this.setState({
        pinAddModal: true,
        pinInfoModal: false
      });
    }
    togglePinInfoModal(){
      this.setState({
        pinAddModal: false,
        pinInfoModal: true
      });
    }
    createMarker(latLng){
        //used in the reres function;
      var marker = new window.google.maps.Marker({
          position: latLng,
          map: map
      });
      //add click event listener to the marker
      var self_reference = this;
      marker.addListener('click', function(evt){
        self_reference.togglePinInfoModal(); 
      });

    }
    componentDidMount() {
          // Connect the initMap() function within this class to the global window context,
          // so Google Maps can invoke it
          window.initMap = this.initMap;
          window.initMap = this.initMap.bind(this);
          // Asynchronously load the Google Maps script, passing in the callback reference
          loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyD3bt6opXtgKxFUYVtlkjymkQTjxXZRWic&libraries=places&callback=initMap')
      }
      
      initMap() {
          map = new window.google.maps.Map(this.refs.map, {
            center: EIFFEL_TOWER_POSITION,
            zoom: 16
          });
          var bin = document.querySelector('#mapwrapper');
          var offset = document.getElementById("left-column").offsetWidth;
          var self_reference = this;
          function point2LatLng(point, map) {
            if(!map){
              return null;
            }
            point.x = point.x - offset;
            var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
            var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
            var scale = Math.pow(2, map.getZoom());
            var worldPoint = new window.google.maps.Point(point.x / scale + bottomLeft.x, point.y / scale + topRight.y);
            return map.getProjection().fromPointToLatLng(worldPoint);
          }

          bin.addEventListener('dragover', function (e) {
            if (e.preventDefault) e.preventDefault(); // allows us to drop
            e.dataTransfer.dropEffect = 'copy';
            return false;
          });

          bin.addEventListener('drop', function (e) {
            var p = new window.google.maps.Point(e.x, e.y);
            var latlng = point2LatLng(p, map);
            e.dataTransfer.dropEffect = 'copy';
            self_reference.setActiveLatLng(latlng.lat(), latlng.lng());
            self_reference.createMarker(latlng); 
            self_reference.togglePinAddModal();
            return false;
          });

      }
      render() {
          return (
              <div ref="map" style={{height: '100%', width: '100%'}}>
                  <AddPin modal={this.state.pinAddModal} tripId={this.state.tripId} lat={this.state.lat} lon = {this.state.lon} ref = "addPin"/>
                  <PinInfo modal={this.state.pinInfoModal} ref = "addPin"/>
               </div>
          );
      }
}
 