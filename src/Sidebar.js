import React, { Component } from 'react';

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
      this.props.updateMarkerState(queryMarkers)
  }

  render() {
    // console.log(this.state.activeMarkerPhotoUrl )
    // console.log(this.props.mapToMarkOn)
    return (
      <div>
        <input 
          type="text"
          id="search"
          placeholder="Search Venues"
          value={this.props.query}
          onChange={(event) => 
            this.updateQuery(event.target.value)}
        />
        <ol className="Venuelist">
          {this.props.venuesData && 
          this.props.venuesData.map((venue, id) => {
            return(
              <li 
                className="list-items" 
                key= {venue.venue.id}
                onClick = {() => {
                  this.props.handleSidebarListClick(venue)
                } 
              }>
                {venue.venue.name}
              </li>
            )
          }
          )}
        </ol>
      </div>
    )
  }
}

export default Sidebar