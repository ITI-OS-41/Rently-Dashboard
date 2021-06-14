import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { FormHelperText, FormControl, InputLabel, Select, Typography, Button, TextField, FormControlLabel } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import { Formik } from 'formik';
import * as yup from 'yup';
import { get, post } from '../../functions/request';
import history from '../../functions/history'
import SubmitButton from '../shared/SubmitButton';

const modelName = 'faq';


const validationSchema = yup.object().shape({
    title: yup
        .string('Enter title')
        .required('title is required'),
    description: yup
        .string('Enter description')
        .required('description is required'),
})



export default function FAQForm(props) {
    const { data, type } = props;
    const initialValues = {
        title: data?.title || '',
        description: data?.description || '',
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        get('/user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const submitForm = (values) => {
        setIsRequesting(true);

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
                    handleSubmit
                } = props;
                return (
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="title" name="title" label="title" value={values.title} onBlur={handleBlur} onChange={handleChange} error={touched.title && Boolean(errors.title)} helperText={touched.title && errors.title} />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="description" name="description" label="description" value={values.description} onBlur={handleBlur} onChange={handleChange} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} />
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
FAQForm.defaultProps = {
    data: null,
    type: "create"
};