import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Signin } from '../pages/Signin';

export default function RequireSignin() {
    const value = localStorage.getItem('access_token');
    const signedIn = Boolean(value === "undefined" ? false : value);

    alert(signedIn);

    return (
        signedIn
            ?
            <Outlet />
            :
            <Signin />
    );
}
