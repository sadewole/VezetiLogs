import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 128,
    paddingBottom: 128
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

const Testimonials = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="md">
        <Typography
          variant="body2"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          &quot; I love the best for my business and after having conversations
          with the guys at Vezeti, I immediately knew this was the right
          direction for me to take in setting up our lines. Now, we totally
          control our telephony presence without breaking the purse. Lit stuff.
          Mrs Adeola Ubuwere Mrs Adeola Ubuwere Resident, Lekki Gardens Phase 1
          Easy. This is the one word I would use to describe my experience with
          Vezeti. .&quot;
        </Typography>
        <Box mt={6} display="flex" justifyContent="center" alignItems="center">
          <Avatar src="/static/home/olivier.png" />
          <Box ml={2}>
            <Typography variant="body1" color="textPrimary">
              Olivier Tassinari
              <Typography
                color="textSecondary"
                display="inline"
                component="span"
              >
                _ COO, Tesla
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
