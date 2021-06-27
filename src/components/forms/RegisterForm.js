import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Typography, Button, TextField, FormHelperText, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { Formik } from 'formik';
import * as yup from 'yup';
import { post } from '../../functions/request';
import history from '../../functions/history'
import LoadingCircle from '../shared/LoadingCircle';


const validationSchema = yup.object().shape({
    firstname: yup
        .string('Enter your firstname')
        .min(3, 'firstname should be of minimum 3 characters length')
        .required('firstname is required'),
    lastname: yup
        .string('Enter your lastname')
        .min(3, 'lastname should be of minimum 3 characters length')
        .required('lastname is required'),
    username: yup
        .string('Enter your username')
        .min(3, 'username should be of minimum 3 characters length')
        .required('username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password again')
        .oneOf([yup.ref('password')], "Confirm Password must be matched with password"),
    terms: yup.boolean()
        .oneOf([true], 'You must agree to terms and conditions to continue')
})

const initialValues = {
    firstname: 'mahmoud',
    lastname: 'hassan',
    username: 'hsn',
    email: 'da7doom@gmail.com',
    password: '123123123',
    confirmPassword: '123123123',
    terms: true
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





export default function RegisterForm({ props }) {
    const classes = useStyles();
    const [isRequesting, setIsRequesting] = useState(false)


    const submitForm = (values) => {
        setIsRequesting(true);

        post('user/register', values, "Registered successfully!")
            .then(response => {
                history.push("/auth/login");
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
            onSubmit={(values) => { submitForm(values) }}
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
                                    id="firstname"
                                    name="firstname"
                                    label="firstname"
                                    value={values.firstname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.firstname && Boolean(errors.firstname)}
                                    helperText={touched.firstname && errors.firstname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="lastname"
                                    name="lastname"
                                    label="lastname"
                                    value={values.lastname}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.lastname && Boolean(errors.lastname)}
                                    helperText={touched.lastname && errors.lastname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="username"
                                    name="username"
                                    label="username"
                                    value={values.username}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.username && Boolean(errors.username)}
                                    helperText={touched.username && errors.username}
                                />
                            </Grid>
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
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    label="confirmPassword"
                                    type="password"
                                    value={values.confirmPassword}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    helperText={touched.confirmPassword && errors.confirmPassword}
                                />
                            </Grid>
                            <Grid item xs={12}>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            id="terms"
                                            name="terms"
                                            color="primary"
                                            checked={values.terms}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    }
                                    id="terms"
                                    name="terms"
                                    label="I accept terms and conditions"
                                />
                                <FormHelperText error>
                                    {touched.terms ? errors.terms : ''}
                                </FormHelperText>

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
                            Sign Up
                        </Button>


                        <Grid container justify="flex-end">
                            <Grid item>
                                <Typography>
                                    <Link to="/auth/login" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                )
            }}
        </Formik >
    )
}

