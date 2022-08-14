const stateKey = 'state';
const codeVerifierKey = 'code_verifier';
const clientIdKey = "client_id";
const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
const expiresAtKey = 'expires_at';
const usernameKey = 'name';
const tokenTypekey = 'token_type';
const countryKey = 'country';

const clientId = "706b7ab1e375491da3603f6f52df368c";

const AuthUrl = 'https://accounts.spotify.com/authorize';
const TokenUrl = 'https://accounts.spotify.com/api/token';
const UserUrl = 'https://api.spotify.com/v1/me';
const recomendationsUri = 'https://api.spotify.com/v1/recommendations';

const redirectTo = 'signin.html';
const redirectAfterLogin = 'general.html';

// snatched
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export function loginUser() {
    localStorage.setItem(clientIdKey, clientId);

    const redirectUri = window.location.origin + '/pages/' + redirectTo;

    const state = generateRandomString(16);
    localStorage.setItem(stateKey, state);

    var scope = [
        'user-modify-playback-state',
        'user-read-playback-state',
        'user-read-currently-playing',
        'user-follow-modify',
        'user-follow-read',
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
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
        window.localStorage.setItem(codeVerifierKey, codeVerifier);

        let url = generateUrlWithParams(
            AuthUrl,
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

        window.location.href = url;
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

export function handleAuthRedirect(query) {
    const { code, state } = getCodeAndState(query);

    const windowUri = window.location.origin + window.location.pathname;
    requestAccessToken(code, windowUri);
}

function getCodeAndState(query) {
    const urlParams = new URLSearchParams(query);

    const code = urlParams.get('code');
    const state = urlParams.get('state');

    return { code, state };
}

function requestAccessToken(code, redirect_uri) {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", TokenUrl, true);

    fetch(TokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id: clientId,
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirect_uri,
            code_verifier: localStorage.getItem(codeVerifierKey),
        }),
    }).then((response) => {
        handleAccessTokenResponse(response);
        window.history.pushState({}, document.title, window.location.pathname);
    });
}

/**
 * 
 * @param {Response} response 
 */
function handleAccessTokenResponse(response) {
    if (response.ok) {
        response.json().then((data) => {
            const access_token = data.access_token;
            const refresh_token = data.refresh_token;
            const expires_in = data.expires_in;
            const token_type = data.token_type;

            const t = new Date();
            const expires_at = new Date().setSeconds(t.getSeconds() + expires_in);

            localStorage.setItem(accessTokenKey, access_token);
            localStorage.setItem(refreshTokenKey, refresh_token);
            localStorage.setItem(expiresAtKey, expires_at);
            localStorage.setItem(tokenTypekey, token_type);
        });

        getUserData();

        window.location.href = window.location.origin + '/pages/' + redirectAfterLogin;
    }
}


function getUserData() {
    fetch(UserUrl, {
        method: "GET",
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem(accessTokenKey),
        },
    }).then((response) => {
        response.json().then((data) => {
            console.log(data);

            localStorage.setItem(usernameKey, data.display_name);
            localStorage.setItem(countryKey, data.country);
        });
    });
}

function refreshAccessToken() {
    fetch(TokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
        body: new URLSearchParams({
            client_id,
            grant_type: 'refresh_token',
            refresh_token,
        }),
    }).then(handleAccessTokenResponse);
}


