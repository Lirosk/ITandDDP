import React, { useState } from 'react'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import AlbumCover from './AlbumCover';

export default function AlbumsContainer({ albums }) {
    const [playingId, setPlayingId] = useState('');

    playerStateTracker.addStateChangeHandler(
        (...args) => true,
        (_, state) => {
            setPlayingId(state.is_playing ? state.album_id : '');
        }
    );

    return (
        <>
            {albums.map(album => {
                return (
                    <AlbumCover key={album.id} album={album} playing={playingId === album.id} />
                );
            })}
        </>
    );
}
