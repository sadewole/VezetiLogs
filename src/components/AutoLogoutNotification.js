import React, { useState, useEffect, useCallback, useRef } from 'react';
import moment from 'moment';
import {
  Box,
  Button,
  Paper,
  Portal,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    top: 0,
    right: 0,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000,
    padding: theme.spacing(2),
    border: '2px solid #ab003c',
    backgroundColor: theme.palette.error.light
  },
  avatar: {
    backgroundColor: '#ab003c',
    color: theme.palette.secondary.contrastText
  }
}));

const AutoLogoutNotification = () => {
  const [second, setSecond] = useState(0);
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();

  let timeStamp, warningInactiveInterval, startTimerInterval;

  const handleClose = () => {
    clearInterval(warningInactiveInterval);
    setOpen(false);
  };

  let timeChecker = () => {
    startTimerInterval = setInterval(() => {
      let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
      warningInactive(storedTimeStamp);
    }, 1000);
  };

  let warningInactive = timeString => {
    clearInterval(startTimerInterval);
    warningInactiveInterval = setInterval(() => {
      const maxTime = 2;
      const popTime = 1;

      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        clearInterval(warningInactiveInterval);
        setOpen(false);
        sessionStorage.removeItem('lastTimeStamp');
        logout();
      }
    }, 1000);
  };

  useEffect(() => {
    if (isAuthenticated) {
      clearInterval(startTimerInterval);
      timeStamp = new Date();
      sessionStorage.setItem('lastTimeStamp', timeStamp);
    }

    window.addEventListener(
      'click',
      e => {
        e.stopImmediatePropagation();
        e.stopPropagation();

        if (isAuthenticated && second < 1) {
          console.log(second);

          clearInterval(warningInactiveInterval);

          timeStamp = new Date();
          setOpen(false);
          sessionStorage.setItem('lastTimeStamp', timeStamp);
        }
      },
      false
    );

    timeChecker();
  }, [isAuthenticated, isOpen]);

  useEffect(() => {
    window.addEventListener('click', () => {
      if (!isAuthenticated) {
        sessionStorage.removeItem('lastTimeStamp');
      }
    });
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <Paper className={classes.root} elevation={3}>
        <Typography variant="h4" color="textPrimary" gutterBottom>
          System Auto Logout
        </Typography>
        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography variant="body2">
            No activity has been made since last 2 minutes. The system is about
            to log you out. You can disallow this process by clicking the cancel
            button below
          </Typography>
          <Avatar className={classes.avatar}>{second}</Avatar>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button variant="contained" onClick={handleClose}>
            Cancel process
          </Button>
        </Box>
      </Paper>
    </Portal>
  );
};

export default AutoLogoutNotification;
