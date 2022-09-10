import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { loginUserViaServer } from '../js/api';
import { Signin } from '../pages/Signin';


const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const state = params.get('state');

export default function RequireSignin({ setSignedIn }) {
    const accessToken = useAuth(code, setSignedIn);
    const loggedIn = Boolean(accessToken);
    // alert(accessToken);

    if (!loggedIn) {
        window.history.pushState({}, null, '/');
    }

    return (
        loggedIn
            ?
            <Outlet context={{ accessToken }} />
            :
            <Signin />
    );
}
