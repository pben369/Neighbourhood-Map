import React, { Component } from 'react';

class Venuelist extends Component {
  render() {
    // console.log(this.state.activeMarkerPhotoUrl )
    return (
      <ol className="Venuelist">
        {this.props.venuesData && 
        this.props.venuesData.map(venue => {
          return(
            this.props.markers.map(marker => {
              if((venue.venue.id === marker.id) && 
                  marker.map != null) 
              {
                return(
                  <li 
                    className="list-items" 
                    key= {venue.venue.id}
                    onClick = {() => {
                      this.props.handleSidebarListClick(venue)
                    } 
                  }>
                    <h3>{venue.venue.name}</h3>
                    <h4>{venue.venue.location.crossStreet}</h4>
                     
                  </li>
                )
              }else{
                return null
              }
            })
          )
        })
        }
      </ol>
    )
  }
}

export default Venuelist