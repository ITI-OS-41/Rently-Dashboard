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

const modelName = 'notification';


const validationSchema = yup.object().shape({
    receiver: yup
        .string('Enter receiver')
        .required('receiver is required'),
    content: yup
        .string('Enter content')
        .required('Content is required'),
})





export default function NotificationForm(props) {
    const { data, type } = props;
    console.log({data})
    console.log({type})
    const initialValues = {
        receiver: data?.receiver?._id || '',
        content: data?.content || '',
    };
    const [isRequesting, setIsRequesting] = useState(false)
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        get('/user/top')
            .then(response => {
                setUsers(response.data)
            })
    }, [])

    const submitForm = (values) => {
        setIsRequesting(true);


        post(
            `${modelName}/${data?._id || ''}`,
            {
                ...values,
                isRead: false,
                type: 'rent'
            }, type === 'edit' ? `${modelName} edited successfully!` : `${modelName} added successfully!`
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
                                {users.length && <FormControl
                                    error={touched.receiver && Boolean(errors.receiver)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>receiver</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.receiver}
                                        label="receiver"
                                        inputProps={{
                                            name: 'receiver',
                                        }}
                                    >
                                        <option value='' />

                                        {users.length && users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.receiver && <FormHelperText>{errors.receiver}</FormHelperText>}
                                </FormControl>}
                            </Grid>
                            <Grid item xs={12}>
                                <TextField variant="outlined" fullWidth multiline rowsMax={8} id="content" name="content" label="content" value={values.content} onBlur={handleBlur} onChange={handleChange} error={touched.content && Boolean(errors.content)} helperText={touched.content && errors.content} />
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
NotificationForm.defaultProps = {
    data: null,
    type: "create"
};
