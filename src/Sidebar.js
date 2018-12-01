import React, { Component } from 'react';

class Sidebar extends Component {
  render() {
    // console.log(this.state.activeMarkerPhotoUrl )
    return (
      <div>
        <input type={"search"} id={"search"} placeholder={"Search Venues"} />
        <ol className="Venuelist">
          {this.props.venuesData && 
          this.props.venuesData.map((venue, id) => {
            return(
              <li 
                className="list-items" 
                key= {venue.venue.id}
                onClick = {() => {
                  this.props.handleListItemsClick(venue)
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