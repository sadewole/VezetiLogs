import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 128,
    paddingBottom: 128
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  }
}));

const Features = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Typography
          component="p"
          variant="overline"
          color="secondary"
          align="center"
        >
          Our services
        </Typography>
        <Typography variant="h1" align="center" color="textPrimary">
          Position Small Businesses For Big Business
        </Typography>
        <Box mt={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>01</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Virtial telephone number
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Vezeti’s virtual number is a phone number that clients all
                    over the world can use to call your business at no cost to
                    them if you want a toll free 0800 number or a 01-888 number
                    if you want them to pay for the call. By activating a
                    virtual number today, you can expand your business presence
                    to any one of TollFreeForwarding’s 120+ business-boosting
                    destinations around the globe. This service is applicable to
                    only inbound calls only to the Vezeti network.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>02</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Auto Attendant Call Handler
                  </Typography>
                  <Typography variant="body1" color="textPrimary">
                    Vezeti call handler can serve multiple functions in Vezeti
                    Unified Communication Connection. A call handler can answer
                    calls, take messages, be part of an auto-attendant, play a
                    recorded announcement, and transfer calls to users or other
                    call handlers in your company. Vezeti call handler enables
                    your business route calls effectively amongst the various
                    departments with the touch of professionalism.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box display="flex">
                <Avatar className={classes.avatar}>03</Avatar>
                <Box ml={2}>
                  <Typography variant="h4" gutterBottom color="textPrimary">
                    Sip/GSM Extensions & PABX
                  </Typography>
                  <Typography variant="body1" color="textPrimary" gutterBottom>
                    The Vezeti Sip/GSM Extension is a very smart feature of the
                    Vezeti business phone system used by the mobile
                    Entrepreneurs and the businessman on the move. This
                    Extension can ring on your sip device or your GSM line
                    without the caller realizing you have picked your extension
                    on your GSM line. So while you are in Nigeria or roaming
                    abroad, your office extension will ring on your GSM line.
                  </Typography>
                  {/* <Button
                    variant="outlined"
                    component="a"
                    href="https://sketch.cloud/s/q4a8e"
                    target="_blank"
                  >
                    Preview Design
                 </Button> */}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
