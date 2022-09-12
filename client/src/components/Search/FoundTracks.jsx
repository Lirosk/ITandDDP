import React, { useEffect, useRef, useState } from 'react'
import { useFetching } from '../../hooks/useFetching';
import { useObserver } from '../../hooks/useObserver';
import { getItems, getNextItems } from '../../js/api';
import { TrackFromEntry } from '../../js/utils';
import TracksContainer from '../Main/TracksContainer';

export default function FoundTracks({ setFoundTracks, q }) {
    const [tracks, setTracks] = useState([]);

    const market = sessionStorage.getItem('country');
    useEffect(() => {
        console.log('clearing tracks');
        setTracks([]);
        sessionStorage.setItem(
            nextTracks,
            `https://api.spotify.com/v1/search?q=${q}&type=track&include_external=audio&offset=0&limit=50&market=${market}`
        ); 
    }, [q])

    const lastElement = useRef();
    
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

        setFoundTracks(Boolean(items.length));        

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

    return (
        <>
            <TracksContainer tracks={tracks} />
            <div ref={lastElement} style={{ height: '1px' }}></div>
        </>
    )
}
