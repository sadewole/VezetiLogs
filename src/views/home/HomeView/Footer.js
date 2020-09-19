import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Container, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 10,
    paddingBottom: 10
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Footer = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &copy; {new Date().getFullYear()}
        </Typography>
      </Container>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
