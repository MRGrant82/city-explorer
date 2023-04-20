import React from 'react';

class Weather extends React.Component {
  render() {
    const { forecasts } = this.props;
    return (
      <div>
        <h2>Weather Forecast</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {forecasts.map((forecast, index) => (
              <tr key={index}>
                <td>{forecast.date}</td>
                <td>{forecast.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Weather;
