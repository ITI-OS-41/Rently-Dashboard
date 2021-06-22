// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { isAdmin } from '../helpers'

const AdminRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const token = localStorage.getItem('rently-token')

    return (
        <Route
            {...rest}
            render={props =>
              (token && isAdmin(token)) ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default AdminRoute
