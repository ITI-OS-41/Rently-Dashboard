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
import ImageUploader from "../shared/ImageUploader";
import Map from "../shared/Map";


const modelName = 'item';
const conditions = ["perfect", "very good", "descent", "good", "fair"];
const cancellations = ["easygoing", "reasonable", "strict"];



/*{
    "category": "60d2766707a7ce4028dd6356",
    "isAvailable": "true",
    "isPublished": false,
    "isSubmitted":"true",
    "subcategory": "60d443ad4c87113990b5c9b4",
    "name": "catttttttttttty",
    "description": "description field is required",
    "stock": "3" ,
    "condition": "descent",
    "deposit": "3",
    "photo":["https://res.cloudinary.com/rently-service/image/upload/v1624968578/item/195273491_337552051064053_4110566312842753444_n_yzkqdk.jpg"],
    "isDeliverable": false,
    "cancellation": "strict",
    "price": {"day":"12","week":"56","month":""},
    "location":{"type":"Point","coordinates":[12,30]}
}*/

const validationSchema = yup.object().shape({
    owner: yup
        .string('Enter owner')
        .required('owner is required'),
    // photo: yup
    //     .string('Enter photos')
    //     .required('photos is required'),
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
    isDeliverable: yup
        .string('Enter isDeliverable')
        .required('isDeliverable is required'),
    isAvailable: yup
        .string('Enter isAvailable')
        .required('isAvailable is required'),
    isPublished: yup
        .string('Enter isPublished')
        .required('isPublished is required'),
    deposit: yup
        .string('Enter deposit')
        .required('deposit is required'),
    // price: yup
    //     .string('Enter price')
    //     .required('price is required'),


    priceDay: yup
        .string('Enter priceDay')
        .required('priceDay is required'),
})



export default function ItemForm(props) {
    const { data, type } = props;
    const initialValues = {
        photo: data?.photo || [],
        owner: data?.owner?._id || '60c77b82af8cc2f12a031a4e',
        category: data?.category?._id || '60c7b0ae4530040015709bc3',
        subcategory: data?.subcategory?._id || '60c7dac16900f400157cf460',
        condition: data?.condition || 'perfect',
        status: data?.status || true,
        name: data?.name || 'safas ',
        stock: data?.stock || 9,
        description: data?.description || 'asdasd',
        location: data?.location || {},
        cancellation: data?.cancellation || "strict",
        deposit: data?.deposit || 99,
        price: data?.price || {  },
        isAvailable: data?.isAvailable || false,
        isDeliverable: data?.isDeliverable || true,
        isPublished: data?.isPublished || true,



        priceDay: data?.price?.day || 0,
        priceWeek: data?.price?.week || 0,
        priceMonth: data?.price?.month || 0,
    };


    let [formValues, setFormValues] = useState(initialValues);

    const [isRequesting, setIsRequesting] = useState(false)
    const [users, setUsers] = React.useState([]);
    const [categorys, setCategorys] = React.useState([]);
    const [subcategorys, setSubcategorys] = React.useState([]);
    const [uploadedNewPhoto, setUploadedNewPhoto] = React.useState(false);


    useEffect(() => {
        get('/user/top')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    useEffect(() => {
        get('/category')
            .then(response => {
                setCategorys(response.data.res)
            })
    }, [])

    useEffect(() => {
        console.log("subcategory use effect")
        get(`/subcategory?category=${formValues.category}`)
            .then(response => {
                setSubcategorys(response.data.res)
            })
    }, [formValues])



    const submitForm = async (values) => {
        setIsRequesting(true);

        console.log('hsn ',{values})

        // set prices
        values.stock = values.stock.toString();


        values.stock = values.stock.toString();
        values.deposit = values.deposit.toString();
        values.status = values.status.toString()
        values.isDeliverable = values.isDeliverable.toString()
        values.isPublished = values.isPublished.toString()
        values.isAvailable = values.isAvailable.toString()
        values.isSubmitted = false

        values.price.day = values.priceDay && values.priceDay
        values.price.week = values.priceWeek && values.priceWeek
        values.price.month = values.priceMonth && values.priceMonth

        if (uploadedNewPhoto) {
            let images = [];

            for (let i = 0; i < values.photo.length; i++) {
                await uploadImage(values.photo[i], modelName)
                    .then(res => {
                        images.push(res.data.url)
                    })
                    .catch(e=>{
                        console.log(e)
                    })
            }

            values.photo = images;
        }

        post(
            `${modelName}/${data?._id || ''}`,
            values, type === 'edit' ? `${modelName} edited successfully!` : `${modelName} added successfully!`
        )
            .then(response => {
                console.log(response)
                history.push(`/admin/${modelName}`);
            })
            .catch(error => {
                console.log(error)
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
                            <ImageUploader multiple={true} onSubmit={images=>{
                                setFieldValue('photo', images);
                                setUploadedNewPhoto(true)
                            }}
                           current={values.photo}

                            />
                            {touched.photo && <FormHelperText>{errors.photo}</FormHelperText>}


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

                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    id="priceDay"
                                    name="priceDay"
                                    label="priceDay"
                                    inputProps={{
                                        min: 0
                                    }}
                                    value={values.price.day || values.priceDay}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    id="priceWeek"
                                    name="priceWeek"
                                    label="priceWeek"
                                    inputProps={{
                                        min: 0
                                    }}
                                    value={values.price.week || values.priceWeek}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={4}>
                                <TextField
                                    variant="outlined"
                                    type="number"
                                    fullWidth
                                    id="priceMonth"
                                    name="priceMonth"
                                    label="priceMonth"
                                    inputProps={{
                                        min: 0
                                    }}
                                    value={values.price.month || values.priceMonth}
                                    onChange={handleChange}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.isAvailable}
                                            onChange={handleChange}
                                            name="isAvailable"
                                            color="primary"
                                        />
                                    }
                                    label="isAvailable"
                                    error={touched.isAvailable && Boolean(errors.isAvailable)} helperText={touched.isAvailable && errors.isAvailable}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.isDeliverable}
                                            onChange={handleChange}
                                            name="isDeliverable"
                                            color="primary"
                                        />
                                    }
                                    label="isDeliverable"
                                    error={touched.isDeliverable && Boolean(errors.isDeliverable)} helperText={touched.isDeliverable && errors.isDeliverable}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={values.isPublished}
                                            onChange={handleChange}
                                            name="isPublished"
                                            color="primary"
                                        />
                                    }
                                    label="isPublished"
                                    error={touched.isPublished && Boolean(errors.isPublished)} helperText={touched.isPublished && errors.isPublished}
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <TextField variant="outlined" type="number" fullWidth id="deposit" name="deposit" label="deposit" value={values.deposit} onBlur={handleBlur} onChange={handleChange} error={touched.deposit && Boolean(errors.deposit)} helperText={touched.deposit && errors.deposit} />
                            </Grid>

                            <Grid item xs={12}>


                                <Map
                                    current={{lat: values.location.coordinates[0],lng: values.location.coordinates[1]}}
                                    changeCoordinates={(pos,address)=>{setFieldValue("location",{
                                    type:"Point",
                                    coordinates:[pos.lat,pos.lng],
                                    address:address
                                })}}/>

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
ItemForm.defaultProps = {
    data: null,
    type: "create"
};
