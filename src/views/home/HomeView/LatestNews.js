import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Divider,
  Typography,
  makeStyles,
  CardActions
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
  },
  divider: {
    marginBottom: 100
  },
  card: {
    minHeight: 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    cursor: 'pointer',
    transition: 'transform 0.5s ease-in-out',

    '&:hover': {
      transform: 'scale(1.1)'
    }
  }
}));

const LastestNews = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Container maxWidth="lg">
        <Divider className={clsx(classes.divider)} />
        <Typography variant="h1" align="left" color="textPrimary">
          Lastest News...
        </Typography>
        <Box mt={8}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card className={clsx(classes.card)}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="textSecondary" variant="body2">
                    PRESS
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    26 March, 2016.
                  </Typography>
                </Box>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography color="textPrimary" variant="body1">
                      Vezeti CEO to speak about automated consumer protection
                      results at G50 TechPoint.
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box mt={6} display="flex" alignItems="center">
                    <Avatar src="/static/images/avatars/avatar_1.png" />
                    <Box ml={2}>
                      <Typography
                        color="textSecondary"
                        display="inline"
                        component="span"
                      >
                        Olivier Tassinari
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={clsx(classes.card)}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="textSecondary" variant="body2">
                    PRESS
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    26 March, 2019.
                  </Typography>
                </Box>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography color="textPrimary" variant="body1">
                      Revolutionising Easy Communication Experience
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box mt={6} display="flex" alignItems="center">
                    <Avatar src="/static/images/avatars/avatar_3.png" />
                    <Box ml={2}>
                      <Typography
                        color="textSecondary"
                        display="inline"
                        component="span"
                      >
                        Samuel Adewole
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card className={clsx(classes.card)}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography color="textSecondary" variant="body2">
                    PARTNER
                  </Typography>
                  <Typography color="textSecondary" variant="body2">
                    26 October, 2020.
                  </Typography>
                </Box>
                <CardContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                  >
                    <Typography color="textPrimary" variant="body1">
                      Vezeti and Africa NPSC announce partnership to deliver
                      COIVD-19 education to Global West health serices
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions>
                  <Box mt={6} display="flex" alignItems="center">
                    <Avatar src="/static/images/avatars/avatar_3.png" />
                    <Box ml={2}>
                      <Typography
                        color="textSecondary"
                        display="inline"
                        component="span"
                      >
                        Samuel Adewole
                      </Typography>
                    </Box>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
};

LastestNews.propTypes = {
  className: PropTypes.string
};

export default LastestNews;
