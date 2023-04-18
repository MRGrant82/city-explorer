import React from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, ZoomControl, useMapEvents } from 'react-leaflet';

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
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coordinates !== this.props.coordinates) {
      const map = this.mapRef.current.leafletElement;
      map.flyTo([this.props.coordinates.latitude, this.props.coordinates.longitude], 15);
    }
  }

  render() {
    const { coordinates } = this.props;

    return (
      <div style={{ height: '100vh', width: '100%', border: '5px solid black' }}>
        <MapContainer
          ref={this.mapRef}
          style={{ height: '100%', width: '100%' }}
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={15}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[coordinates.latitude, coordinates.longitude]} />
          <ZoomControl position="bottomright" />
          <CustomZoomControl />
        </MapContainer>
      </div>
    );
  }
}

function CustomZoomControl() {
  const map = useMapEvents({
    zoomstart: () => {
      map.scrollWheelZoom.disable();
    },
    zoomend: () => {
      map.scrollWheelZoom.enable();
    },
  });

  return null;
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
