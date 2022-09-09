import React from 'react';

import '../styles/pages/signin.css';

export function Signin() {
    return (
        <form className="signing-form">
            <div className="signing-form__container">
                <div className="signing-form__info">
                    <label className="signing-form__label">Login with</label>
                    <img className="signing-form__img" src="img/SpotifyLogo.png" alt="Spotify" />
                </div>
                <button className="signing-form__button ref-text" type="button">Login</button>
            </div>
        </form>
    );
}
