import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Grid,
  makeStyles,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Avatar
} from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import Label from 'src/components/Label';

const useStyles = makeStyles(theme => ({
  root: {},
  name: {
    marginTop: theme.spacing(1)
  },
  avatar: {
    height: 200,
    width: 200
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium
  },
  spaceTop: {
    marginTop: 15
  }
}));

const General = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useAuth();
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Profile" />
      <Divider />
      <CardContent>
        <Grid
          className={clsx(classes.root, className)}
          container
          spacing={3}
          {...rest}
        >
          <Grid item xl={3} md={6} xs={12}>
            <Box
              display="flex"
              alignItems="center"
              flexDirection="column"
              textAlign="center"
            >
              <Avatar
                className={classes.avatar}
                src={'/static/images/avatars/avatar_4.png'}
              />
              <Typography
                className={classes.name}
                color="textPrimary"
                gutterBottom
                variant="h3"
              >
                {user.userFirstName} {user.userLastName}
              </Typography>
            </Box>
          </Grid>
          <Grid item xl={3} md={6} xs={12}>
            <Card className={clsx(classes.root, className)} {...rest}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Email
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.email}
                      </Typography>
                      {user.email ? (
                        <Label color="success">Email verified</Label>
                      ) : null}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Phone
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.userPhoneNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Country
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.country || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      State/Region
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.state || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Address
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.address || null}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Account Balance
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.currency3Letters} {user.userAccountBalance}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Account Status
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.userAccountStatus}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className={classes.fontWeightMedium}>
                      Billing Group Type
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="textSecondary">
                        {user.userBillingGroupType}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>

        <Card
          className={clsx(classes.root, classes.spaceTop, className)}
          {...rest}
        >
          <CardHeader title="Account Information" />
          <Divider />
          <Grid
            className={clsx(classes.root, className)}
            container
            spacing={3}
            {...rest}
          >
            {user.sipAccountProfiles.map((prof, index) => {
              return (
                <Grid item md={6} xs={12} key={index}>
                  <Typography variant="body2" color="textSecondary">
                    Column: {index + 1}
                  </Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Sip Username
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.sipUsername}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Sip Password
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.sipPassword}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Switch IP
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.switchIP}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Switch DNS
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.switchDNS}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Sip Port
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.sipPort}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          Extension Number
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.userGlobalExtensionNumber}
                          </Typography>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.fontWeightMedium}>
                          User Intercom Number
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="textSecondary">
                            {prof.userIntercomNumber}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </CardContent>
    </Card>
  );
};

General.propTypes = {
  className: PropTypes.string
};

export default General;
