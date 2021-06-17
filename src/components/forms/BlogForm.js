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
import { uploadImage } from 'functions/helpers';


const modelName = 'blog';


const validationSchema = yup.object().shape({
    title: yup
        .string('Enter title')
        .required('Title is required'),
    author: yup
        .string('Enter author')
        .required('author is required'),
    description: yup
        .string('Enter description')
        .required('Description is required'),
})



export default function BlogForm(props) {
    const { data, type } = props;
    const initialValues = {
        photo: data?.photo || '',
        author: data?.author?._id || '',
        title: data?.title || '',
        description: data?.description || '',
        tags: data?.tags?.join() || ''
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        get('/user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

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
        //convert tags splitted by comma(,) to array
        values.tags = values.tags?.split(',') || []
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
                                    error={touched.author && Boolean(errors.author)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>author</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.author}
                                        label="author"
                                        inputProps={{
                                            name: 'author',
                                        }}
                                        required
                                    >
                                        <option value='' />

                                        {users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.author && <FormHelperText>{errors.author}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="title" name="title" label="title" value={values.title} onBlur={handleBlur} onChange={handleChange} error={touched.title && Boolean(errors.title)} helperText={touched.title && errors.title} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="description" name="description" label="description" value={values.description} onBlur={handleBlur} onChange={handleChange} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="tags" name="tags" label="tags" value={values.tags} onBlur={handleBlur} onChange={handleChange} error={touched.tags && Boolean(errors.tags)} helperText={touched.tags && errors.tags} />
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
BlogForm.defaultProps = {
    data: null,
    type: "create"
};