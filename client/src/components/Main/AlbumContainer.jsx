import React, { useState } from 'react'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import AlbumCover from './AlbumCover';

export default function AlbumsContainer({ albums, setPopupState, isPlaylists }) {
    const [playingId, setPlayingId] = useState('');

    const showPopup = (id) => {
        setPopupState({
            id,
            isPlaylist: isPlaylists,
        });
    };

    playerStateTracker.addStateChangeHandler(
        (...args) => true,
        (_, state) => {
            setPlayingId(state.is_album_context && state.is_playing ? state.album_id : '');
        }
    );

    return (
        <>
            {albums.map(album => {
                return (
                    <AlbumCover showPopup={showPopup} key={album.id} album={album} playing={playingId === album.id} />
                );
            })}
        </>
    );
}
