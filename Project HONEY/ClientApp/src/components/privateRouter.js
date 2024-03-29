import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import NavbarService from './services/navbar-service';

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentRole =NavbarService.isRole();
        console.log("Role: ", currentRole);
        if (!currentRole) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles !== currentRole) {
            // role not authorised so redirect to home page
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)