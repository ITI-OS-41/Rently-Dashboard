import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import {Button, FormControlLabel, TextField, Typography} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';

import {Formik} from 'formik';
import * as yup from 'yup';
import {post} from '../../functions/request';
import history from '../../functions/history'
import LoadingCircle from '../shared/LoadingCircle';
import axios from '../../functions/axios'
import toast from "../../functions/toast";

const validationSchema = yup.object().shape({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
})

const initialValues = {
  email: 'admin@gmail.com',
  password: 'adminadmin',
  rememberMe: true
};

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    margin: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }
}));


export default function LoginForm({props}) {
  const classes = useStyles();
  const [isRequesting, setIsRequesting] = useState(false)


  const submitForm = (values) => {
    setIsRequesting(true);

    post('auth/login', values)
      .then(response => {
        const role = response.data.user.role
        if (role === 'admin') {
          const token = response.data.token
          localStorage.setItem('rently-token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          history.push("/admin/dashboard");
        } else {
            toast.error("You are not an admin to login!")
        }

      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setIsRequesting(false);
      })
  }


  return (
    <Formik
      onSubmit={(values) => {
        submitForm(values)
      }}
      validationSchema={validationSchema}
      initialValues={initialValues}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit
        } = props;
        return (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
              </Grid>
              <Grid item xs={12}>

                <FormControlLabel
                  control={
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      color="primary"
                      checked={values.rememberMe}
                      onBlur={handleBlur}
                      onChange={handleChange}
                    />
                  }
                  id="rememberMe"
                  name="rememberMe"
                  label="Remeber me"
                />
              </Grid>
            </Grid>


            <Button
              disabled={isRequesting}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              id="submit"
              size="large"
              startIcon={isRequesting && <LoadingCircle/>}
            >
              Login
            </Button>


            <Grid container justify="flex-end">
              <Grid item>
                <Typography>
                  <Link to="/auth/register" variant="body2">
                    Don't have an account? Register
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </form>
        )
      }}
    </Formik>
  )
}
