import React from 'react';

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

export default ErrorMessage;
