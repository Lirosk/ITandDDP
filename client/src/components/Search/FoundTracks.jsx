import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';
import { getItems, getNextItems } from '../../js/api';
import { TrackFromEntry } from '../../js/utils';
import TracksContainer from '../Main/TracksContainer';

export default function FoundTracks({ q }) {
    const [tracks, setTracks] = useState([]);
    const lastElement = useRef();

    const market = sessionStorage.getItem('country');
    const nextTracks = 'nextTracks';

    const loadTracks = async (url) => {
        if (!url || url === String(undefined)) {
            return;
        }

        const { items, next } = await getItems({
            url,
            extractItemFromEntry: TrackFromEntry,
            attr: 'tracks',
        });

        if (items.length === 0) {
            return;
        }

        setTracks([...tracks, ...items]);
        sessionStorage.setItem(nextTracks, next);
    };

    const [fetchTracks, isTracksLoading, trackError] = useFetching(loadTracks);

    useObserver(lastElement, true, isTracksLoading, () => {
        fetchTracks(sessionStorage.getItem(nextTracks));
    });

    useEffect(
        () => {
            sessionStorage.setItem(
                nextTracks,
                `https://api.spotify.com/v1/search?q=${q}&type=track&include_external=audio&offset=0&limit=50${market ? `&market=${market}` : ''}`
            );
        }, [q]);

    return (
        <div className="found-tracks-container">
            <TracksContainer tracks={tracks} />
            <div ref={lastElement} style={{ height: '1px' }}></div>
        </div>
    )
}
