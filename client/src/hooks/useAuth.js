import React, { useEffect, useState } from 'react';

import axios from 'axios';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();
    const [tokenType, setTokenType] = useState();

    useEffect(() => {
        axios.post('http://localhost:3001/token', {
            code,
        }).then(res => {
            window.history.pushState({}, null, '/');

            if (!res.data.accessToken) {
                return;
            }

            setAccessToken(res.data.accessToken);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
            setTokenType(res.data.tokenType);
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
        });
    }, [refreshToken, expiresIn]);

    return accessToken;
}
