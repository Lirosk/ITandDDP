import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    useEffect(() => {
        axios.post('http://localhost:3001/signin', {
            // clientId,
            // grantType: 'authorization_code',
            code,
            // redirectUri,
            // codeVerifier
        }).then(res => {
            setAccessToken(res.accessToken);
            setRefreshToken(res.refreshToken);
            setExpiresIn(res.expiresIn);
            window.history.pushState({}, null, '/');
        }).catch((err) => {
            console.log(err);
            // window.location.href = 'signin';
        });
    }, [code]);

    return accessToken;
}
