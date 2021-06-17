import React, { useEffect, useState } from 'react';
import { FormHelperText, FormControl, InputLabel, Select, TextField } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get, post } from '../../functions/request';
import history from '../../functions/history'
import SubmitButton from '../shared/SubmitButton';
import Rating from '@material-ui/lab/Rating';


const modelName = 'apprate';


const validationSchema = yup.object().shape({
    rater: yup
        .string('Enter rater')
        .required('rater is required'),
    site: yup
        .string('Enter site')
        .required('site is required'),
    comment: yup
        .string('Enter comment')
        .required('comment is required'),
    rating: yup
        .number('Enter rating')
        .required('rating is required'),
})





export default function AppRateForm(props) {
    const { data, type } = props;
    const initialValues = {
        rater: data?.rater?._id || '',
        site: data?.site || '',
        comment: data?.comment || '',
        rating: data?.rating || 0,
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [users, setUsers] = React.useState([]);
    const apps = ["Rently"];

    useEffect(() => {
        get('/user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const submitForm = (values) => {
        setIsRequesting(true);

        values.rating = '' + values.rating
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
                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.rater && Boolean(errors.rater)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>rater</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.rater}
                                        label="rater"
                                        inputProps={{
                                            name: 'rater',
                                        }}
                                    >
                                        <option value='' />

                                        {users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.rater && <FormHelperText>{errors.rater}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.site && Boolean(errors.site)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>site</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.site}
                                        label="site"
                                        inputProps={{
                                            name: 'site',
                                        }}
                                    >
                                        <option value='' />

                                        {apps.map(app => {
                                            return (<option key={app} aria-label={app} value={app}>{app}</option>)
                                        })}
                                    </Select>
                                    {touched.site && <FormHelperText>{errors.site}</FormHelperText>}
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="comment" name="comment" label="comment" value={values.comment} onBlur={handleBlur} onChange={handleChange} error={touched.comment && Boolean(errors.comment)} helperText={touched.comment && errors.comment} />
                            </Grid>

                            <Grid item xs={12}>
                                <Rating
                                    name="rating"
                                    value={values.rating}
                                    onChange={(event, newValue) => {
                                        setFieldValue('rating', newValue);
                                    }}
                                    error={touched.rating && Boolean(errors.rating)} helperText={touched.rating && errors.rating}
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
AppRateForm.defaultProps = {
    data: null,
    type: "create"
};