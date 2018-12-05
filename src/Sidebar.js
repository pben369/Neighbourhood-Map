import React, { Component } from 'react';
import Venuelist from './Venuelist';

class Sidebar extends Component {

  state = {
    query: ''
  }

  //function is search the venue location stored in the state and display
  // list items and markers on map accordingly
  updateQuery = (query) => {
    this.setState({query})
    const queryMarkers = this.props.venuesData.map(currentVenue => {
      
      let currentMarker = this.props.markers.find(marker =>
        marker.id ===currentVenue.venue.id)
      
      if(query){
        if(currentVenue.venue.name.toUpperCase().includes(query.toUpperCase())){
          currentMarker.setMap(this.props.mapToMarkOn)
        } else {
          currentMarker.setMap(null)
        }
      }else{
        currentMarker.setMap(this.props.mapToMarkOn)
      }
      return currentMarker
    })
    //on change in input field reset the map params
    this.props.defaultMapParams(
      this.props.mapToMarkOn, 
      null, 
      this.props.infowindow)

    //Update markers as per the query
    this.props.updateMarkerState(queryMarkers)
  }

  render() {
    return (
      <div className="side-bar-content">
        <input 
          tabIndex="2" 
          aria-label="search" 
          role="search" 
          type="search" 
          id="search" 
          placeholder="Search Venue by Name" 
          value={this.props.query} 
          onChange={(event) => 
            this.updateQuery(event.target.value)}
        />
        <Venuelist 
          venuesData = {this.props.venuesData} 
          markers= {this.props.markers} 
          handleSidebarListClick = {this.props.handleSidebarListClick}
          />
      </div>
    )
  }
}

export default Sidebar