import toast from './toast';
import axios from './axios'


const post = async (url, data, successMessage) => await axios.post(url, data)
    .then(response => {
        successMessage && toast.success(successMessage)
        return response
    })
    .catch((error) => {
        const errors = error?.response?.data;
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key])
            }
        }

        return errors
        // throw new Error(errors)
    })


const put = async (url, data, successMessage) => await axios.put(url, data)
    .then(response => {
        successMessage && toast.success(successMessage)
        return response
    })
    .catch((error) => {
        const errors = error?.response?.data;
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key])
            }
        }
        return errors
        // throw new Error(errors)
    })

const patch = async (url, data, successMessage) => await axios.patch(url, data)
    .then(response => {
        successMessage && toast.success(successMessage)
        return response
    })
    .catch((error) => {
        const errors = error?.response?.data;
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key])
            }
        }
        return errors
        // throw new Error(errors)
    })

const get = async (url, successMessage) => await axios.get(url)
    .then(response => {
        successMessage && toast.success(successMessage)
        return response
    })
    .catch((error) => {
        const errors = error?.response?.data;
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key])
            }
        }
        return errors
        // throw new Error(errors)
    })


const del = async (url, successMessage) => await axios.delete(url)
    .then(response => {
        successMessage && toast.success(successMessage)
        return response
    })
    .catch((error) => {
        const errors = error?.response?.data;
        if (errors) {
            for (const key in errors) {
                toast.error(errors[key])
            }
        }
        return errors
        // throw new Error(errors)
    })

export { post,patch, get, del, put }
