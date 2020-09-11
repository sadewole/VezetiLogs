import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import {
  Box,
  Card,
  CardContent,
  Button,
  Container,
  FormHelperText,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import useAuth from 'src/hooks/useAuth';
import { Formik } from 'formik';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { useDispatch, useSelector } from 'src/store';
import { postForgotPin } from 'src/slices/forgotAuth';

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
    minHeight: '100vh'
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
  }
}));

const ForgotPin = () => {
  const classes = useStyles();
  const { method } = useAuth();
  const { message } = useSelector(state => state.forgotAuth);
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  return (
    <Page className={classes.root} title="Forgot Password">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Box mb={8} display="flex" justifyContent="center">
          <RouterLink to="/">
            <Logo />
          </RouterLink>
        </Box>
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
                  Forgot Pin ?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Kindly enter your valid credentials and we will send a reset
                  link to you.
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <img alt="Auth method" src={methodIcons[method]} />
              </div>
            </Box>
            <Box mt={2}>
              <Alert severity="info">
                <div>{message}</div>
              </Alert>
            </Box>
            <Box flexGrow={1} mt={3}>
              <Formik
                initialValues={{
                  orgId: '',
                  mobile: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  mobile: Yup.string()
                    .matches(
                      /^\(?([0-9]{3})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/,
                      'Must be a valid phone number'
                    )
                    .required('Mobile number is required'),
                  orgId: Yup.string()
                    .max(255)
                    .required('Organiztion Id is required')
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting, resetForm }
                ) => {
                  try {
                    await dispatch(postForgotPin(values.orgId, values.mobile));

                    if (isMountedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);
                      resetForm();
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
                  <form noValidate onSubmit={handleSubmit}>
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
                    <TextField
                      error={Boolean(touched.mobile && errors.mobile)}
                      fullWidth
                      helperText={touched.mobile && errors.mobile}
                      label="Phone number"
                      margin="normal"
                      name="mobile"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="text"
                      value={values.mobile}
                      variant="outlined"
                    />
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
                        Change Pin
                      </Button>
                    </Box>
                  </form>
                )}
              </Formik>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
};

export default ForgotPin;
