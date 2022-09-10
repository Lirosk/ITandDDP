// import "../components/music-search.js";
// import "../components/footer.js";
// import "../components/logout.js";

// import { Track } from "../models/track.mjs";
// import { setListenersForTrack, fillHtmlTemplate } from "../components/track-container.js";

import { checkForSavedTracks, getUsersAudios, checkForUserLoggedIn } from "../api.js";

// import { setPopupListeners } from "./selected_playlist.js";


// checkForUserLoggedIn();

// main();


export async function getTracks() {
    return getUsersAudios().then(
        audios => {
            return audios;
        });
}

// /**
//  * 
//  * @param {Track[]} tracks 
//  */
// async function placeIntoHtml(tracks) {
//     const target = document.querySelector('.multi-line-tracks');
//     target.innerHTML = "";

//     await checkForSavedTracks(tracks.map(track => track.id))
//         .then(added => {
//             for (let i = 0; i < tracks.length; i++) {
//                 let track = tracks[i];


//                 (fillHtmlTemplate(track, added[i]).then(
//                     res => {
//                         target.innerHTML += res;
//                     }
//                 ));
//             }

//         });

//     tracks.forEach(track => {
//         setListenersForTrack(track.id);
//     });
// }
