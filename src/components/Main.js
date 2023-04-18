import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

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

  render() {
    const { coordinates, errorMessage } = this.state;
    return (
      <div>
        <h1>Location App</h1>
        <form onSubmit={this.getCoordinates}>
          <label htmlFor="location">Enter Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            onChange={this.handleLocationInput}
          />
          <button type="submit">Search</button>
        </form>
        {coordinates.latitude && coordinates.longitude ? (
          <MapDisplay coordinates={coordinates} zoom={15} />
        ) : null}
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </div>
    );
  }
}

class MapDisplay extends React.Component {
  render() {
    const { coordinates, zoom } = this.props;
  
    return (
      <div>
        <h2>City Map</h2>
        <img
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${coordinates.latitude},${coordinates.longitude}&zoom=${zoom}`}
          alt="Map"
        />
      </div>
    );
  }
}

class ErrorMessage extends React.Component {
  render() {
    const { message } = this.props;
      
    return (
      <div>
        {message ? <p>{message}</p> : null}
      </div>
    );
  }
}

export default Main;
