import React from 'react';
import axios from 'axios';

import '../styles/components/signing-form.css';

const params = new URLSearchParams(window.location.search);
const code = params.get('code');
const state = params.get('state');

export function Signin() {
    const loginUserViaServer = () => {
        axios
            .post(`http://localhost:3001/authorize`, {
                redirectUri: 'http://localhost:3000/signin',
            }).then(res => {
                window.location.href = res.data.url;
            });
    }

    if (code) {
        window.history.pushState({}, null, 'signin');
        axios.post(`http://localhost:3001/token`, {
            code
        }).then(res => {
            localStorage.setItem('token_type', res.data.tokenType);
            localStorage.setItem('access_token', res.data.accessToken);
            localStorage.setItem('expires_in', res.data.accessToken);
            localStorage.setItem('refresh_token', res.data.refreshToken);

            return;
        });
    }

    return (
        <form className="signing-form">
            <div className="signing-form__container">
                <div className="signing-form__info">
                    <label className="signing-form__label">Login with</label>
                    <img className="signing-form__img" src="img/SpotifyLogo.png" alt="Spotify" />
                </div>
                <button onClick={loginUserViaServer} className="signing-form__button ref-text" type="button">Login</button>
            </div>
        </form>
    );
}
