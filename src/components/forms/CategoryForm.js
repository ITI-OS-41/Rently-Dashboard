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

const modelName = 'category';


const validationSchema = yup.object().shape({
    name: yup
        .string('Enter name')
        .required('name is required'),
    description: yup
        .string('Enter description')
        .required('description is required'),
})



export default function CategoryForm(props) {
    const { data, type } = props;
    const initialValues = {
        name: data?.name || '',
        description: data?.description || '',
        photo: data?.photo || '',
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)

    const setImage = (event) => {
        const file = event.currentTarget.files[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    };
    const submitForm = (values) => {


        console.log(values);

        uploadImage(values.photo)

        // setIsRequesting(true);

        // post(
        //     `${modelName}/${data?._id || ''}`,
        //     values, type === 'edit' ? `${modelName} edited successfully!` : `${modelName} added successfully!`
        // )
        //     .then(response => {
        //         history.push(`/admin/${modelName}`);
        //     })
        //     .catch(error => { })
        //     .finally(() => {
        //         setIsRequesting(false);
        //     })
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
                            {imagePreview && (<img src={imagePreview} height="250" />)}

                            <Grid item xs={12}>
                                <input id="photo" name="photo" type="file" onChange={(event) => {
                                    setFieldValue('photo', event.currentTarget.files[0])
                                    setImage(event)
                                }
                                } />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="name" name="name" label="name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
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
CategoryForm.defaultProps = {
    data: null,
    type: "create"
};