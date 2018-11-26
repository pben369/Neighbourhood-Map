import React, { Component } from 'react';

class Gmap extends Component {


  initGmap(){
    let bangalore = {lat: 12.9716, lng: 77.5946};
    let map = new window.google.maps.Map(
    document.getElementById('map'), {zoom: 14, center: bangalore});
    // The marker, positioned at bangalore
    let marker = new window.google.maps.Marker({position: bangalore, map: map});
  }

  componentDidMount(){
    window.initGmap = this.initGmap;

    //create a promise to check if the variable 'google' is available before
    //map initialisation.
    let gmapsPromise = new Promise ((resolve) => {
        resolve(window.google);
    })

    gmapsPromise.then((google) => {
      const script = document.createElement("script");
      script.src= 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5YOqiaQ6dBEhFOYlh0YWxF2Cs92Xh9AQ&callback=initGmap'
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    })
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