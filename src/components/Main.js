import React from 'react';
import axios from 'axios';


//TODO: Create a state for location, coordinates, and error messages

//TODO: getCoordinates() function using axios to get lat and long 

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
