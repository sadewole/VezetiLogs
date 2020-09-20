import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {},
  alert: {
    position: 'fixed',
    top: 0,
    zIndex: 1500
  }
}));

const NetworkDetector = () => {
  const classes = useStyles();
  const [isDisconnected, setIsDisconnected] = useState(false);

  useEffect(() => {
    handleConnectionChange();
    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  });

  const handleConnectionChange = () => {
    const condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
      const webPing = setInterval(() => {
        fetch('//google.com', {
          mode: 'no-cors'
        })
          .then(() => {
            setIsDisconnected(false);
            return clearInterval(webPing);
          })
          .catch(() => {
            setIsDisconnected(true);
          });
      }, 2000);
      return;
    }

    return setIsDisconnected(true);
  };
  return isDisconnected ? (
    <div className={clsx(classes.alert)}>
      <Alert severity="error">
        <div>
          <strong className="font-bold"> Network Error: </strong>
          You're currently offline
        </div>
      </Alert>
    </div>
  ) : null;
};

export default NetworkDetector;
