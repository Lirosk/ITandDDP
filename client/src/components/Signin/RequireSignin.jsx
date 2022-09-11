import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { Signin } from '../../pages/Signin';


const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const state = params.get('state');

export default function RequireSignin({ setSignedIn }) {
    useAuth(code, setSignedIn);
    const loggedIn = Boolean(sessionStorage.getItem('access_token'));


    if (!loggedIn) {
        window.history.pushState({}, null, '');
    }

    setSignedIn(loggedIn);

    return (
        loggedIn
            ?
            <Outlet />
            :
            <Signin />
    );
}
