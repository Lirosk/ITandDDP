import React from 'react'
import { useState } from 'react';
import { addAlbumToUserLibrary, checkForSavedAlbum, checkForSavedTracks, getAlbum, getPlaylist, removeAlbumFromUserLibrary } from '../../js/api';

import '../../styles/components/popup.css';
import '../../styles/pages/selected_playlist.css';
import TracksContainer from '../Main/TracksContainer';

export default function Popup({ popupState, setPopupState }) {
    // debugger;

    const isPlaylists = popupState.isPlaylist;
    const getContent = isPlaylists ? getPlaylist : getAlbum;

    const [album, setAlbum] = useState({});
    const [added, setAdded] = useState(false);

    if (popupState.id) {
        getContent(popupState.id).then(album => {
            checkForSavedTracks(album.tracks.map(track => track.id)).then(added => {
                for (const i in added) {
                    album.tracks[i].added = added[i];
                }

                setAlbum(album);
            });
        }).then(() => {
            checkForSavedAlbum(popupState.id).then((res) => {
                setAdded(res);
            });
        });
    }

    const hidePopup = () => {
        setPopupState({
            id: '',
        });
    }

    const handleAddAlbum = () => {
        if (added) {
            removeAlbumFromUserLibrary(album.id)
                .catch(error => {
                    console.log(error);
                });
        }
        else {
            addAlbumToUserLibrary(album.id)
                .catch(error => {
                    console.log(error);
                });
        }

        setAdded(!added);
    }

    return (
        album.id
            ?
            <div className={`popup ${popupState.id ? 'activated' : ''}`}>
                <button onClick={hidePopup} className="popup__back-wrap"></button>
                <div className="selected-playlist-container">
                    <div className="playlist__header-container">
                        <img className="playlist__cover" src={album.images[0].url} />
                        <div className="playlist__info-container">
                            <div className="playlist__info__inner-container">
                                <h1 className={`playlist__title ${isPlaylists ? 'alone' : ''}`}>{album.name}</h1>
                                <a href="search.html">
                                    <h2 className="playlist__performer">{album.artists.map(artist => artist.name).join(', ')}</h2>
                                </a>
                                <span className="playlist__additional-info">{album.releaseDate}</span>
                            </div>
                            <div className="playlist__toolbar">
                                {isPlaylists ?
                                    <></>
                                    :
                                    <button onClick={handleAddAlbum} className={`playlist__add-button ${added ? 'added' : ''}`}>
                                        <svg className="icon add">
                                            <line x1="0" x2="11" y1="5.5" y2="5.5" />
                                            <line x1="5.5" x2="5.5" y1="0" y2="11" />
                                        </svg>
                                        <svg className="icon added">
                                            <polyline points="0 8, 3.5 10, 10 3" />
                                        </svg>
                                        <span className="playlist__add-button__text add">Add</span>
                                        <span className="playlist__add-button__text added">Added</span>
                                    </button>}
                            </div>
                        </div>
                        <button onClick={hidePopup} class="close-popup-btn ref-text">Close</button>
                    </div>
                    <div className="playlist__tracks-container">
                        <TracksContainer areNumeratedTracks={true} tracks={album.tracks} />
                    </div>
                    <div className="playlist__stats-wrap">
                        <span className="playlist__stats" >{album.tracks.length} tracks</span>
                    </div>
                </div>
            </ div>
            :
            <></>
    )
}
