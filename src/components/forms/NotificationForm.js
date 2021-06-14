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
    sender: yup
        .string('Enter sender')
        .required('Sender is required'),
    receiver: yup
        .string('Enter receiver')
        .required('receiver is required'),
    content: yup
        .string('Enter content')
        .required('Content is required'),
})





export default function NotificationForm(props) {
    const { data, type } = props;
    const initialValues = {
        sender: data?.sender?.id || '',
        receiver: data?.receiver?.id || '',
        content: data?.content || '',
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
                                <FormControl
                                    error={touched.sender && Boolean(errors.sender)}
                                    fullWidth variant="outlined"
                                >
                                    <InputLabel>sender</InputLabel>
                                    <Select
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.sender}
                                        label="sender"
                                        inputProps={{
                                            name: 'sender',
                                        }}
                                    >
                                        <option value='' />

                                        {users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.sender && <FormHelperText>{errors.sender}</FormHelperText>}
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
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

                                        {users.map(user => {
                                            return (<option key={user._id} aria-label={user.username} value={user._id}>{user.username}</option>)
                                        })}
                                    </Select>
                                    {touched.receiver && <FormHelperText>{errors.receiver}</FormHelperText>}
                                </FormControl>
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