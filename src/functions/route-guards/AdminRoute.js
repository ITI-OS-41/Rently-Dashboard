// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAdmin } from '../helpers'
import {UserContext} from "../../Context";

const AdminRoute = ({ component: Component, ...rest }) => {

    const user = JSON.parse(localStorage.getItem('rently-user'));

    const token = user?.token || null

    return (
        <Route
            {...rest}
            render={props =>
              (token && user.role === 'admin') ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default AdminRoute
