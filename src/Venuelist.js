import React, { Component } from 'react';

class Venuelist extends Component {
  //ToDo
  // handleNoSearchResults(){
  //   if(document.getElementsByClassName("list-items").length === 0){
  //     return <h3 className="noresults">No Venues Found!!</h3>
  //   }
  // }

  render() {
    return (
      <div>
        <ol className="Venue-list">
          {
            this.props.venuesData && 
            this.props.venuesData.map(venue => {
              return(
                this.props.markers.map(marker => {
                  if((venue.venue.id === marker.id) && 
                      marker.map != null) 
                  {
                    return(
                      <li 
                        tabIndex="3"
                        role="link"
                        className="list-items" 
                        key= {venue.venue.id}
                        onClick = {() => {
                          this.props.handleSidebarListClick(venue)
                        }}
                        onKeyPress = {() => {
                          this.props.handleSidebarListClick(venue)
                        }}>
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
        {/* //ToDo */}
        {/* <div>
          { this.handleNoSearchResults() }
        </div> */}
      </div>
    )
  }
}

export default Venuelist