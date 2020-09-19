import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Chip,
  Container,
  Divider,
  Link,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import Auth0Login from './Auth0Login';
import { ArrowBack } from '@material-ui/icons';
import FirebaseAuthLogin from './FirebaseAuthLogin';
// import JWTLogin from './JWTLogin';
import VezetiLogin from './VezetiLogin';

const methodIcons = {
  Auth0: '/static/images/auth0.svg',
  FirebaseAuth: '/static/images/firebase.svg',
  JWT: '/static/images/jwt.svg'
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 10,
    minHeight: '100vh'
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  bannerChip: {
    marginRight: theme.spacing(2)
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: 400
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%'
    }
  },
  icon: {
    display: 'flex',
    alignItems: 'center'
  }
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <Page className={classes.root} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Card>
          <CardContent className={classes.cardContent}>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              mb={3}
            >
              <div>
                <Typography color="textPrimary" gutterBottom variant="h2">
                  Sign in
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Sign in on the internal platform
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <RouterLink to="/">
                  <Logo />
                </RouterLink>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              {method === 'Auth0' && <Auth0Login />}
              {method === 'FirebaseAuth' && <FirebaseAuthLogin />}
              {method === 'JWT' && <VezetiLogin />}
            </Box>
            <Box my={3}>
              <Divider />
            </Box>
            <Link
              component={RouterLink}
              to="/register"
              variant="body2"
              color="textSecondary"
            >
              Create new account
            </Link>
          </CardContent>
          <CardActions>
            <Link
              component={RouterLink}
              to="/"
              variant="body2"
              color="textSecondary"
              className={classes.icon}
            >
              <ArrowBack /> Return home
            </Link>
          </CardActions>
        </Card>
      </Container>
    </Page>
  );
};

export default LoginView;
