import React, { useState } from 'react'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import AlbumTrack from '../Popup/AlbumTrack';
import Track from './Track';

export default function TracksContainer({ tracks, areNumeratedTracks }) {
    const [playingId, setPlayingId] = useState('');

    playerStateTracker.addStateChangeHandler(
        (...args) => true,
        (lastState, currentState) => {
            setPlayingId(currentState.is_playing ? currentState.track_id : '');
        }
    )

    const getIds = ()=>{
        return tracks.map(track=> track.id);
    };

    const Element = areNumeratedTracks ? AlbumTrack : Track;

    return (
        <>
            {tracks.map((track, i) => {
                return (
                    <Element number={areNumeratedTracks ? i + 1 : 0} key={track.id} track={track} playing={track.id === playingId} getIds={getIds}/>
                );
            })}
        </>
    )
}
