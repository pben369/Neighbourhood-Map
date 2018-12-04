import React, { Component } from 'react';
import Venuelist from './Venuelist';

class Sidebar extends Component {

  state = {
    query: ''
  }

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
    
    this.props.defaultMapParams(
      this.props.mapToMarkOn, 
      null,
      this.props.infowindow)

    this.props.updateMarkerState(queryMarkers)
  }

  render() {
    return (
      <div className="side-bar-content">
        <input 
          tabindex="2"
          aria-label="search"
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