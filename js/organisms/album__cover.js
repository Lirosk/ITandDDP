import { Album } from "../models/album.mjs";
import { changeClass } from "../utils.js";
import { getPlaybackStatus, pause, playAlbum } from "../api.js";
import { playerStateTracker } from "../controllers/player_state_tracker.js";


let lastAlbum = null;


/**
 * 
 * @param {number} id 
 */
export function setListenersForCover(id, is_playlist=false) {
    const element = document.querySelector(`.album__cover[data-id="${id}"]`);

    if (!element) {
        return;
    }

    // console.log(`Setting listeners for album cover with id \"${element.attributes['data-id'].value}\".`);

    const playButton = element.querySelector(".play-pause-button");

    playButton.addEventListener('click', (e) => {
        if (lastAlbum && lastAlbum !== element) {
            lastAlbum.querySelector(".play-pause-button").classList.remove("activated");
        }

        if (playButton.classList.contains('activated')) {
            pause(id);
        }
        else {


            if (lastAlbum !== element) {
                playAlbum(id, 0, 0, is_playlist);
            }
            else {
                getPlaybackStatus()
                    .then(res => {
                        console.log(res);

                        const progress_ms = res.progress_ms;
                        const position = res.item.track_number - 1;

                        playAlbum(id, position, progress_ms, is_playlist);
                    });
            }
        }


        changeClass(playButton, "activated");
        lastAlbum = element;
    });
}


/**
 * 
 * @param {Album} album 
 * @returns {string}
 */
export function fillHtmlTemplate(album) {
    let performer = album.artists.map(artist => artist.name).join(', ');

    let image = album.images[1];
    if (!image) {
        image = album.images[0];
    }

    return `
        <div class="cover-container">
            <div class="album__cover" data-id="${album.id}">
                <button class="button-icon">
                    <img class="icon" src="${image.url}" ${album.name}>
                </button>
                <div class="play-pause-button-wrap">
                    <button class="play-pause-button"></button>
                </div>
            </div>
            <span class="album__title">${album.name}</span>
            <a class="album__performer" href="search.html?q=${encodeURIComponent(performer)}">${performer}</a>
            <span class="album__release-date">${album.releaseDate}</span>
        </div>
    `;
}

function disactivateLastAlbum() {
    if (lastAlbum) {
        lastAlbum.querySelector(".play-pause-button").classList.remove("activated");
    }
}

function activateAlbum(id) {
    const album = document.querySelector(`.album__cover[data-id="${id}"]`);
    if (album) {
        album.querySelector('.play-pause-button').classList.add("activated");
        lastAlbum = album;
    }
}

playerStateTracker.addStateChangeHandler(
    (lastState, currentState) => {
        return lastState.is_album_context != currentState.is_album_context;
    },
    (lastState, currentState) => {
        if (currentState.is_album_context && currentState.is_playing) {
            activateAlbum(currentState.album_id);
        }
        else {
            disactivateLastAlbum();
        }
    },
);
