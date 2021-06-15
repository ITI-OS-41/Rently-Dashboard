import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { FormHelperText, FormControl, InputLabel, Select, Typography, Button, TextField, FormControlLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get, post } from '../../functions/request';
import { uploadImage } from '../../functions/helpers';
import history from '../../functions/history'
import SubmitButton from '../shared/SubmitButton';
import Switch from '@material-ui/core/Switch';

const modelName = 'user';
const roles = ['user', 'admin'];


const validationSchema = yup.object().shape({
    firstname: yup
        .string('Enter firstname')
        .required('firstname is required'),
    lastname: yup
        .string('Enter lastname')
        .required('lastname is required'),
    username: yup
        .string('Enter username')
        .required('username is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string('Enter your password')
        .required('Password is required'),
    confirmPassword: yup
        .string('Enter your password again')
        .oneOf([yup.ref('password')], "Confirm Password must be matched with password"),
    role: yup
        .string('Enter user role')
        .oneOf(roles, "Confirm role must be matched with roles"),
})



export default function CategoryForm(props) {
    const { data, type } = props;
    const initialValues = {
        photo: data?.photo || '',
        role: data?.role || 'user',
        firstname: data?.firstname || '',
        lastname: data?.lastname || '',
        email: data?.email || '',
        username: data?.username || '',
        password: data?.password || '',
        referralCode: data?.referralCode || '',
        isVerified: data?.isVerified || false,
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    const setImage = (event) => {
        const file = event.currentTarget.files[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    };
    const submitForm = async (values) => {
        setIsRequesting(true);


        if (values.photo) {
            await uploadImage(values.photo, modelName)
                .then(res => {
                    values.photo = res.data.url
                })
        }

        post(
            `${modelName}/${data?._id || ''}`,
            values, type === 'edit' ? `${modelName} edited successfully!` : `${modelName} added successfully!`
        )
            .then(response => {
                history.push(`/admin/${modelName}`);
            })
            .catch(error => { })
            .finally(() => {
                setIsRequesting(false);
            })
    }


    return (
        <Formik
            onSubmit={(values) => { submitForm(values) }}
            validationSchema={validationSchema}
            initialValues={initialValues}
            enableReinitialize={true}
        >
            {props => {
                const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            {(imagePreview || values.photo) && (<img src={imagePreview || values.photo || ''} height="250" />)}

                            <Grid item xs={12}>
                                <input id="photo" name="photo" type="file" onChange={(event) => {
                                    setFieldValue('photo', event.currentTarget.files[0])
                                    setImage(event)
                                }
                                } />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.role && Boolean(errors.role)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>role</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.role}
                                        label="role"
                                        inputProps={{
                                            name: 'role',
                                        }}
                                    >
                                        <option value='' />

                                        {roles.map(r => {
                                            return (<option key={r} aria-label={r} value={r}>{r}</option>)
                                        })}
                                    </Select>
                                    {touched.role && <FormHelperText>{errors.role}</FormHelperText>}
                                </FormControl>
                            </Grid>


                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth id="firstname" name="firstname" label="firstname" value={values.firstname} onBlur={handleBlur} onChange={handleChange} error={touched.firstname && Boolean(errors.firstname)} helperText={touched.firstname && errors.firstname} />
                            </Grid>

                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth id="lastname" name="lastname" label="lastname" value={values.lastname} onBlur={handleBlur} onChange={handleChange} error={touched.lastname && Boolean(errors.lastname)} helperText={touched.lastname && errors.lastname} />
                            </Grid>



                            <Grid item xs={6}>
                                <TextField variant="outlined" type="email" fullWidth id="email" name="email" label="email" value={values.email} onBlur={handleBlur} onChange={handleChange} error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                            </Grid>



                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth id="username" name="username" label="username" value={values.username} onBlur={handleBlur} onChange={handleChange} error={touched.username && Boolean(errors.username)} helperText={touched.username && errors.username} />
                            </Grid>


                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth type="password" id="password" name="password" label="password" value={values.password} onBlur={handleBlur} onChange={handleChange} error={touched.password && Boolean(errors.password)} helperText={touched.password && errors.password} />
                            </Grid>


                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth type="password" id="confirmPassword" name="confirmPassword" label="confirmPassword" value={values.confirmPassword} onBlur={handleBlur} onChange={handleChange} error={touched.confirmPassword && Boolean(errors.confirmPassword)} helperText={touched.confirmPassword && errors.confirmPassword} />
                            </Grid>


                            <Grid item xs={6}>
                                <TextField variant="outlined" fullWidth id="referralCode" name="referralCode" label="referralCode" value={values.referralCode} onBlur={handleBlur} onChange={handleChange} error={touched.referralCode && Boolean(errors.referralCode)} helperText={touched.referralCode && errors.referralCode} />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.isVerified}
                                            onChange={handleChange}
                                            name="isVerified"
                                            color="primary"
                                        />
                                    }
                                    label="isVerified"
                                    error={touched.isVerified && Boolean(errors.isVerified)} helperText={touched.isVerified && errors.isVerified}
                                />
                            </Grid>





                        </Grid>

                        <Grid container justify="flex-end">
                            <Grid item>
                                <SubmitButton isRequesting={isRequesting} type={type} />
                            </Grid>
                        </Grid>
                    </form>
                )
            }}
        </Formik >
    )
}



// Set default props
CategoryForm.defaultProps = {
    data: null,
    type: "create"
};