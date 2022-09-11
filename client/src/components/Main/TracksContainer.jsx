import React, { useState } from 'react'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import Track from './Track';

export default function TracksContainer({ tracks }) {
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

    return (
        <>
            {tracks.map((track, i) => {
                return (
                    <Track key={track.id} track={track} playing={track.id === playingId} getIds={getIds}/>
                );
            })}
        </>
    )
}
