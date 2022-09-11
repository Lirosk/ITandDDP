import React, { useState } from 'react'
import { playerStateTracker } from '../../js/controllers/player_state_tracker';
import TrackContainer from './Track';

export default function TracksContainer({ tracks }) {
    const [playingId, setPlayingId] = useState('');

    playerStateTracker.addStateChangeHandler(
        (...args) => true,
        (lastState, currentState) => {
            setPlayingId(currentState.is_playing ? currentState.track_id : '');
        }
    )

    return (
        <>
            {tracks.map((track, i) => {
                return (
                    <TrackContainer key={track.id} track={track} playing={track.id === playingId} />
                );
            })}
        </>
    )
}
