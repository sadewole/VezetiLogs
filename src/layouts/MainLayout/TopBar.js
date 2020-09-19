import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

const TopBar = ({ className, ...rest }) => {
  const { isAuthenticated } = useAuth();
  const classes = useStyles();

  return (
    <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Box flexGrow={1} />
        {isAuthenticated && (
          <Link
            className={classes.link}
            color="textSecondary"
            component={RouterLink}
            to="/app"
            underline="none"
            variant="body2"
          >
            Dashboard
          </Link>
        )}

        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/docs"
          underline="none"
          variant="body2"
        >
          Documentation
        </Link>
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="#"
          underline="none"
          variant="body2"
        >
          Product
        </Link>
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="#"
          underline="none"
          variant="body2"
        >
          Pricing
        </Link>
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/"
          underline="none"
          variant="body2"
        >
          Support
        </Link>
        {!isAuthenticated && (
          <>
            <Divider className={classes.divider} />
            <Button
              color="secondary"
              component={RouterLink}
              to="/login"
              variant="contained"
              size="small"
            >
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
