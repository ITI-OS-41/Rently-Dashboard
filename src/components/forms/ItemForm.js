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
import Switch from '@material-ui/core/Switch';
import toast from '../../functions/toast';


const modelName = 'item';
const conditions = ["perfect", "very good", "descent", "good", "fair"];
const cancellations = ["Easygoing", "Reasonable", "Strict"];


const validationSchema = yup.object().shape({
    owner: yup
        .string('Enter owner')
        .required('owner is required'),
    category: yup
        .string('Enter category')
        .required('category is required'),
    subcategory: yup
        .string('Enter subcategory')
        .required('subcategory is required'),
    condition: yup
        .string('Enter condition')
        .required('condition is required'),
    status: yup
        .string('Enter status')
        .required('status is required'),
    name: yup
        .string('Enter name')
        .required('name is required'),
    stock: yup
        .string('Enter stock')
        .required('stock is required'),
    description: yup
        .string('Enter description')
        .required('description is required'),
    cancellation: yup
        .string('Enter cancellation')
        .required('cancellation is required'),
    deliverable: yup
        .string('Enter deliverable')
        .required('deliverable is required'),
    deposit: yup
        .string('Enter deposit')
        .required('deposit is required'),
})



export default function NotificationForm(props) {
    const { data, type } = props;
    const initialValues = {
        photo: data?.photo || '',
        owner: data?.owner?.id || '60c77b82af8cc2f12a031a4e',
        category: data?.category?.id || '60c7b0ae4530040015709bc3',
        subcategory: data?.subcategory?.id || '60c7dac16900f400157cf460',
        condition: data?.condition || 'perfect',
        status: data?.status || true,
        name: data?.name || 'asdasd asd asd ',
        stock: data?.stock || 9,
        description: data?.description || 'asdasd',
        // location: data?.location || {},
        cancellation: data?.cancellation || "Strict",
        deliverable: data?.deliverable || true,
        deposit: data?.deposit || 99,
        price: data?.price || { hour: 6, day: 1, week: 2, month: 3 }
    };
    let [formValues, setFormValues] = useState(initialValues);

    const [isRequesting, setIsRequesting] = useState(false)
    const [imagePreview, setImagePreview] = useState(null)
    const [users, setUsers] = React.useState([]);
    const [categorys, setCategorys] = React.useState([]);
    const [subcategorys, setSubcategorys] = React.useState([]);


    useEffect(() => {
        get('/user')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    useEffect(() => {
        get('/category')
            .then(response => {
                setCategorys(response.data)
            })
    }, [])

    useEffect(() => {
        console.log("subcategory use effect")
        get(`/subcategory?category=${formValues.category}`)
            .then(response => {
                setSubcategorys(response.data)
            })
    }, [formValues])



    const setImage = (event) => {
        const file = event.currentTarget.files[0]
        if (file) {
            setImagePreview(URL.createObjectURL(file))
        }
    };


    const submitForm = async (values) => {
        setIsRequesting(true);


        values.stock = values.stock.toString();
        values.deposit = values.deposit.toString();
        values.status = values.status.toString()
        values.deliverable = values.deliverable.toString()

        // ! TODO: Price and location
        values.location = {
            type: "Point",
            coordinates: [1, 2],
            address: "asd"
        }


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
                const onChange = e => {
                    const targetEl = e.target;
                    const fieldName = targetEl.name;
                    setFormValues({
                        ...formValues,
                        [fieldName]: targetEl.value
                    });
                    return handleChange(e);
                }
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
                                    error={touched.owner && Boolean(errors.owner)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>owner</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.owner}
                                        label="owner"
                                        inputProps={{
                                            name: 'owner',
                                        }}
                                    >
                                        <option value='' />

                                        {users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.owner && <FormHelperText>{errors.owner}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.category && Boolean(errors.category)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>category</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={onChange}
                                        value={values.category}
                                        label="category"
                                        inputProps={{
                                            name: 'category',
                                        }}
                                    >
                                        <option value='' />

                                        {categorys.map(category => {
                                            return (<option key={category._id} aria-label={category.name} value={category._id}>{category.name}</option>)
                                        })}
                                    </Select>
                                    {touched.category && <FormHelperText>{errors.category}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.subcategory && Boolean(errors.subcategory)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>subcategory</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.subcategory}
                                        label="subcategory"
                                        inputProps={{
                                            name: 'subcategory',
                                        }}
                                    >
                                        <option value='' />

                                        {subcategorys.map(subcategory => {
                                            return (<option key={subcategory._id} aria-label={subcategory.name} value={subcategory._id}>{subcategory.name}</option>)
                                        })}
                                    </Select>
                                    {touched.subcategory && <FormHelperText>{errors.subcategory}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.condition && Boolean(errors.condition)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>condition</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.condition}
                                        label="condition"
                                        inputProps={{
                                            name: 'condition',
                                        }}
                                    >
                                        <option value='' />

                                        {conditions.map(r => {
                                            return (<option key={r} aria-label={r} value={r}>{r}</option>)
                                        })}
                                    </Select>
                                    {touched.condition && <FormHelperText>{errors.condition}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.status}
                                            onChange={handleChange}
                                            name="status"
                                            color="primary"
                                        />
                                    }
                                    label="status"
                                    error={touched.status && Boolean(errors.status)} helperText={touched.status && errors.status}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth id="name" name="name" label="name" value={values.name} onBlur={handleBlur} onChange={handleChange} error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="description" name="description" label="description" value={values.description} onBlur={handleBlur} onChange={handleChange} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControl
                                    error={touched.cancellation && Boolean(errors.cancellation)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>cancellation</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.cancellation}
                                        label="cancellation"
                                        inputProps={{
                                            name: 'cancellation',
                                        }}
                                    >
                                        <option value='' />

                                        {cancellations.map(r => {
                                            return (<option key={r} aria-label={r} value={r}>{r}</option>)
                                        })}
                                    </Select>
                                    {touched.cancellation && <FormHelperText>{errors.cancellation}</FormHelperText>}
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" type="number" fullWidth id="stock" name="stock" label="stock" value={values.stock} onBlur={handleBlur} onChange={handleChange} error={touched.stock && Boolean(errors.stock)} helperText={touched.stock && errors.stock} />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.deliverable}
                                            onChange={handleChange}
                                            name="deliverable"
                                            color="primary"
                                        />
                                    }
                                    label="deliverable"
                                    error={touched.deliverable && Boolean(errors.deliverable)} helperText={touched.deliverable && errors.deliverable}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" type="number" fullWidth id="deposit" name="deposit" label="deposit" value={values.deposit} onBlur={handleBlur} onChange={handleChange} error={touched.deposit && Boolean(errors.deposit)} helperText={touched.deposit && errors.deposit} />
                            </Grid>
                        </Grid>

                        <Grid container justify="flex-end">
                            <Grid item>
                                <SubmitButton isRequesting={isRequesting} type={type} />
                            </Grid>
                        </Grid>
                    </form>
                )
            }
            }
        </Formik >
    )
}



// Set default props
NotificationForm.defaultProps = {
    data: null,
    type: "create"
};