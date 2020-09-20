import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'src/store';
import { changeEmail } from 'src/slices/forgotAuth';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Security = ({ className, ...rest }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { message } = useSelector(state => state.forgotAuth);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {message &&
        enqueueSnackbar(message, {
          variant: 'success'
        })}

      <Formik
        initialValues={{
          currentEmail: '',
          newEmail: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          currentEmail: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required'),
          newEmail: Yup.string()
            .email('Must be a valid email')
            .max(255)
            .required('Email is required')
        })}
        onSubmit={async (
          values,
          { resetForm, setErrors, setStatus, setSubmitting }
        ) => {
          try {
            // NOTE: Make API request
            await dispatch(changeEmail(values.currentEmail, values.newEmail));
            resetForm();
            setStatus({ success: true });
            setSubmitting(false);
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
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
          <form onSubmit={handleSubmit}>
            <Card className={clsx(classes.root, className)} {...rest}>
              <CardHeader title="Change Email" />
              <Divider />
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      error={Boolean(
                        touched.currentEmail && errors.currentEmail
                      )}
                      fullWidth
                      helperText={touched.currentEmail && errors.currentEmail}
                      label="Current Email"
                      name="currentEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.currentEmail}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <TextField
                      error={Boolean(touched.newEmail && errors.newEmail)}
                      fullWidth
                      helperText={touched.newEmail && errors.newEmail}
                      label="New Email"
                      name="newEmail"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.newEmail}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                {errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>{errors.submit}</FormHelperText>
                  </Box>
                )}
              </CardContent>
              <Divider />
              <Box p={2} display="flex" justifyContent="flex-end">
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Change Email
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

Security.propTypes = {
  className: PropTypes.string
};

export default Security;
