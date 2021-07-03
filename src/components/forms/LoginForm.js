import React, {useContext, useState} from 'react';
import { Link } from 'react-router-dom'
import { Button, FormControlLabel, TextField, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as yup from 'yup';
import { post } from '../../functions/request';
import history from '../../functions/history'
import LoadingCircle from '../shared/LoadingCircle';
import axios from '../../functions/axios'
import toast from "../../functions/toast";
import {UserContext} from "../../Context";

const validationSchema = yup.object().shape({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
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


export default function LoginForm({ props }) {
  const classes = useStyles();
  const [isRequesting, setIsRequesting] = useState(false)
  const {user,setUser} = useContext(UserContext);

  const submitForm = (values) => {
    setIsRequesting(true);

    post('user/login', values)
      .then(response => {

        const token = response.data.token;
        const userid = response.data._id;
        const allData = response.data;
        const role = response.data.role

        if (role === 'admin') {

          localStorage.setItem('rently-user', JSON.stringify(allData));
          localStorage.setItem('rently-token', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

          setUser(allData);

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
              startIcon={isRequesting && <LoadingCircle />}
            >
              Login
            </Button>
          </form>
        )
      }}
    </Formik>
  )
}

