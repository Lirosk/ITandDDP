const crypto = require('crypto');


// snatched
function generateRandomString(length) {
    var text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

async function loginUser(clientId, redirectUri) {
    const state = generateRandomString(16);

    const scope = [
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-currently-playing',
        'user-follow-modify',
        'user-follow-read',
        'user-read-private',
        'user-read-recently-played',
        'user-read-playback-position',
        'user-top-read',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-read-private',
        'playlist-modify-private',
        'app-remote-control',
        'streaming',
        'user-library-modify',
        'user-library-read',
    ].join(' ');

    const codeVerifier = generateRandomString(64);
    return generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        // window.localStorage.setItem(codeVerifierKey, codeVerifier);

        let url = generateUrlWithParams(
            'https://accounts.spotify.com/authorize',
            {
                'response_type': 'code',
                'client_id': clientId,
                'show_dialog': false,
                'redirect_uri': redirectUri,
                'state': state,
                'code_challenge_method': 'S256',
                'code_challenge': codeChallenge,
                'scope': scope,
            }
        );

        return {
            url,
            credentials: {
                clientId,
                grantType: 'authorization_code',
                redirectUri,
                codeVerifier,
            }
        };
        // window.location.href = url;
        // window.open(url);
    });
}

function generateUrlWithParams(url, params) {
    const urlObject = new URL(url);
    urlObject.search = new URLSearchParams(params).toString();

    return urlObject.toString();
}

// snatched
async function generateCodeChallenge(codeVerifier) {
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(codeVerifier));

    return btoa(String.fromCharCode(...new Uint8Array(digest)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

function requestAccessToken(credentials) {
    return fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id: credentials.clientId,
            grant_type: credentials.grantType,
            code: credentials.code,
            redirect_uri: credentials.redirectUri,
            code_verifier: credentials.codeVerifier,
        }),
    }).then((response) => {
        return response.json().then(data => {
            return {
                tokenType: data.token_type,
                accessToken: data.access_token,
                expiresIn: data.expires_in,
                refreshToken: data.refresh_token,
            };
        });

    }).catch(error => {
        console.log({ error: error });
    });
}

module.exports = { loginUser, requestAccessToken };