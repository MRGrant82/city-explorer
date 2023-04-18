import React from 'react';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 15
    };
  }

  handleZoomIn = () => {
    this.setState({
      zoom: this.state.zoom + 1
    });
  };

  handleZoomOut = () => {
    this.setState({
      zoom: this.state.zoom - 1
    });
  };

  render() {
    const { cityData } = this.props;
    const lat = cityData ? cityData.lat : null;
    const lon = cityData ? cityData.lon : null;
    const zoom = this.state.zoom;

    const mapUrl = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_IQ_API_KEY}&center=${lat},${lon}&zoom=${zoom}`;

    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        {lat && lon ? (
          <>
            <img src={mapUrl} alt="Location Map" />
            <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '1000' }}>
              <button onClick={this.handleZoomIn}>+</button>
              <button onClick={this.handleZoomOut}>-</button>
            </div>
          </>
        ) : (
          <p>Loading map...</p>
        )}
      </div>
    );
  }
}

export default MapDisplay;
