import axios from "axios";
import { TrackFromEntry, AlbumFromEntry, clearQueryFromUrl, PlaylistFromEntry } from "./utils.js";


export const countryKey = 'country';

const stateKey = 'state';
const codeVerifierKey = 'code_verifier';
const clientIdKey = "client_id";
const accessTokenKey = 'access_token';
const refreshTokenKey = 'refresh_token';
const expiresInKey = 'expires_in';
const usernameKey = 'name';
const tokenTypeKey = 'token_type';
const availableDeviceKey = 'available_device';

const clientId = "706b7ab1e375491da3603f6f52df368c";

const AuthUrl = 'https://accounts.spotify.com/authorize';
const TokenUrl = 'https://accounts.spotify.com/api/token';
const UserUrl = 'https://api.spotify.com/v1/me';
const recomendationsUri = 'https://api.spotify.com/v1/recommendations';

const redirectTo = 'signin';
const redirectAfterLogin = 'general';


export function loginUserViaServer() {
    axios
        .post(`http://localhost:3001/authorize`, {
            redirectUri: 'http://localhost:3000/',
        }).then(res => {
            window.location.href = res.data.url;
        });
}


async function getUserData() {
    return GET(
        UserUrl,
        data => {
            localStorage.setItem(usernameKey, data.display_name);
            localStorage.setItem(countryKey, data.country);
        });
}

export async function getRecomendations(limit, onEachLoadedCategory) {
    let market = localStorage.getItem(countryKey);

    return GET(
        `https://api.spotify.com/v1/browse/categories?offset=0&limit=50${market ? `&country=${market}` : ''}`,
        data => {
            const categories = data.categories.items;
            const choosenCategories = [];
            const indexes = new Set();

            if (categories.length < limit) {
                categories.forEach(category => {
                    choosenCategories.push({ 'id': category.id, 'name': category.name, 'playlists': [] });
                });
            }
            else {
                while (indexes.size < limit) {
                    let index = Math.floor(Math.random() * categories.length);
                    indexes.add(index);
                }

                indexes.forEach(index => {
                    let category = categories[index];
                    choosenCategories.push({ 'id': category.id, 'name': category.name, 'playlists': [] });
                });
            }

            for (const i in choosenCategories) {
                const category = choosenCategories[i];

                getCathegoryPlaylists(category.id).then(playlists => {
                    category.playlists = playlists;
                    onEachLoadedCategory(category);
                });
            }
        }
    );
}

function getCathegoryPlaylists(category_id) {
    return GET(
        `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?offset=0&limit=10`,
        data => {
            const playlists = [];

            // console.log(data.playlists.items);

            const container = data.playlists.items;
            for (const i in container) {
                const item = container[i];
                playlists.push(PlaylistFromEntry(item));
            }

            return playlists;
        }
    );
}

function getArtistsSeeds() {
    return GET(
        'https://api.spotify.com/v1/me/following?type=artist',
        data => {
            if (data.total === 0) {
                return getRandomArtistsSeeds();
            }

            const container = data.artists.items;
            let seed_artists = [];
            let genres = [];

            for (var key in container) {
                const item = container[key];

                seed_artists.push(item.id);
                item.genres.map(genre => {
                    genres.push(genre);
                });
            }

            return { seed_artists, genres };
        });
}

function getRandomArtistsSeeds() {

}

function getRandomGenresSeeds() {
    return GET(
        'https://api.spotify.com/v1/recommendations/available-genre-seeds',
        data => {
            const container = data.items;

            let seeds = [];

            for (let key in container) {
                let item = container[key].track;
                seeds.push(item.id);
            }

            return seeds;
        });
}

function getTracksSeeds() {
    return GET(
        'https://api.spotify.com/v1/me/tracks',
        data => {
            if (data.total === 0) {
                return getRandomTracksSeeds();
            }

            const container = data.items;

            let ids = [];

            for (let key in container) {
                let item = container[key].track;
                ids.push(item.id);
            }

            return ids;
        });

}

function getRandomTracksSeeds() {

}

/**
 * 
 * @param {string} url 
 * @param {(data: object) => any} handleResponseData 
 * @returns 
 */
async function GET(url, handleResponseData) {
    return request(url, 'GET').then(data => {
        return handleResponseData(data);
    });
}

export async function getUsersAudios() {
    return GET(
        'https://api.spotify.com/v1/me/tracks?offset=0&limit=50',
        data => {
            const container = data.items;

            let res = [];

            container.forEach(item => {
                res.push(TrackFromEntry(item.track));
            });

            return res;
        });
}

export function getUsersAlbums() {
    return GET(
        'https://api.spotify.com/v1/me/albums?offset=0&limit=50',
        data => {
            const container = data.items;

            let res = [];

            container.forEach(item => {
                res.push(AlbumFromEntry(item.album));
            });

            return res;
        });
}

export async function getNextItems(nextUrl, extractItemFromEntry, handleExtractedItems, attr = undefined, itemAttr = undefined, maxItems = 0, predicate = null) {
    getNextItemsRecursive(nextUrl, extractItemFromEntry, handleExtractedItems, attr, itemAttr, maxItems, predicate, 0);
}

async function getNextItemsRecursive(nextUrl, extractItemFromEntry, handleExtractedItems, attr, itemAttr, maxItems, predicate, hasItems) {
    GET(
        nextUrl,
        data => {
            const container = attr ? data[attr] : data;

            let res = [];
            try {
                container.items.forEach(entry => {
                    if (!(predicate && !predicate(entry))) {
                        if (maxItems && hasItems + 1 > maxItems) {
                            throw Error('max');
                        }

                        res.push(extractItemFromEntry(itemAttr ? entry[itemAttr] : entry));

                        hasItems++;
                    }
                });

                if (container.next) {
                    getNextItemsRecursive(container.next, extractItemFromEntry, handleExtractedItems, attr, itemAttr, maxItems, predicate, hasItems);
                }
            }
            catch (error) {
                if (error.message === 'max') {
                    console.log(`Max count (${maxItems}) for ${attr} reached.`);
                    return;
                }

                throw error;
            }
            finally {
                handleExtractedItems(res);
            }
        }
    );
}

export async function getAvailableDevice() {
    return GET(
        `https://api.spotify.com/v1/me/player/devices`,
        data => {
            if (data.devices[0]) {
                localStorage.setItem(availableDeviceKey, data.devices[0].id);
                return data.devices[0];
            }

            return null;
        }
    );
}

export async function playAlbum(id, position = 0, progress_ms = 0, is_playlist = false) {
    return PUT(
        `https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem(availableDeviceKey)}`,
        {
            'context_uri': `spotify:${is_playlist ? 'playlist' : 'album'}:${id}`,
            "position_ms": progress_ms,
            "offset": {
                "position": position,
            }
        });
}


async function PUT(url, body) {
    return request(
        url,
        'PUT',
        body
    );
}

export async function checkForSavedTracks(ids) {
    const now = ids.slice(0, 50);
    const next = ids.slice(50);

    return GET(
        `https://api.spotify.com/v1/me/tracks/contains?ids=${now.join(',')}`,
        data => {
            if (next.length === 0) {
                return data;
            }

            return checkForSavedTracks(next).then(res => {
                return [...data, ...res];
            });
        }
    );
}

export async function saveTrack(id) {
    return request(
        `https://api.spotify.com/v1/me/tracks?ids=${id}`,
        'PUT',
    ).catch(error => {
        console.log(error);
    });
}

export async function removeSavedTrack(id) {
    return request(
        `https://api.spotify.com/v1/me/tracks?ids=${id}`,
        'DELETE',
    ).catch(error => {
        console.log(error);
    });
}


let lastRequestTime = Date.now();
async function request(url, method, body = null) {
    while (Date.now() - lastRequestTime < 100) {
        // busy wait
    }
    lastRequestTime = Date.now();

    const payload = {
        method,
        headers: {
            'Authorization': localStorage.getItem(tokenTypeKey) + ' ' + localStorage.getItem(accessTokenKey),
            'Content-Type': 'application/json'
        },
    };

    if (body) {
        payload.body = JSON.stringify(body);
    }

    return fetch(
        url,
        payload
    ).then(response => {
        if (![2, 3].includes(Math.floor(response.status / 100))) {
            if (response.status === 401) {
                // return refreshAccessToken().then((res) => {
                //     if (!res) {
                //         alert('Re');
                //     }

                //     return request(url, method, body);
                // });
            }

            return response.json().then(
                data => {
                    if (response.status === 404 && data.error.message === 'Device not found') {
                        return getAvailableDevice().then((res) => {
                            if (!res) {
                                alert('No available devices');
                            }

                            return request(url, method, body);
                        });
                    }

                    console.log(data.error.message);
                }
            );
        }

        return response;
    }).then(response => {
        // return (response.bodyUsed ? response.json() : {});
        if (!response) {
            return null;
        }

        if (response.status === 204) {
            return null;
        }

        return response.json();
    });
}

export async function playTrack(id, position_ms = 0) {
    return request(
        `https://api.spotify.com/v1/me/player/play?device_id=${localStorage.getItem(availableDeviceKey)}`,
        'PUT',
        {
            uris: [`spotify:track:${id}`],
            position_ms,
        }
    );
}

export async function pause() {
    return request(
        `https://api.spotify.com/v1/me/player/pause?device_id=${localStorage.getItem(availableDeviceKey)}`,
        'PUT'
    );
}

export async function getCurrentProgessMs() {
    return GET(
        `https://api.spotify.com/v1/me/player`,
        data => {
            return data.progress_ms;
        }
    );
}

export async function addToQueue(id) {
    return request(
        `https://api.spotify.com/v1/me/player/queue?device_id=${localStorage.getItem(availableDeviceKey)}&uri=spotify:track:${id}`,
        'POST'
    );
}

// not documented, 4xx status but works
export async function removeFromQueue(id) {
    return request(
        `https://api.spotify.com/v1/me/player/queue?device_id=${localStorage.getItem(availableDeviceKey)}&uri=spotify:track:${id}`,
        'DELETE'
    );
}

export async function getPlaybackStatus() {
    return GET(
        `https://api.spotify.com/v1/me/player`,
        data => {
            return data;
        }
    );
}

export function trackPlaybackState(interval_ms = 500) {
    setInterval(getPlaybackStatus().then(status => {

    }), interval_ms);
}

export function playNext() {
    return request(
        `https://api.spotify.com/v1/me/player/next?device_id=${localStorage.getItem(availableDeviceKey)}`,
        'POST'
    );
}

export function playPrevious() {
    return request(
        `https://api.spotify.com/v1/me/player/previous?device_id=${localStorage.getItem(availableDeviceKey)}`,
        'POST'
    );
}

export function checkForUserLoggedIn() {
    if (!localStorage.getItem(accessTokenKey)) {
        window.location.href = `${window.location.origin}/pages/signin.html`;
    }
}

export function getLastPlayedTrack() {
    return GET(
        `https://api.spotify.com/v1/me/player/recently-played?limit=1&before=${Math.floor(Date.now())}`,
        data => {
            return TrackFromEntry(data.items[0].track);
        }
    );
}

export function seekTo(position_ms) {
    return request(
        `https://api.spotify.com/v1/me/player/seek?device_id=${localStorage.getItem(availableDeviceKey)}&position_ms=${position_ms}`,
        'PUT'
    );
}

export function setVolume(vol_percent) {
    return request(
        `https://api.spotify.com/v1/me/player/volume?device_id=${localStorage.getItem(availableDeviceKey)}&volume_percent=${vol_percent}`,
        'PUT'
    );
}

export function setRepeat(state) {
    return request(
        `https://api.spotify.com/v1/me/player/repeat?device_id=${localStorage.getItem(availableDeviceKey)}&state=${state ? 'track' : 'off'}`,
        'PUT'
    );
}

export function setShuffle(state) {
    return request(
        `https://api.spotify.com/v1/me/player/shuffle?device_id=${localStorage.getItem(availableDeviceKey)}&state=${state}`,
        'PUT'
    );
}

export function getAlbum(albumId) {
    return GET(
        `https://api.spotify.com/v1/albums/${albumId}`,
        data => {
            return AlbumFromEntry(data, true);
        }
    );
}

export function checkForSavedAlbum(id) {
    return GET(
        `https://api.spotify.com/v1/me/albums/contains?ids=${id}`,
        data => {
            return data[0];
        }
    );

}

export function getPlaylist(id) {
    return GET(
        `https://api.spotify.com/v1/playlists/${id}`,
        data => {
            return PlaylistFromEntry(data, true);
        }
    );
}

export function addAlbumToUserLibrary(albumId) {
    return request(
        `https://api.spotify.com/v1/me/albums?ids=${albumId}`,
        'PUT',
    );
}

export function removeAlbumFromUserLibrary(albumId) {
    return request(
        `https://api.spotify.com/v1/me/albums?ids=${albumId}`,
        'DELETE',
    );
}