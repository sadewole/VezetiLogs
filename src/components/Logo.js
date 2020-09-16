import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      style={{ width: '40px', height: '40px' }}
      {...props}
    />
  );
};

export default Logo;
