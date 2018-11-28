import React, { Component } from 'react';

class Gmap extends Component {

  openInfoWindows = (infowindow, map, marker, contentString) => {
    window.google.maps.event.addListener(marker, 'click', function(){
      infowindow.setContent(contentString)
      infowindow.open(map, marker);
    })
  }

  defaultMapParams = (mapToMarkOn) => {
    let bangalore = {lat: 12.9716, lng: 77.5946};
    //when clicked on the map zoom out and center to default values
    //and close infowindow
    window.google.maps.event.addListener(mapToMarkOn, 'click', function() {
      mapToMarkOn.setZoom(12)
      mapToMarkOn.setCenter(bangalore)
    })
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
          title: currentPos.venue.name
        })

        //when clicked on a marker zoom in and make its position
        //as maps center
        window.google.maps.event.addListener(marker, 'click', function() {
          mapToMarkOn.setZoom(14)
          mapToMarkOn.setCenter(marker.getPosition())
        })

        //when clicked on the map set the zoom and map center 
        //to default values
        this.defaultMapParams(mapToMarkOn)

        let contentString = `${currentPos.venue.name}`
        this.openInfoWindows(infowindow, mapToMarkOn, marker, contentString)

        return marker
      })
    )
  }

  initGmap = () => {
    let bangalore = {lat: 12.9716, lng: 77.5946};
    let map = new window.google.maps.Map(
    document.getElementById('map'), {zoom: 12, center: bangalore});

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

    // AIzaSyB1PyIGOaNpqlJgnjSMDYcFB-ifW15xhi0

    gmapsPromise.then((google) => {
      const script = document.createElement("script");
      script.src= 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY + "&callback=initGmap"
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    })
  }

  fetchLocations = () => {
    let id = process.env.REACT_APP_FS_API_ID
    console.log(process.env.REACT_APP_FS_API_ID)
    let secret = process.env.REACT_APP_FS_API_SECRET
    console.log(process.env.REACT_APP_FS_API_SECRET)
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
