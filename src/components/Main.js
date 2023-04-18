import React from 'react';
import axios from 'axios';



//TODO: Create a state for location, coordinates, and error messages

class Main extends React.Component {


constructor(props) {
    super(props);
    this.state = {
        location: '',
        coordinates: {},
        errorMessage: '',
    }
}

//TODO: getCoordinates() function using axios to get lat and long 


getCityData = async (ev) => {
    ev.preventDefault();
    try {
     
      const url = `https://us1.locationiq.com/v1/search?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&q=${this.state.city}&format=json`;
  
      
      const cityDataResponse = await axios.get(url);
  
     
      console.log(cityDataResponse.data[0]);
       
      this.setState({
        cityData: cityDataResponse.data[0],
        error: false,
      });
    } catch (error) {
      
      this.setState({
        error: true,
        errorMsg: error.message,
      });
    }
  };
  


//TODO: create the LocationInput component that will render an input field and submit button
// use an event handler to update the location state when input changes
// use an event handler to call the getCoordinates() function when the user submits the location

//TODO: Create the MapDisplay component that 
// renders a map 
// set the center of the map to the lat and long passed via the coordinates state
// adjust the map zoom level, style, etc.

//TODO: Create the ErrorMessage component that conditionally renders an error message based on message prop
// import the ErrorMessage
// update the errorMEssage state when an error occurs in the getCoordinates() function
// render the LocationInput, MapDisplay and ErrorMessage components conditionally based on the coordinates and errorMessage states
}

export default Main;