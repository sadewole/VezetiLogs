import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
import Cookies from 'js-cookie';
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
import { AddAlertOutlined } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 420,
    position: 'fixed',
    top: 0,
    right: 0,
    margin: theme.spacing(3),
    outline: 'none',
    zIndex: 2000,
    padding: theme.spacing(2)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const AutoLogoutNotification = () => {
  const [isOpen, setOpen] = useState(false);
  const classes = useStyles();
  const { isAuthenticated, logout } = useAuth();

  const sessionLogger = useCallback(() => {
    let timeStamp;
    if (isAuthenticated) {
      timeStamp = new Date();
    }

    document.addEventListener('click', () => {
      if (isAuthenticated) {
        timeStamp = new Date();
      }
    });

    sessionStorage.setItem('lastTimeStamp', timeStamp);
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    sessionLogger();
    timeChecker();
  }, [sessionLogger]);

  let timeChecker = () => {
    setInterval(() => {
      let storedTimeStamp = sessionStorage.getItem('lastTimeStamp');
      timeCompare(storedTimeStamp);
    }, 3000);
  };

  let timeCompare = timeString => {
    const maxTime = 2;
    const popTime = 1;

    let currentTime = new Date();
    let pastTime = new Date(timeString);
    let timeDiff = currentTime - pastTime;

    let minPast = Math.floor(timeDiff / 60000);

    if (minPast === popTime) {
      setOpen(true);
    }

    if (minPast === maxTime) {
      setOpen(false);
      sessionStorage.removeItem('lastTimeStamp');
      logout();

      return false;
    }
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
          <Typography variant="body2" color="textSecondary">
            No activity has been made since last 15 minutes. The system is about
            to log you out. You can disallow this process by clicking the cancel
            button below
          </Typography>
          <Avatar className={classes.avatar}>01</Avatar>
        </Box>
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button color="secondary" variant="contained" onClick={handleClose}>
            Cancel process
          </Button>
        </Box>
      </Paper>
    </Portal>
  );
};

export default AutoLogoutNotification;
