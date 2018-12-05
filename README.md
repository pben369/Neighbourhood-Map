
# My Neighbourhood Project:

This project is called "My Neighbourhood" project, a single page application bootstrapped with [Create React App](https://github.com/facebook/create-react-app), features a map of Bangalore - my neighborhood. With functionalities of highlighted locations, third-party data about those locations and various ways to browse the content.

## Functionalities:

1. All application components render on-screen in a responsive manner.
2. All application components are usable across modern desktop, tablet, and phone browsers.
3. Location search and list view of venues.
4. Markers displayed on map as per the search results.
5. Each Marker when clicked displays venue photo and address.
6. This app uses Accessibility features which helps in easy navigation using keyboard.
7. Offline use - this app when built and deployed can be used offline once its cache is fetched.

## API's used :

1. [Google Map Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) to display map and markers
2. [FourSquare](https://developer.foursquare.com) API to fetch the venues in Bangalore and associated photo urls.

## Installation:

1. Download the zip file.

2. Unzip and Change path to project directory
```
cd Neighbourhood-Map
```
3. Install dependencies
```
npm install
```

## Running the project:

1. Change path to project directory
```
cd Neighbourhood-Map
```
2. Start the server
```
npm start
```
3. Access [localhost:3000](http://localhost:3000/) to see the output.


## NOTE : 
1. serviceworker can be tested only available in build mode.
2. The FourSquare API has a daily limit for fetching venue's photo information, after which it will console log error 429() to indicate it. During which app uses a fallback image url to display "No Image Found".