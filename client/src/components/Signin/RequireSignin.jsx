import React from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import {Signin} from '../../pages/Signin';


const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const state = params.get('state');

export default function RequireSignin({ setSignedIn }) {
    const accessToken = useAuth(code, setSignedIn);
    const loggedIn = Boolean(accessToken);

    window.history.pushState({}, null, loggedIn ? '/general' : '/');

    return (
        loggedIn
            ?
            <Outlet context={{ accessToken }} />
            :
            <Signin />
    );
}
 