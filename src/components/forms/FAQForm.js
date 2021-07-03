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
    question: yup
        .string('Enter question')
        .required('question is required'),
    answer: yup
        .string('Enter answer')
        .required('answer is required'),
    category: yup
        .string('Enter category')
        .required('category is required'),
})



export default function FAQForm(props) {
    const { data, type } = props;

    const [isRequesting, setIsRequesting] = useState(false)
    const [categories, setCategories] = React.useState([]);

    const initialValues = {
        question: data?.question || '',
        answer: data?.answer || '',
        category: data?.category?._id || '',
        section: data?.section || '',
    };


    useEffect(() => {
        get('/category?model=faq')
            .then(response => {
                setCategories(response.data.res);
            })
    }, []);





    const submitForm = (values) => {
        setIsRequesting(true);

        post(
            `${modelName}/${data?._id || ''}`,
            values, type === 'edit' ? `${modelName} edited successfully!` : `${modelName} added successfully!`
        )
            .then(response => {
                history.push(`/admin/${modelName}`);
            })
            .catch(error => {
                console.log(error)})
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
                                <TextField variant="outlined" fullWidth id="question" name="question" label="question" value={values.question} onBlur={handleBlur} onChange={handleChange} error={touched.question && Boolean(errors.question)} helperText={touched.question && errors.question} />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="answer" name="answer" label="answer" value={values.answer} onBlur={handleBlur} onChange={handleChange} error={touched.answer && Boolean(errors.answer)} helperText={touched.answer && errors.answer} />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.category && Boolean(errors.category)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>category</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.category}
                                        label="category"
                                        inputProps={{
                                            name: 'category',
                                        }}
                                    >
                                        <option value='' />

                                        {categories.map(category => {
                                            return (<option key={category._id} aria-label={category.name} value={category._id}>{category.name}</option>)
                                        })}
                                    </Select>
                                    {touched.category && <FormHelperText>{errors.category}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="section" name="section" label="section" value={values.section} onBlur={handleBlur} onChange={handleChange} error={touched.section && Boolean(errors.section)} helperText={touched.section && errors.section} />
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
