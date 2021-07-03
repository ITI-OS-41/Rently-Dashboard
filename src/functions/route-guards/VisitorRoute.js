import React, {useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../helpers'
import {UserContext} from "../../Context";

const VisitorRoute = ({ component: Component, ...rest }) => {
    const user = JSON.parse(localStorage.getItem('rently-user'));

    // Add your own authentication on the below line.
    const token = user?.token || null


    return (
        <Route
            {...rest}
            render={props =>
                !token ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/admin/index', state: { from: props.location } }} />
                )
            }
        />
    )
}

export default VisitorRoute
