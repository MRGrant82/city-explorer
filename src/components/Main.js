import React from 'react';

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

      const response = await fetch(URL);
      const data = await response.json();

      this.setState({
        coordinates: {
          latitude: data[0].lat,
          longitude: data[0].lon,
          city: data[0].display_name
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
          <div style={{ textAlign: 'center' }}>
            <h2>{coordinates.city}</h2>
            <p>Latitude: {coordinates.latitude}</p>
            <p>Longitude: {coordinates.longitude}</p>
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_API_KEY}&center=${coordinates.latitude},${coordinates.longitude}&zoom=15`}
              alt="Location Map"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        ) : null}
        {errorMessage ? <p>{errorMessage}</p> : null}
      </div>
    );
  }
  
  
}

export default Main;
