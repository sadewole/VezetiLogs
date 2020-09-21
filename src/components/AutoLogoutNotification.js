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
  const [second, setSecond] = useState();
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();

  let interval = useRef();

  const sessionLogger = useCallback(() => {
    let timeStamp;
    if (isAuthenticated) {
      timeStamp = new Date();
      sessionStorage.setItem('lastTimeStamp', timeStamp);
    }

    if (isAuthenticated && !isOpen) {
      document.addEventListener('click', () => {
        timeStamp = new Date();
        sessionStorage.setItem('lastTimeStamp', timeStamp);
      });
    }
  }, [isAuthenticated]);

  const handleClose = () => {
    setOpen(false);

    sessionLogger();
  };

  useEffect(() => {
    sessionLogger();
    timeChecker();
  }, [sessionLogger]);

  useEffect(() => {
    document.addEventListener('click', () => {
      if (!isAuthenticated) {
        sessionStorage.removeItem('lastTimeStamp');
      }
    });
  });

  let timeChecker = () => {
    setInterval(() => {
      let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
      timeCompare(storedTimeStamp);
    }, 3000);
  };

  let timeCompare = timeString => {
    const maxTime = 3;
    const popTime = 2;

    interval = setInterval(() => {
      const diff = moment.duration(moment().diff(moment(timeString)));
      const minPast = diff.minutes();
      const leftSecond = 60 - diff.seconds();

      if (minPast === popTime) {
        setSecond(leftSecond);
        setOpen(true);
      }

      if (minPast === maxTime) {
        setOpen(false);
        sessionStorage.removeItem('lastTimeStamp');
        logout();

        return clearInterval(interval);
      }
    }, 1000);
  };

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
