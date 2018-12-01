import React, { Component } from 'react';

class Venuelist extends Component {
  render() {
    // console.log(this.state.activeMarkerPhotoUrl )
    return (
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
    )
  }
}

export default Venuelist