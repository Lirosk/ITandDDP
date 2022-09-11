import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function useAuth(code, setSignedIn) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const [tokenType, setTokenType] = useState();

    useEffect(() => {
        axios.post('http://localhost:3001/token', {
            code,
        }).then(res => {
            if (!res.data.accessToken) {
                return;
            }

            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            setTokenType(res.data.tokenType);

            sessionStorage.setItem('access_token', res.data.accessToken);
            sessionStorage.setItem('refresh_token', res.data.refreshToken);
            sessionStorage.setItem('expires_in', res.data.expiresIn);
            sessionStorage.setItem('token_type', res.data.tokenType);

            setSignedIn(true);
        }).catch((err) => {
            console.log(err);
        });
    }, [code]);

    useEffect(() => {
        if (!refreshToken || !expiresIn) {
            return;
        }

        axios.post('http://localhost:3001/refresh', {
            refreshToken,
            accessToken,
            tokenType,
        }).then(res => {
            if (!res.accessToken) {
                return;
            }

            const newAccessToken = res.accessToken;
            const newExpiresIn = res.expiresIn;

            setAccessToken(newAccessToken);
            setExpiresIn(newExpiresIn);

            sessionStorage.setItem('access_token', res.accessToken);
            sessionStorage.setItem('expires_in', res.expiresIn);

            alert(2);

            setTimeout(
                setExpiresIn(0),
                (expiresIn - 600) * 1000
            );
        });
    }, [refreshToken, expiresIn]);

    return accessToken;
}
