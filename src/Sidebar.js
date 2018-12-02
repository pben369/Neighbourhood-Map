import React, { Component } from 'react';
import Venuelist from './Venuelist';

class Sidebar extends Component {

  state = {
    query: ''
  }

  updateQuery =(query) =>{
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
      // console.log("query markers => ")
      // console.log(queryMarkers)
  }

  render() {
    // console.log(this.state.activeMarkerPhotoUrl )
    // console.log(this.props.mapToMarkOn)
    // console.log("Marker state =>")
    // console.log(this.props.markers)
    return (
      <div>
        <input 
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