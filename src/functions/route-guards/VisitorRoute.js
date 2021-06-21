// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../helpers'

const VisitorRoute = ({ component: Component, ...rest }) => {

    // Add your own authentication on the below line.
    const token = getToken()
    console.log({ token });

    return (
        <Route
            {...rest}
            render={props =>
                !token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default VisitorRoute
