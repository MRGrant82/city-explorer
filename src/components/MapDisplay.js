import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

class MapDisplay extends React.Component {
  render() {
    const { coordinates } = this.props;

    return (
      <div style={{ height: '80vh', width: '100%' }}>
        <MapContainer
          center={[coordinates.latitude, coordinates.longitude]}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          <Marker position={[coordinates.latitude, coordinates.longitude]}>
            <Popup>{this.props.city}</Popup>
          </Marker>
        </MapContainer>
      </div>
    );
  }
}

export default MapDisplay;
