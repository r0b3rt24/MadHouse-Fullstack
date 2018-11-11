import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';


export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
          storages: [],
        }
      }
    
      componentDidMount() {
        fetch('http://localhost:4000/api/storages')
        .then(result => result.json())
        .then(data => this.setState({ storages: data }));
        };
    

    render() {

    const Markers = this.state.storages.map((storage) => (
        <Marker
            name={storage.name}
            position={{ lat: storage.geometry.coordinates[0], lng: storage.geometry.coordinates[1]}}
        >
        </Marker>))
    return (
      <Map
      centerAroundCurrentLocation 
      google={this.props.google} zoom={14}>
        {Markers}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDoTB3OYmLEpFlrL_2XcRMtRtizQIkNX_s")
})(MapContainer)

