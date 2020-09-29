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
import { postForgotPassword } from 'src/slices/forgotAuth';

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

const ForgotPassword = () => {
  const classes = useStyles();
  const { method } = useAuth();
  const { message } = useSelector(state => state.forgotAuth);
  const isMountedRef = useIsMountedRef();
  const dispatch = useDispatch();

  return (
    <Page className={classes.root} title="Forgot Password">
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
                  Forgot password?
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Kindly enter your valid credentials and we will send a reset
                  link to you.
                </Typography>
              </div>
              <div className={classes.currentMethodIcon}>
                <RouterLink to="/">
                  <Logo />
                </RouterLink>
              </div>
            </Box>
            {message && message.length ? (
              <Box mt={2}>
                <Alert severity="info">
                  <div>{message}</div>
                </Alert>
              </Box>
            ) : null}
            <Box flexGrow={1} mt={3}>
              <Formik
                initialValues={{
                  orgId: '',
                  email: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email('Must be a valid email')
                    .max(255)
                    .required('Email is required'),
                  orgId: Yup.string()
                    .max(255)
                    .required('Organiztion Id is required')
                })}
                onSubmit={async (
                  values,
                  { setErrors, setStatus, setSubmitting, resetForm }
                ) => {
                  try {
                    await dispatch(
                      postForgotPassword(values.orgId, values.email)
                    );

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
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
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
                        Change Password
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

export default ForgotPassword;
