import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Link,
  makeStyles,
  MenuItem,
  InputLabel,
  Select
} from '@material-ui/core';
import { Alert, Autocomplete } from '@material-ui/lab';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const VezetiLogin = ({ className, ...rest }) => {
  const loginOption = ['email', 'mobile'];
  const [loginType, setLoginType] = useState(loginOption[0]);
  const classes = useStyles();
  const { login, message, clearMessage } = useAuth();
  const isMountedRef = useIsMountedRef();

  useEffect(() => {
    return () => {
      clearMessage();
    };
  }, []);

  return (
    <Fragment>
      {message && message.length ? (
        <Box my={2}>
          <Alert severity="error">
            <div>{message}</div>
          </Alert>
        </Box>
      ) : null}
      <Formik
        initialValues={{
          orgId: '',
          email: '',
          password: '',
          mobile: '',
          pin: '',
          submit: null
        }}
        validate={(values, props) => {
          let errors = {};

          if (!values.orgId) {
            errors.orgId = 'Organization Id is required';
          }

          if (values.loginType === 'email') {
            if (!values.email) {
              errors.email = 'Email is required';
            } else if (!/^\S+@\S+$/.test(values.email)) {
              errors.email = 'Must be a valid email';
            }

            if (!values.password) {
              errors.password = 'Password is required';
            }
          } else {
            if (!values.pin) {
              errors.pin = 'Pin is required';
            } else if (!/^[0-9]*$/.test(values.pin)) {
              errors.pin = 'Pin is not valid';
            }

            if (!values.mobile) {
              errors.mobile = 'Phone number is required';
            } else if (
              !/^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/.test(
                values.mobile
              )
            ) {
              errors.mobile = 'Must be a valid phone number';
            }
          }

          return errors;
        }}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            let data;

            if (loginType === 'email') {
              data = {
                typeEmailOrPhone: 'email',
                orgId: values.orgId,
                email: values.email,
                password: values.password
              };
            } else {
              data = {
                typeEmailOrPhone: 'mobile',
                orgId: values.orgId,
                mobile: values.mobile,
                pin: values.pin
              };
            }
            await login(data);

            if (isMountedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
            }
          } catch (err) {
            console.error(err);
            if (isMountedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form
            noValidate
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            {...rest}
          >
            <Autocomplete
              options={loginOption}
              value={loginType}
              onChange={(e, newValue) => {
                setLoginType(newValue);
              }}
              disableClearable={true}
              renderInput={params => (
                <TextField
                  fullWidth
                  name="loginType"
                  label="Login Type"
                  margin="normal"
                  variant="outlined"
                  {...params}
                />
              )}
            />
            <TextField
              error={Boolean(touched.orgId && errors.orgId)}
              fullWidth
              helperText={touched.orgId && errors.orgId}
              label="Organization Id"
              margin="normal"
              name="orgId"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.orgId}
              variant="outlined"
            />
            {/** Change Login Type */}
            {loginType === 'email' ? (
              <Fragment>
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Link
                  component={RouterLink}
                  to="/forgot-password"
                  variant="body2"
                  color="textSecondary"
                >
                  Forgot password?
                </Link>
              </Fragment>
            ) : (
              <Fragment>
                <TextField
                  error={Boolean(touched.mobile && errors.mobile)}
                  fullWidth
                  autoFocus
                  helperText={touched.mobile && errors.mobile}
                  label="Mobile number"
                  margin="normal"
                  name="mobile"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.mobile}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.pin && errors.pin)}
                  fullWidth
                  helperText={touched.pin && errors.pin}
                  label="Pin"
                  margin="normal"
                  name="pin"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.pin}
                  variant="outlined"
                />
                <Link
                  component={RouterLink}
                  to="/forgot-pin"
                  variant="body2"
                  color="textSecondary"
                >
                  Forgot pin?
                </Link>
              </Fragment>
            )}
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box mt={2}>
              <Button
                color="secondary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Log In
              </Button>
            </Box>
            <Box mt={2}>
              <Alert severity="info">
                <div>
                  Use <b>demo@devias.io</b> and password <b>Password123</b>
                </div>
              </Alert>
            </Box>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

VezetiLogin.propTypes = {
  className: PropTypes.string
};

export default VezetiLogin;
