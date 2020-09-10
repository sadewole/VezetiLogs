import React, { Fragment } from 'react';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  FormHelperText,
  TextField,
  makeStyles,
  Select
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import useAuth from 'src/hooks/useAuth';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

const useStyles = makeStyles(() => ({
  root: {}
}));

const VezetiLogin = ({ className, ...rest }) => {
  const classes = useStyles();
  const { login } = useAuth();
  const isMountedRef = useIsMountedRef();

  return (
    <Formik
      initialValues={{
        loginType: 'email',
        orgId: '3456',
        email: 'demo@devias.io',
        password: 'Password123',
        mobile: '0908986890',
        pin: '3546',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        orgId: Yup.string()
          .max(255)
          .required('Organization Id is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .max(255)
          .required('Email is required'),
        password: Yup.string()
          .max(255)
          .required('Password is required'),
        mobile: Yup.string()
          .matches(
            /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
            'Must be a valid phone number'
          )
          .required('Mobile number is required'),
        pin: Yup.string()
          .matches(/^[0-9]*$/, 'Pin is not valid')
          .max(5)
          .required('Pin is required')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {

          let data;

          if(values.loginType === 'email'){
            data = {
              typeEmailOrPhone: 'email',
              orgId: values.orgId,
              email: values.email,
              password: values.password
            }
          }else{
            data = {
              typeEmailOrPhone: 'mobile',
              orgId: values.orgId,
              mobile: values.mobile,
              pin: values.pin
            }
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
          <Select
            label="Login type"
            fullWidth
            name="loginType"
            margin="normal"
            value={values.loginType}
            onChange={handleChange}
            variant="outlined"
            native
          >
            <option value="email">Email</option>
            <option value="mobile">Mobile</option>
          </Select>
          <TextField
            error={Boolean(touched.orgId && errors.orgId)}
            fullWidth
            autoFocus
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
          {values.loginType === 'email' ? (
            <Fragment>
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                autoFocus
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
  );
};

VezetiLogin.propTypes = {
  className: PropTypes.string
};

export default VezetiLogin;
