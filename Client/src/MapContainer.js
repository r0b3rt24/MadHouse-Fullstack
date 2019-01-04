import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, { Component } from 'react';


export class MapContainer extends Component {
    state = {
        activeMarker: {},
        selectedPlace: {},
        showingInfoWindow: false,
        storages: [],
      };
    
      onMarkerClick = (props, marker) =>
        this.setState({
          activeMarker: marker,
          selectedPlace: props,
          showingInfoWindow: true
        });
    
      onInfoWindowClose = () =>
        this.setState({
          activeMarker: null,
          showingInfoWindow: false
        });
    
      onMapClicked = () => {
        if (this.state.showingInfoWindow)
          this.setState({
            activeMarker: null,
            showingInfoWindow: false
          });
      };

    constructor(props) {
        super(props);
      }
    
      componentDidMount() {
        fetch('http://localhost:4000/api/storages')
        .then(result => result.json())
        .then(data => this.setState({ storages: data }));
        };
    

    render() {
    if (!this.props.loaded) return <div>Loading...</div>;


    const Markers = this.state.storages.map((storage) => (
        <Marker
            name={storage.name}
            onClick={this.onMarkerClick}
            position={{ lat: storage.geometry.coordinates[0], lng: storage.geometry.coordinates[1]}}
        >
        </Marker>))
    return (
      <Map
      centerAroundCurrentLocation 
      google={this.props.google} zoom={14}>
        {Markers}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h5>{this.state.selectedPlace.name}</h5>
            <p>{this.state.selectedPlace.address}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyDoTB3OYmLEpFlrL_2XcRMtRtizQIkNX_s")
})(MapContainer)

