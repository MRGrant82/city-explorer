import React from 'react';
import axios from 'axios';

// TODO: Create a state for location, coordinates, and error messages

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      coordinates: {},
      errorMessage: ''
    };
  }

  // TODO: getCoordinates() function using axios to get lat and long 
  getCoordinates = async (ev) => {
    ev.preventDefault();
    try {
      const API_KEY = process.env.REACT_APP_LOCATIONIQ_API_KEY;
      const URL = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.location}&format=json`;

      const response = await axios.get(URL);
      const data = response.data[0];

      this.setState({
        coordinates: { latitude: data.lat, longitude: data.lon },
        errorMessage: ''
      });
    } catch (error) {
      console.error(error);
    
      this.setState({
        errorMessage: 'Unable to retrieve location data. Please try again later.'
      });
    }
  }

  // TODO: create the LocationInput component that will render an input field and submit button
  // use an event handler to update the location state when input changes
  // use an event handler to call the getCoordinates() function when the user submits the location
  
  handleLocationInput = (ev) => {
    this.setState({
      location: ev.target.value
    });
  }

  // TODO: Create the MapDisplay component that 
  // renders a map 
  // set the center of the map to the lat and long passed via the coordinates state
  // adjust the map zoom level, style, etc.

  // TODO: Create the ErrorMessage component that conditionally renders an error message based on message prop
  // import the ErrorMessage
  // update the errorMessage state when an error occurs in the getCoordinates() function
  // render the LocationInput, MapDisplay and ErrorMessage components conditionally based on the coordinates and errorMessage states

  render() {
    return (
      <div>
        {/* TODO: render the LocationInput component */}
        {/* TODO: render the MapDisplay component */}
        {/* TODO: render the ErrorMessage component */}
      </div>
    );
  }
}

export default Main;
