import React from 'react';
import axios from 'axios';
import MapDisplay from './MapDisplay';
import ErrorMessage from './ErrorMessage';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      coordinates: {},
      errorMessage: ''
    };
  }

  getCoordinates = async (ev) => {
    ev.preventDefault();
    try {
      const API_KEY = process.env.REACT_APP_LOCATIONIQ_API_KEY;
      const URL = `https://us1.locationiq.com/v1/search?key=${API_KEY}&q=${this.state.location}&format=json`;

      const response = await axios.get(URL);
      const data = response.data[0];

      this.setState({
        coordinates: {
          latitude: data.lat,
          longitude: data.lon,
          city: data.display_name
        },
        errorMessage: ''
      });
    } catch (error) {
      console.error(error);

      this.setState({
        errorMessage: 'Unable to retrieve location data. Please try again later.'
      });
    }
  };

  handleLocationInput = (ev) => {
    this.setState({
      location: ev.target.value
    });
  };

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
          <div>
            <h2>{coordinates.city}</h2>
            <p>Latitude: {coordinates.latitude}</p>
            <p>Longitude: {coordinates.longitude}</p>
            <MapDisplay coordinates={coordinates} />
          </div>
        ) : null}
        {errorMessage ? <ErrorMessage message={errorMessage} /> : null}
      </div>
    );
  }
}

export default Main;
