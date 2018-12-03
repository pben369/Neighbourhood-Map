import React, { Component } from 'react';

class Venuelist extends Component {
  render() {
    return (
      <ol className="Venue-list">
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
                    <div className="list-wrapper">
                      <div className="list-venue-photo">
                        <img src={venue.photourl} alt = {venue.venue.name} height="50"></img>
                      </div>

                      <div className="list-venue-info">
                        <h3>{venue.venue.name}</h3>
                        <p>{venue.venue.location.crossStreet}</p>
                      </div>
                    </div>
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