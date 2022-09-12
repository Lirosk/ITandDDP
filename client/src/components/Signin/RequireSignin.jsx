import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useDevice from '../../hooks/useDevice';
import { getUserData } from '../../js/api';
import { Signin } from '../../pages/Signin';


const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const state = params.get('state');

export default function RequireSignin({ signedIn , setSignedIn }) {
    useAuth(code, setSignedIn);
    const loggedIn = Boolean(sessionStorage.getItem('access_token'));
    useDevice(signedIn);
    getUserData(signedIn);

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
