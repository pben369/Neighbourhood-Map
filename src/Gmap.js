import React, { Component } from 'react';

class Gmap extends Component {

  state = {
    activeMarkerLoc: null
  };

  openInfoWindows = (map, marker, infowindow, venueInfo) => {

    let content = 
      '<h2>' + venueInfo.venue.name + '</h2>' +
      '<br>' + venueInfo.venue.location.formattedAddress[0] +
      '<br>' + venueInfo.venue.location.formattedAddress[1] +
      '<br>' + venueInfo.venue.location.formattedAddress[2] + 
      '<br>' + venueInfo.venue.location.formattedAddress[3]

    window.google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(content)
      infowindow.open(map, marker);
    })
  }

  defaultMapParams = (mapToMarkOn, marker, infowindow) => {
    let bangalore = {lat: 12.9716, lng: 77.5946};
    //when clicked on the map zoom out and center to default values
    //and close infowindow
    window.google.maps.event.addListener(mapToMarkOn, 'click', function() {
      mapToMarkOn.setZoom(13)
      mapToMarkOn.setCenter(bangalore)
      marker.setAnimation(-1)
      infowindow.close()
    })
  }

  handleMarkerAnimation = (clickedMarker) => {
    if(this.state.activeMarkerLoc){
      // to remove the animation setting the value to 'null' has 
      // a side effect that animation only works twice and the 
      // third time it stops. As the animation constants are simply 
      // int setting it to -1 is correct.
      this.state.activeMarkerLoc.setAnimation(-1)
    }
    clickedMarker.setAnimation(window.google.maps.Animation.BOUNCE)
    this.setState({activeMarkerLoc :clickedMarker})
  }

  positionMarkers = (mapToMarkOn) => {
    //create infoWindow object
    let infowindow = new window.google.maps.InfoWindow();

    // console.log("Positionsmarkers " + this.props.venues + "<=")
    this.props.setMarkersState(
      this.props.venues.map( currentPos => {
        let marker = new window.google.maps.Marker({
          position: {
            lat: currentPos.venue.location.lat,
            lng: currentPos.venue.location.lng },
          map: mapToMarkOn,
          title: currentPos.venue.name,
          animation: window.google.maps.Animation.DROP
        })

        //when clicked on a marker zoom in and make its position
        //as maps center
        let self = this
        window.google.maps.event.addListener(marker, 'click', function(){
          mapToMarkOn.setZoom(16)
          mapToMarkOn.setCenter(marker.getPosition())
          self.handleMarkerAnimation(marker)
        })

        // let contentString = `${currentPos.venue.name}`
        this.openInfoWindows(mapToMarkOn, marker, infowindow, currentPos)

        //when clicked on the map set the zoom and map center 
        //to default values
        this.defaultMapParams(mapToMarkOn, marker, infowindow)

        return marker
      })
    )
  }

  initGmap = () => {
    let bangalore = {lat: 12.9716, lng: 77.5946};
    let map = new window.google.maps.Map(
    document.getElementById('map'), {zoom: 13, center: bangalore});

    // The markers positioned at bangalore
    this.positionMarkers(map);
  }

  createScriptTag = () => {
    window.initGmap = this.initGmap;
    let API_KEY = process.env.REACT_APP_GMAP_API_KEY;

    //create a promise to check if the variable 'google' is available before
    //map initialisation.
    let gmapsPromise = new Promise ((resolve) => {
        resolve(window.google);
    })

    gmapsPromise.then((google) => {
      const script = document.createElement("script");
      script.src= 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY + "&callback=initGmap"
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    })
  }

  fetchLocations = () => {
    let id = process.env.REACT_APP_FS_API_ID;
    let secret = process.env.REACT_APP_FS_API_SECRET;

    const apiURL = "https://api.foursquare.com/v2/venues/explore?" +
      "&client_id=" + id +
      "&client_secret=" + secret +
      "&query=outdoors" +
      "&near=Bangalore" +
      "&v=20181127"

    fetch(apiURL)
      .then((response) => {
        return response.json ()
      }).then(data => {
          this.props.setVenueState(data.response.groups[0].items)
        }).then(data => {
          this.createScriptTag()
        }).then(data => {
          
        })
      .catch(error => { 
        console.log("ERROR!!" + error);
      })
  }

  componentDidMount(){
    this.fetchLocations()
  }

  render() {
    return (
      <div>
          <h1>My Neighbourhood</h1>
          <div id="map"></div>
      </div>
    );
  }
}

export default Gmap;
