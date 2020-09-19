import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 108
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  }
}));

const CTA = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography variant="h1" align="center" color="textPrimary">
          Ready to start?
        </Typography>
        <Typography variant="h1" align="center" color="secondary">
          Setup Your Vezeti Business Number In Less Than 10 Minutes
        </Typography>
        <Box mt={6} display="flex" justifyContent="center" alignItems="center">
          <Button
            color="secondary"
            component={RouterLink}
            to="/register"
            underline="none"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </Container>
    </div>
  );
};

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
