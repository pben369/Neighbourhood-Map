import React, { Component } from 'react';
import './App.css';
import Gmap from './Gmap.js'


require('dotenv').config();

class App extends Component {

  state = {
    venues: [],
    markers: []
  }

  handleToUpdateVenue = (updatedVenue) => {
    this.setState({venues : updatedVenue})
    
  }

  handleToUpdateMarkers = (updatedMarkers) => {
    this.setState({markers : updatedMarkers})
  }

  render() {
    console.log(this.state.venues)
    return (
      <div className="App">
        <Gmap 
          venues = {this.state.venues}
          setVenueState = {this.handleToUpdateVenue}
          setMarkersState = {this.handleToUpdateMarkers}
          />
      </div>
    );
  }
}

export default App;
