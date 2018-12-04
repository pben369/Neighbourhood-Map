import React, { Component } from 'react';
import './App.css';
import Gmap from './Gmap.js'
import Sidebar from './Sidebar.js'

require('dotenv').config();

class App extends Component {

  state = {
    map: null,
    infowindow: null,
    venues: [],
    markers: [],
    activeMarker: null,
    activeMarkerPhotoData: null,
    activeMarkerPhotoUrl: null,
    query: ''
  }

  updateMarkerState = (markers) => {
    this.setState({markers})
  }

  defaultMapParams = (mapToMarkOn, marker, infowindow) => {
    let bangalore = {lat: 12.9716, lng: 77.5946}
    this.state.map.setZoom(12)
    mapToMarkOn.setCenter(bangalore)

    if (marker) {
      marker.setAnimation(-1)
    }

    if (infowindow) {
      infowindow.close()
    }
  }

  infoWindowContent = (venueInfo, infowindow) => {
    let content = 
      "<div class=\"infowindow\">" +
      "<img class=\"venue-photo\" alt=\"" + venueInfo.venue.name + "\" src= \"" + venueInfo.photourl + "\" height=\"100\" width=\"100\">" +
      '<h2>' + venueInfo.venue.name + '</h2>' +
      '<br>' + venueInfo.venue.location.formattedAddress[0] +
      '<br>' + venueInfo.venue.location.formattedAddress[1] +
      '<br>' + venueInfo.venue.location.formattedAddress[2] +
      '<br>' + venueInfo.venue.location.formattedAddress[3] +
      '<br><br> Source: FourSquare' +
      "</div>"

    infowindow.setContent(content)
  }

  openInfoWindows = (map, marker, infowindow, VenueData) => {
    infowindow.open(map, marker)
    infowindow.setContent(null)
    // this.fetchActiveMarkerPhotoData(VenueData, infowindow)
    this.infoWindowContent(VenueData, infowindow)
  }

  handleMarkerClick = (mapToMarkOn, marker, VenueData, infowindow) => {
    //when clicked on a marker zoom in and make its position
    //as maps center
    mapToMarkOn.setZoom(15)
    mapToMarkOn.setCenter(marker.getPosition())

    if(this.state.activeMarker){
      // to remove the animation setting the value to 'null' has 
      // a side effect that animation only works twice and the 
      // third time it stops. As the animation constants are simply 
      // int, so setting value to -1 is correct.
      this.state.activeMarker.setAnimation(-1)
    }
    
    marker.setAnimation(window.google.maps.Animation.BOUNCE)
    // clickedMarker.setMap(null)
    this.setState({activeMarker :marker})
    this.openInfoWindows(mapToMarkOn, marker, infowindow, VenueData)
  }

  positionMarkers = (mapToMarkOn) => {
    //create infoWindow object
    let infowindow = new window.google.maps.InfoWindow();
    this.setState({infowindow})

    this.setState({markers :
      this.state.venues.map( VenueData => {
        let marker = new window.google.maps.Marker({
          position: {
            lat: VenueData.venue.location.lat,
            lng: VenueData.venue.location.lng },
          map: mapToMarkOn,
          title: VenueData.venue.name,
          animation: window.google.maps.Animation.DROP,
          id: VenueData.venue.id
        })

        let self = this
        window.google.maps.event.addListener(marker, 'click', function(){
          self.handleMarkerClick(
            mapToMarkOn, 
            marker, 
            VenueData, 
            infowindow)
        })
        //when clicked on the map set the zoom and map center 
        //to default values
        window.google.maps.event.addListener(mapToMarkOn, 'click', function() {
          self.defaultMapParams(mapToMarkOn, marker, infowindow)
        })
        return marker
      })
    })
  }

  initGmap = () => {
    let bangalore = {lat: 12.9716, lng: 77.5946}
    let map = new window.google.maps.Map(
    document.getElementById('map'), {zoom: 12, center: bangalore})

    this.setState({map})

    // The markers positioned at bangalore
    this.positionMarkers(map)
  }

  createScriptTag = () => {
    window.initGmap = this.initGmap;
    let API_KEY = process.env.REACT_APP_GMAP_API_KEY

    //create a promise to check if the variable 'google' is available before
    //map initialisation.
    let gmapsPromise = new Promise ((resolve) => {
        resolve(window.google)
    })

    gmapsPromise.then((google) => {
      const script = document.createElement("script")
      script.src= 'https://maps.googleapis.com/maps/api/js?key='+ API_KEY + "&callback=initGmap"
      script.async = true
      script.defer = true
      document.body.appendChild(script)
    })
  }

  fetchLocations = () => {
    let id = process.env.REACT_APP_FS_API_ID
    let secret = process.env.REACT_APP_FS_API_SECRET

    const apiURL = "https://api.foursquare.com/v2/venues/explore?" +
      "&client_id=" + id +
      "&client_secret=" + secret +
      "&section=outdoor" +
      "&near=Bangalore" +
      "&venuePhotos=1" +
      "&limit=15" +
      "&v=20181127"

    fetch(apiURL)
      .then((response) => {
        return response.json ()
      }).then(data => {
        this.setState({venues : data.response.groups[0].items })
      }).then(data => {
        let updatedVenues =
          this.state.venues.map(venue => {
            let urlFSPhoto = "https://api.foursquare.com/v2/venues/" + 
            venue.venue.id + "/photos?" +
              "&client_id=" + id +
              "&client_secret=" + secret +
              "&v=20181127"
            fetch(urlFSPhoto)
              .then((response) => {
                return response.json ()
              }).then(data => {
                this.setState({activeMarkerPhotoData: data.response})
                
                let urlToPhoto
                if(this.state.activeMarkerPhotoData.photos &&
                  this.state.activeMarkerPhotoData.photos.items["0"]){
                  urlToPhoto = 
                  this.state.activeMarkerPhotoData.photos.items["0"].prefix +
                  '100' +
                  this.state.activeMarkerPhotoData.photos.items["0"].suffix
                }
                else{
                  //fallback image url
                  urlToPhoto = "http://www.azcounties.org/images/pages/N198/No%20found%20photo.png"
                }
                venue.photourl = urlToPhoto
              }).catch(error => { 
                alert(
                  "An error occurred while trying to fetch photo's from Foursquare: " +
                    error
                );
              })
            return venue
          })
        this.setState({venues:updatedVenues})
      }).then(data => {
        this.createScriptTag()
      })
      .catch(error => { 
        alert(
          "An error occurred while trying to fetch data from Foursquare: " +
            error
        );
      })

      window.gm_authFailure = () => {
        alert("An error occurred while trying to load Google Map");
      }
  }
  
  componentDidMount(){
    this.fetchLocations()
  }

  handleSidebarListClick = (clickedVenue) => {
    let marker = this.state.markers.filter(marker =>
      marker.id === clickedVenue.venue.id)[0]

      this.handleMarkerClick(
        this.state.map, 
        marker, 
        clickedVenue, 
        this.state.infowindow
      )
  }

  toggleSideBar = () => {
    document.getElementById('sidebar').classList.toggle('active');
  }

  render() {
    // console.log(this.state.venues)
    return (
      <div id="App">
        <div className="header">
          <div 
            className="toggle-btn"
            onClick = {() => {
              this.toggleSideBar()
            } 
          }
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
          <h1><a aria-label="Home" href="/">Bengaluru</a></h1>
        </div>
        <div>
          <div id="sidebar" className="active">
            <Sidebar 
              mapToMarkOn = { this.state.map }
              infowindow = { this.state.infowindow }
              venuesData = { this.state.venues }
              markers= { this.state.markers }
              updateMarkerState = { this.updateMarkerState }
              handleSidebarListClick = { this.handleSidebarListClick }
              updateQuery = { this.updateQuery }
              defaultMapParams = { this.defaultMapParams }
            />
          </div>
          <div className="map-container">
            <Gmap 
              venues = {this.state.venues}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
