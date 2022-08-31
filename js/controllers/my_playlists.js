import "../organisms/music-search.js";
import "../organisms/footer.js";
import "../organisms/track-container.js";
import "../organisms/logout.js";

import { Album } from "../models/album.mjs";
import { setListenersForCover, fillHtmlTemplate } from "../organisms/album__cover.js";

import { checkForUserLoggedIn, getUsersAlbums } from "../api.js";

import { setPopupListeners } from "./selected_playlist.js";

checkForUserLoggedIn();

main();

async function main() {
    getUsersAlbums().then(
        albums => {
            placeIntoHtml(albums);
        }).then(() => {
            setPopupListeners();
        });
}

/**
 * 
 * @param {Album[]} albums 
 */
function placeIntoHtml(albums) {
    const target = document.querySelector('.multi-line-playlists');
    target.innerHTML = "";

    albums.forEach(album => {
        target.innerHTML += fillHtmlTemplate(album);

        albums.push(album);
        // setListenersForCover(album.id);  // i want to believe
    });

    albums.forEach(album => {
        setListenersForCover(album.id);
    });
}